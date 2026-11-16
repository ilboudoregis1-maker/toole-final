package com.cns.tooole;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.webkit.JavascriptInterface;
import androidx.core.content.FileProvider;
import com.getcapacitor.BridgeActivity;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class NativeBridge {
    private final Context ctx;
    private volatile boolean downloading = false;

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

    private void js(final String code) {
        try {
            if (ctx instanceof BridgeActivity) {
                final BridgeActivity a = (BridgeActivity) ctx;
                a.runOnUiThread(new Runnable() {
                    public void run() {
                        try { a.getBridge().getWebView().evaluateJavascript(code, null); } catch (Throwable t) { }
                    }
                });
            }
        } catch (Throwable t) { }
    }

    @JavascriptInterface
    public void installUpdate(final String url) {
        if (url == null || !url.startsWith("https://jbjeqxubpqqypysfsubd.supabase.co/storage/v1/object/public/apk/")) {
            js("window.__tmoState&&window.__tmoState('error')");
            return;
        }
        if (Build.VERSION.SDK_INT >= 26 && !ctx.getPackageManager().canRequestPackageInstalls()) {
            try {
                Intent i = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + ctx.getPackageName()));
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                ctx.startActivity(i);
            } catch (Throwable t) { }
            js("window.__tmoState&&window.__tmoState('perm')");
            return;
        }
        if (downloading) return;
        downloading = true;
        new Thread(new Runnable() {
            public void run() { download(url); }
        }).start();
    }

    private void download(String url) {
        HttpURLConnection c = null;
        try {
            File f = new File(ctx.getCacheDir(), "toole-update.apk");
            if (f.exists()) f.delete();
            c = (HttpURLConnection) new URL(url).openConnection();
            c.setConnectTimeout(15000);
            c.setReadTimeout(30000);
            c.connect();
            if (c.getResponseCode() != 200) throw new Exception("http");
            long total = c.getContentLengthLong();
            InputStream in = c.getInputStream();
            FileOutputStream out = new FileOutputStream(f);
            byte[] buf = new byte[32768];
            long done = 0;
            int n, last = -1;
            while ((n = in.read(buf)) > 0) {
                out.write(buf, 0, n);
                done += n;
                if (total > 0) {
                    int p = (int) (done * 100 / total);
                    if (p != last) { last = p; js("window.__tmoProgress&&window.__tmoProgress(" + p + ")"); }
                }
            }
            out.close();
            in.close();
            if (f.length() < 1000000) throw new Exception("small");
            js("window.__tmoState&&window.__tmoState('install')");
            Uri uri = FileProvider.getUriForFile(ctx, ctx.getPackageName() + ".fileprovider", f);
            Intent it = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive");
            it.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
            ctx.startActivity(it);
        } catch (Throwable t) {
            js("window.__tmoState&&window.__tmoState('error')");
        } finally {
            downloading = false;
            try { if (c != null) c.disconnect(); } catch (Throwable t) { }
        }
    }
}
