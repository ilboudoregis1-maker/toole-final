package com.cns.tooole;

import android.content.Intent;
import android.graphics.Outline;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.View;
import android.view.ViewOutlineProvider;
import com.getcapacitor.BridgeActivity;

public class BubbleWindowActivity extends BridgeActivity {
    @Override
    public void setTheme(int resid) {
        // Capacitor remet son theme plein ecran : on garde la fenetre flottante
        super.setTheme(R.style.BubbleWindow);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*KB_FIX*/ try{ getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | android.view.WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM); getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE | android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_UNCHANGED); }catch(Throwable t){}
        try { floating(); } catch (Throwable t) { } try { addBar(); } catch (Throwable t) { }
        loadChat(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        loadChat(intent);
    }

    private void loadChat(Intent i) {
        try {
            String p = i.getStringExtra("p");
            String g = i.getStringExtra("g");
            String n = i.getStringExtra("n");
            String q = "?bulle=1";
            if (p != null) q += "&p=" + Uri.encode(p);
            if (g != null) q += "&g=" + Uri.encode(g);
            if (n != null) q += "&n=" + Uri.encode(n);
            getBridge().getWebView().loadUrl(getBridge().getLocalUrl() + "/index.html" + q);
        } catch (Exception e) { }
    }

    private void floating() {
        DisplayMetrics dm = getResources().getDisplayMetrics();
        final float dn = dm.density;
        getWindow().setLayout((int) (dm.widthPixels * 0.94f), (int) (dm.heightPixels * 0.74f));
        getWindow().setGravity(Gravity.TOP); android.view.WindowManager.LayoutParams lp = getWindow().getAttributes(); lp.y = (int) (dm.heightPixels * 0.05f); getWindow().setAttributes(lp); getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE | android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_UNCHANGED);
        GradientDrawable g = new GradientDrawable();
        g.setColor(0xFFFFFFFF);
        g.setCornerRadius(22 * dn);
        getWindow().setBackgroundDrawable(g);
        View decor = getWindow().getDecorView();
        decor.setOutlineProvider(new ViewOutlineProvider() {
            public void getOutline(View v, Outline o) {
                o.setRoundRect(0, 0, v.getWidth(), v.getHeight(), 22 * dn);
            }
        });
        decor.setClipToOutline(true);
        setFinishOnTouchOutside(true);
    }

    private void addBar() {
        final android.webkit.WebView wv = getBridge().getWebView();
        final android.view.ViewGroup parent = (android.view.ViewGroup) wv.getParent();
        final float dn = getResources().getDisplayMetrics().density;
        parent.removeView(wv);
        android.widget.LinearLayout wrap = new android.widget.LinearLayout(this);
        wrap.setOrientation(android.widget.LinearLayout.VERTICAL);
        wrap.addView(wv, new android.widget.LinearLayout.LayoutParams(-1, 0, 1f));
        android.widget.LinearLayout bar = new android.widget.LinearLayout(this);
        bar.setOrientation(android.widget.LinearLayout.HORIZONTAL);
        bar.setGravity(Gravity.CENTER_VERTICAL);
        bar.setBackgroundColor(0xFFFFFFFF);
        int p = (int) (8 * dn);
        bar.setPadding(p, p, p, p);
        final android.widget.EditText et = new android.widget.EditText(this);
        et.setHint("\u00c9crire un message");
        et.setTextSize(16);
        et.setTextColor(0xFF0F172A);
        et.setHintTextColor(0xFF94A3B8);
        et.setMaxLines(4);
        et.setInputType(android.text.InputType.TYPE_CLASS_TEXT | android.text.InputType.TYPE_TEXT_FLAG_MULTI_LINE | android.text.InputType.TYPE_TEXT_FLAG_CAP_SENTENCES);
        GradientDrawable bg = new GradientDrawable();
        bg.setColor(0xFFEEF2F7);
        bg.setCornerRadius(22 * dn);
        et.setBackground(bg);
        et.setPadding((int) (16 * dn), (int) (10 * dn), (int) (16 * dn), (int) (10 * dn));
        bar.addView(et, new android.widget.LinearLayout.LayoutParams(0, -2, 1f));
        android.widget.TextView sd = new android.widget.TextView(this);
        sd.setText("\u27a4");
        sd.setTextColor(0xFFFFFFFF);
        sd.setTextSize(20);
        sd.setGravity(Gravity.CENTER);
        GradientDrawable sb = new GradientDrawable();
        sb.setShape(GradientDrawable.OVAL);
        sb.setColor(0xFF2F6FE0);
        sd.setBackground(sb);
        android.widget.LinearLayout.LayoutParams sl = new android.widget.LinearLayout.LayoutParams((int) (44 * dn), (int) (44 * dn));
        sl.leftMargin = (int) (8 * dn);
        bar.addView(sd, sl);
        sd.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                String t = et.getText().toString().trim();
                if (t.length() == 0) return;
                wv.evaluateJavascript("window.tooleBubbleSend&&window.tooleBubbleSend(" + org.json.JSONObject.quote(t) + ")", null);
                et.setText("");
            }
        });
        wrap.addView(bar, new android.widget.LinearLayout.LayoutParams(-1, -2));
        parent.addView(wrap, new android.view.ViewGroup.LayoutParams(-1, -1));
    }
}
