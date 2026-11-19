package com.cns.tooole;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.view.textservice.SentenceSuggestionsInfo;
import android.view.textservice.SpellCheckerSession;
import android.view.textservice.SuggestionsInfo;
import android.view.textservice.TextInfo;
import android.view.textservice.TextServicesManager;
import android.webkit.JavascriptInterface;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import java.util.ArrayList;
import java.util.Locale;
import java.util.concurrent.ConcurrentHashMap;

public class Dictation {
    private final Activity act;
    private final Handler h = new Handler(Looper.getMainLooper());
    private SpeechRecognizer sr;
    private volatile String text = "";
    private volatile String state = "idle";
    private SpellCheckerSession sp;
    private String spLang = "";
    private volatile String pendW = "";
    private final ConcurrentHashMap<String, String> fixes = new ConcurrentHashMap<String, String>();

    private final SpellCheckerSession.SpellCheckerSessionListener listener = new SpellCheckerSession.SpellCheckerSessionListener() {
        public void onGetSuggestions(SuggestionsInfo[] r) { }
        public void onGetSentenceSuggestions(SentenceSuggestionsInfo[] r) {
            String res = "=";
            try {
                if (r != null && r.length > 0 && r[0].getSuggestionsCount() > 0) {
                    SuggestionsInfo si = r[0].getSuggestionsInfoAt(0);
                    if ((si.getSuggestionsAttributes() & SuggestionsInfo.RESULT_ATTR_LOOKS_LIKE_TYPO) != 0 && si.getSuggestionsCount() > 0) {
                        res = si.getSuggestionAt(0);
                    }
                }
            } catch (Throwable t) { }
            fixes.put(pendW, res);
        }
    };

    public Dictation(Activity a) { act = a; }

    @JavascriptInterface
    public void start(final String lang) {
        text = ""; state = "idle";
        h.post(new Runnable() { public void run() { begin(lang); } });
    }

    @JavascriptInterface
    public void stop() {
        h.post(new Runnable() { public void run() { try { if (sr != null) sr.stopListening(); } catch (Throwable t) { } } });
    }

    @JavascriptInterface
    public String poll() { return state + "|" + text; }

    @JavascriptInterface
    public void fix(final String w, final String lang) {
        fixes.remove(w);
        h.post(new Runnable() { public void run() { doFix(w, lang); } });
    }

    @JavascriptInterface
    public String fixResult(String w) {
        String r = fixes.get(w);
        if (r == null) return "";
        fixes.remove(w);
        return r;
    }

    private void doFix(String w, String lang) {
        try {
            if (sp == null || !lang.equals(spLang)) {
                if (sp != null) { try { sp.close(); } catch (Throwable t) { } }
                TextServicesManager tsm = (TextServicesManager) act.getSystemService(Context.TEXT_SERVICES_MANAGER_SERVICE);
                sp = tsm == null ? null : tsm.newSpellCheckerSession(null, Locale.forLanguageTag(lang), listener, false);
                spLang = lang;
            }
            if (sp == null) { fixes.put(w, "="); return; }
            pendW = w;
            sp.getSentenceSuggestions(new TextInfo[]{ new TextInfo(w) }, 3);
        } catch (Throwable t) { fixes.put(w, "="); }
    }

    private void begin(String lang) {
        try {
            if (ContextCompat.checkSelfPermission(act, "android.permission.RECORD_AUDIO") != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(act, new String[]{ "android.permission.RECORD_AUDIO" }, 77);
                state = "perm";
                return;
            }
            if (!SpeechRecognizer.isRecognitionAvailable(act)) { state = "na"; return; }
            if (sr != null) { try { sr.destroy(); } catch (Throwable t) { } }
            sr = SpeechRecognizer.createSpeechRecognizer(act);
            sr.setRecognitionListener(new RecognitionListener() {
                public void onReadyForSpeech(Bundle b) { state = "listen"; }
                public void onBeginningOfSpeech() { }
                public void onRmsChanged(float v) { }
                public void onBufferReceived(byte[] b) { }
                public void onEndOfSpeech() { }
                public void onError(int e) { state = "end"; }
                public void onResults(Bundle b) { grab(b); state = "end"; }
                public void onPartialResults(Bundle b) { grab(b); }
                public void onEvent(int i, Bundle b) { }
            });
            Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
            i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            sr.startListening(i);
            state = "listen";
        } catch (Throwable t) { state = "na"; }
    }

    private void grab(Bundle b) {
        ArrayList<String> l = b.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
        if (l != null && !l.isEmpty()) text = l.get(0);
    }
}
