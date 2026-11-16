package com.cns.tooole;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class BubbleChatActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*KB_FIX*/ try{ getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | android.view.WindowManager.LayoutParams.FLAG_ALT_FOCUSABLE_IM); getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE | android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_UNCHANGED); }catch(Throwable t){}
        try {
            Intent i = getIntent();
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
}
