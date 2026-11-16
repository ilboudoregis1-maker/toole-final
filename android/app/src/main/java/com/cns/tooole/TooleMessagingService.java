package com.cns.tooole;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.TextView;
import androidx.core.app.NotificationCompat;
import com.capacitorjs.plugins.pushnotifications.MessagingService;
import com.google.firebase.messaging.RemoteMessage;
import java.util.Map;

public class TooleMessagingService extends MessagingService {
    private static final String CH = "toole_messages";
    private static final Handler UI = new Handler(Looper.getMainLooper());
    private static View bubble;
    private static WindowManager wm;
    private static Runnable autoHide;

    @Override
    public void onMessageReceived(RemoteMessage m) {
        Map<String, String> d = m.getData();
        boolean mine = m.getNotification() == null && d != null && d.get("t") != null;
        if (!mine || MainActivity.visible) {
            super.onMessageReceived(m);
            return;
        }
        final Context app = getApplicationContext();
        final Intent open = buildIntent(app, d);
        notifyUser(app, d, open);
        final Map<String, String> data = d;
        UI.post(new Runnable() {
            public void run() { showBubble(app, data, open); }
        });
    }

    private static Intent buildIntent(Context c, Map<String, String> d) {
        Intent it = new Intent(c, MainActivity.class);
        it.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        for (Map.Entry<String, String> e : d.entrySet()) it.putExtra(e.getKey(), e.getValue());
        it.putExtra("google.message_id", "toole-" + System.currentTimeMillis());
        return it;
    }

    private static void notifyUser(Context c, Map<String, String> d, Intent open) {
        try {
            NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
            if (Build.VERSION.SDK_INT >= 26) {
                nm.createNotificationChannel(new NotificationChannel(CH, "Messages", NotificationManager.IMPORTANCE_HIGH));
            }
            PendingIntent pi = PendingIntent.getActivity(c, (int) (System.currentTimeMillis() & 0xfffffff), open,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
            String body = d.get("b") == null ? "" : d.get("b");
            NotificationCompat.Builder b = new NotificationCompat.Builder(c, CH)
                    .setSmallIcon(android.R.drawable.stat_notify_chat)
                    .setContentTitle(d.get("t"))
                    .setContentText(body)
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
                    .setAutoCancel(true)
                    .setContentIntent(pi)
                    .setPriority(NotificationCompat.PRIORITY_HIGH)
                    .setDefaults(NotificationCompat.DEFAULT_ALL);
            String peer = d.get("peer");
            int id = peer != null ? peer.hashCode() : (int) System.currentTimeMillis();
            nm.notify(id, b.build());
        } catch (Exception e) { }
    }

    private static void showBubble(final Context c, Map<String, String> d, final Intent open) {
        try {
            if (Build.VERSION.SDK_INT >= 23 && !Settings.canDrawOverlays(c)) return;
            removeBubble();
            wm = (WindowManager) c.getSystemService(Context.WINDOW_SERVICE);
            DisplayMetrics dm = c.getResources().getDisplayMetrics();
            final int size = (int) (58 * dm.density);
            String t = d.get("t");
            String letter = (t != null && t.length() > 0) ? t.substring(0, 1).toUpperCase() : "T";

            TextView v = new TextView(c);
            v.setText(letter);
            v.setTextColor(Color.WHITE);
            v.setTextSize(24);
            v.setTypeface(Typeface.DEFAULT_BOLD);
            v.setGravity(Gravity.CENTER);
            GradientDrawable g = new GradientDrawable();
            g.setShape(GradientDrawable.OVAL);
            g.setColor(Color.parseColor("#1B6EF3"));
            g.setStroke((int) (3 * dm.density), Color.WHITE);
            v.setBackground(g);
            v.setElevation(12 * dm.density);

            final WindowManager.LayoutParams p = new WindowManager.LayoutParams(
                    size, size,
                    Build.VERSION.SDK_INT >= 26 ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                            : WindowManager.LayoutParams.TYPE_PHONE,
                    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                    PixelFormat.TRANSLUCENT);
            p.gravity = Gravity.TOP | Gravity.START;
            p.x = dm.widthPixels - size - (int) (8 * dm.density);
            p.y = (int) (dm.heightPixels * 0.3f);

            v.setOnTouchListener(new View.OnTouchListener() {
                int sx, sy;
                float tx, ty;
                long t0;
                boolean moved;

                public boolean onTouch(View view, MotionEvent e) {
                    switch (e.getAction()) {
                        case MotionEvent.ACTION_DOWN:
                            sx = p.x; sy = p.y; tx = e.getRawX(); ty = e.getRawY();
                            t0 = System.currentTimeMillis(); moved = false;
                            return true;
                        case MotionEvent.ACTION_MOVE:
                            float dx = e.getRawX() - tx, dy = e.getRawY() - ty;
                            if (Math.abs(dx) > 12 || Math.abs(dy) > 12) moved = true;
                            if (moved) {
                                p.x = sx + (int) dx; p.y = sy + (int) dy;
                                try { wm.updateViewLayout(view, p); } catch (Exception x) { }
                            }
                            return true;
                        case MotionEvent.ACTION_UP:
                            if (!moved) {
                                boolean longPress = System.currentTimeMillis() - t0 > 700;
                                removeBubble();
                                if (!longPress) { try { c.startActivity(open); } catch (Exception x) { } }
                            }
                            return true;
                    }
                    return false;
                }
            });

            bubble = v;
            wm.addView(v, p);
            autoHide = new Runnable() { public void run() { removeBubble(); } };
            UI.postDelayed(autoHide, 120000);
        } catch (Exception e) { }
    }

    public static void removeBubble() {
        try { if (autoHide != null) UI.removeCallbacks(autoHide); } catch (Exception e) { }
        try { if (bubble != null && wm != null) wm.removeView(bubble); } catch (Exception e) { }
        bubble = null;
    }
}
