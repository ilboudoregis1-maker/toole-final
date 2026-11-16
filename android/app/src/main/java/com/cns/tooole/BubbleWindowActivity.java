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
        try { floating(); } catch (Throwable t) { }
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
        getWindow().setLayout((int) (dm.widthPixels * 0.94f), (int) (dm.heightPixels * 0.54f));
        getWindow().setGravity(Gravity.TOP); android.view.WindowManager.LayoutParams lp = getWindow().getAttributes(); lp.y = (int) (dm.heightPixels * 0.03f); getWindow().setAttributes(lp); getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE | android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_UNCHANGED);
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
}
