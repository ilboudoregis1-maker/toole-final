package com.cns.tooole;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.provider.ContactsContract;
import android.webkit.JavascriptInterface;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import org.json.JSONArray;
import org.json.JSONObject;

public class ContactsBridge {
    private final Activity act;

    public ContactsBridge(Activity a) { act = a; }

    @JavascriptInterface
    public boolean has() {
        return ContextCompat.checkSelfPermission(act, Manifest.permission.READ_CONTACTS) == PackageManager.PERMISSION_GRANTED;
    }

    @JavascriptInterface
    public void ask() {
        act.runOnUiThread(() -> ActivityCompat.requestPermissions(act, new String[]{Manifest.permission.READ_CONTACTS}, 7731));
    }

    @JavascriptInterface
    public String list() {
        JSONArray out = new JSONArray();
        if (!has()) return out.toString();
        Cursor c = null;
        try {
            c = act.getContentResolver().query(
                ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                new String[]{ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME, ContactsContract.CommonDataKinds.Phone.NUMBER},
                null, null, ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME + " ASC");
            if (c != null) {
                int n = 0;
                while (c.moveToNext() && n < 5000) {
                    JSONObject o = new JSONObject();
                    o.put("n", c.getString(0) == null ? "" : c.getString(0));
                    o.put("p", c.getString(1) == null ? "" : c.getString(1));
                    out.put(o);
                    n++;
                }
            }
        } catch (Exception e) {
        } finally {
            if (c != null) c.close();
        }
        return out.toString();
    }
}
