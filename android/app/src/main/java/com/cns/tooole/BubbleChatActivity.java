package com.cns.tooole;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class BubbleChatActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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
