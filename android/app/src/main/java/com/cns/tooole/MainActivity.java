package com.cns.tooole;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        startForegroundService(new android.content.Intent(this, KeepAliveService.class));
        getBridge().getWebView().addJavascriptInterface(new CallBridge(this), "TooleCall"); /*TKB_CLEAN*/ try{new java.io.File(getCacheDir(),"toole-update.apk").delete();}catch(Throwable t){} try{getBridge().getWebView().addJavascriptInterface(new Dictation(this),"TooleDict");}catch(Throwable t){}
        getWindow().setBackgroundDrawable(new ColorDrawable(Color.WHITE));
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        try { getBridge().getWebView().setBackgroundColor(Color.WHITE); } catch (Exception e) { }
        try { getBridge().getWebView().getSettings().setTextZoom(100); } catch (Exception e) { }
        try { getBridge().getWebView().addJavascriptInterface(new NativeBridge(this), "TooleNative"); } catch (Exception e) { }
        try { getBridge().getWebView().addJavascriptInterface(new ContactsBridge(this), "TooleContacts"); } catch (Exception e) { }
    }

    @Override
    public void onRequestPermissionsResult(int rc, String[] perms, int[] res) {
        super.onRequestPermissionsResult(rc, perms, res);
        if (rc == 7731) {
            final boolean ok = res.length > 0 && res[0] == android.content.pm.PackageManager.PERMISSION_GRANTED;
            runOnUiThread(() -> { try { getBridge().getWebView().evaluateJavascript("window.__tcPerm&&window.__tcPerm(" + ok + ")", null); } catch (Exception e) { } });
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        BubbleHelper.appVisible = true;
        FloatingBubble.remove();
        askOverlayOnce();
    }

    @Override
    public void onPause() {
        BubbleHelper.appVisible = false;
        super.onPause();
    }

    private static boolean askedThisRun = false;

    private void askOverlayOnce() {
        try {
            if (Settings.canDrawOverlays(this)) return;
            if (askedThisRun) return;
            askedThisRun = true;
            new AlertDialog.Builder(this, android.R.style.Theme_Material_Light_Dialog_Alert)
                .setTitle("Autoriser la bulle de messages")
                .setMessage("Pour voir la bulle quand l'appli est fermée, TÕÕLé doit pouvoir s'afficher par-dessus les autres applis.\n\nAppuie sur « Autoriser », puis active l'interrupteur.")
                .setCancelable(false)
                .setPositiveButton("Autoriser", (d, w) -> startActivity(new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()))))
                .setNegativeButton("Plus tard", null)
                .show();
        } catch (Exception e) { }
    }
}
