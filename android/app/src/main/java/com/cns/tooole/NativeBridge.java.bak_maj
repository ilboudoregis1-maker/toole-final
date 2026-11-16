package com.cns.tooole;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import android.webkit.JavascriptInterface;

public class NativeBridge {
    private final Context ctx;

    public NativeBridge(Context c) { ctx = c; }

    @JavascriptInterface
    public boolean bubblesEnabled() { return BubbleHelper.enabled(ctx); }

    @JavascriptInterface
    public void setBubbles(boolean v) { BubbleHelper.setEnabled(ctx, v); }

    @JavascriptInterface
    public void openBubbleSettings() {
        try {
            Intent i;
            if (Build.VERSION.SDK_INT >= 29) {
                i = new Intent(Settings.ACTION_APP_NOTIFICATION_BUBBLE_SETTINGS);
            } else {
                i = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            }
            i.putExtra(Settings.EXTRA_APP_PACKAGE, ctx.getPackageName());
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            ctx.startActivity(i);
        } catch (Exception e) { }
    }
}
