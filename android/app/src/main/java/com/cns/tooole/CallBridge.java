package com.cns.tooole;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class CallBridge {
    private final MainActivity act;
    public CallBridge(MainActivity a) { this.act = a; }

    @JavascriptInterface
    public void call(final String code) {
        act.runOnUiThread(new Runnable() {
            public void run() {
                if (ContextCompat.checkSelfPermission(act, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(act, new String[]{Manifest.permission.CALL_PHONE}, 77);
                    Toast.makeText(act, "Autorise l'appel, puis touche à nouveau", Toast.LENGTH_LONG).show();
                    return;
                }
                act.startActivity(new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + Uri.encode(code))));
            }
        });
    }
}
