package com.cns.tooole;

import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.provider.Settings;

import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    static boolean visible = false;

    @Override
    protected void onResume() {
        super.onResume();
        visible = true;
        TooleMessagingService.removeBubble();
        askOverlayOnce();
    }

    @Override
    protected void onPause() {
        super.onPause();
        visible = false;
    }

    private void askOverlayOnce() {
        try {
            if (Settings.canDrawOverlays(this)) return;
            SharedPreferences sp = getSharedPreferences("toole_bubble", MODE_PRIVATE);
            if (sp.getBoolean("asked", false)) return;
            sp.edit().putBoolean("asked", true).apply();
            new AlertDialog.Builder(this)
                .setTitle("Bulle de messages")
                .setMessage("Autorise TOOLE à s'afficher par-dessus les autres applis pour voir une bulle quand tu reçois un message, appli fermée.")
                .setPositiveButton("Autoriser", (d, w) -> startActivity(new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getPackageName()))))
                .setNegativeButton("Plus tard", null)
                .show();
        } catch (Exception e) { }
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setBackgroundDrawable(new ColorDrawable(Color.WHITE));
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        try { getBridge().getWebView().setBackgroundColor(Color.WHITE); } catch (Exception e) { }
    }
}
