package com.cns.tooole;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInstaller;

public class InstallReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context c, Intent i) {
        try {
            int st = i.getIntExtra(PackageInstaller.EXTRA_STATUS, -1);
            if (st == PackageInstaller.STATUS_PENDING_USER_ACTION) {
                Intent a = (Intent) i.getParcelableExtra(Intent.EXTRA_INTENT);
                if (a != null) {
                    a.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    c.startActivity(a);
                }
            }
        } catch (Throwable t) { }
    }
}
