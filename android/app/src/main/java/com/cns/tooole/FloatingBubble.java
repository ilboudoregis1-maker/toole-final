package com.cns.tooole;

import android.animation.ValueAnimator;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.view.animation.OvershootInterpolator;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

public class FloatingBubble {
    private static final Handler UI = new Handler(Looper.getMainLooper());
    private static WindowManager wm;
    private static FrameLayout root;
    private static ImageView face;
    private static TextView count;
    private static TextView target;
    private static WindowManager.LayoutParams lp;
    private static Runnable autoHide;
    private static int unread = 0;
    private static String curP, curG, curN;

    public static boolean canShow(Context c) {
        try { return Build.VERSION.SDK_INT < 23 || Settings.canDrawOverlays(c); } catch (Throwable t) { return false; }
    }

    private static int overlayType() {
        return Build.VERSION.SDK_INT >= 26 ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;
    }

    public static void show(final Context ctx, final String name, final String peer, final String group, final Bitmap photo) {
        final Context app = ctx.getApplicationContext();
        UI.post(new Runnable() {
            public void run() {
                try { doShow(app, name, peer, group, photo); } catch (Throwable t) { }
            }
        });
    }

    public static void remove() {
        try {
            if (autoHide != null) UI.removeCallbacks(autoHide);
            if (target != null && wm != null) { try { wm.removeView(target); } catch (Throwable t) { } }
            if (root != null && wm != null) { try { wm.removeView(root); } catch (Throwable t) { } }
        } catch (Throwable t) { }
        target = null; root = null; face = null; count = null;
        unread = 0;
    }

    private static void scheduleHide() {
        if (autoHide != null) UI.removeCallbacks(autoHide);
        autoHide = new Runnable() { public void run() { remove(); } };
        UI.postDelayed(autoHide, 15 * 60 * 1000L);
    }

    private static void refreshCount() {
        if (count == null) return;
        count.setText(unread > 99 ? "99+" : String.valueOf(unread));
        count.setVisibility(unread > 0 ? View.VISIBLE : View.GONE);
    }

    private static void createTarget(Context c, float dn) {
        int ts = (int) (60 * dn);
        target = new TextView(c);
        target.setText("\u2715");
        target.setTextColor(Color.WHITE);
        target.setTextSize(22);
        target.setGravity(Gravity.CENTER);
        GradientDrawable g = new GradientDrawable();
        g.setShape(GradientDrawable.OVAL);
        g.setColor(0xCC202124);
        target.setBackground(g);
        target.setVisibility(View.INVISIBLE);
        WindowManager.LayoutParams tp = new WindowManager.LayoutParams(ts, ts, overlayType(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCHABLE,
                PixelFormat.TRANSLUCENT);
        tp.gravity = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;
        tp.y = (int) (56 * dn);
        try { wm.addView(target, tp); } catch (Throwable t) { target = null; }
    }

    private static boolean near(float dn) {
        try {
            if (root == null || target == null) return false;
            int[] a = new int[2];
            int[] b = new int[2];
            root.getLocationOnScreen(a);
            target.getLocationOnScreen(b);
            float ax = a[0] + root.getWidth() / 2f, ay = a[1] + root.getHeight() / 2f;
            float bx = b[0] + target.getWidth() / 2f, by = b[1] + target.getHeight() / 2f;
            return Math.hypot(ax - bx, ay - by) < 80 * dn;
        } catch (Throwable t) {
            return false;
        }
    }

    private static void snap(int screenW, int size, int screenH, float dn) {
        if (root == null) return;
        int cx = lp.x + size / 2;
        final int endX = cx < screenW / 2 ? 0 : screenW - size;
        int maxY = screenH - size - (int) (90 * dn);
        lp.y = Math.max((int) (24 * dn), Math.min(lp.y, maxY));
        ValueAnimator va = ValueAnimator.ofInt(lp.x, endX);
        va.setDuration(220);
        va.setInterpolator(new OvershootInterpolator(0.8f));
        va.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            public void onAnimationUpdate(ValueAnimator a) {
                if (root == null) return;
                lp.x = (Integer) a.getAnimatedValue();
                try { wm.updateViewLayout(root, lp); } catch (Throwable t) { }
            }
        });
        va.start();
    }

    private static void open(Context c) {
        String p = curP, g = curG, n = curN;
        String key = g != null ? "g" + g : (p != null ? "p" + p : "n" + n);
        try {
            Intent it = new Intent(c, BubbleChatActivity.class).setAction(Intent.ACTION_VIEW)
                    .setData(Uri.parse("toole://bulle/" + Uri.encode(key)))
                    .putExtra("p", p).putExtra("g", g).putExtra("n", n)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_MULTIPLE_TASK);
            c.startActivity(it);
        } catch (Throwable t) { }
        try {
            NotificationManager nm = (NotificationManager) c.getSystemService(Context.NOTIFICATION_SERVICE);
            nm.cancel(Math.abs(key.hashCode()));
        } catch (Throwable t) { }
        remove();
    }

    private static void doShow(final Context c, String name, String peer, String group, Bitmap photo) {
        if (!canShow(c)) return;
        curP = peer; curG = group; curN = name;
        unread++;
        Bitmap bmp = BubbleHelper.compose(c, name, photo);
        scheduleHide();

        if (root != null) { // deja affichee : on met a jour et on fait "tressaillir" la bulle
            face.setImageBitmap(bmp);
            refreshCount();
            root.animate().scaleX(1.2f).scaleY(1.2f).setDuration(120).withEndAction(new Runnable() {
                public void run() {
                    if (root != null) root.animate().scaleX(1f).scaleY(1f).setDuration(160).start();
                }
            }).start();
            return;
        }

        wm = (WindowManager) c.getSystemService(Context.WINDOW_SERVICE);
        final DisplayMetrics dm = c.getResources().getDisplayMetrics();
        final float dn = dm.density;
        final int size = (int) (64 * dn);

        root = new FrameLayout(c);
        face = new ImageView(c);
        face.setImageBitmap(bmp);
        face.setScaleType(ImageView.ScaleType.FIT_CENTER);
        root.addView(face, new FrameLayout.LayoutParams(size, size));

        count = new TextView(c);
        count.setTextColor(Color.WHITE);
        count.setTextSize(11);
        count.setTypeface(Typeface.DEFAULT_BOLD);
        count.setGravity(Gravity.CENTER);
        GradientDrawable red = new GradientDrawable();
        red.setShape(GradientDrawable.OVAL);
        red.setColor(0xFFE53935);
        red.setStroke((int) (2 * dn), Color.WHITE);
        count.setBackground(red);
        int cs = (int) (22 * dn);
        root.addView(count, new FrameLayout.LayoutParams(cs, cs, Gravity.TOP | Gravity.END));
        refreshCount();

        lp = new WindowManager.LayoutParams(size, size, overlayType(),
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                PixelFormat.TRANSLUCENT);
        lp.gravity = Gravity.TOP | Gravity.START;
        lp.x = dm.widthPixels - size;
        lp.y = (int) (dm.heightPixels * 0.25f);

        root.setOnTouchListener(new View.OnTouchListener() {
            int sx, sy;
            float tx, ty;
            boolean moved, over;

            public boolean onTouch(View v, MotionEvent e) {
                int a = e.getAction();
                if (a == MotionEvent.ACTION_DOWN) {
                    sx = lp.x; sy = lp.y; tx = e.getRawX(); ty = e.getRawY();
                    moved = false; over = false;
                    return true;
                }
                if (a == MotionEvent.ACTION_MOVE) {
                    float dx = e.getRawX() - tx, dy = e.getRawY() - ty;
                    if (!moved && (Math.abs(dx) > 10 * dn || Math.abs(dy) > 10 * dn)) {
                        moved = true;
                        if (target != null) target.setVisibility(View.VISIBLE);
                    }
                    if (moved) {
                        lp.x = sx + (int) dx;
                        lp.y = sy + (int) dy;
                        try { wm.updateViewLayout(root, lp); } catch (Throwable t) { }
                        over = near(dn);
                        if (target != null) {
                            target.setScaleX(over ? 1.3f : 1f);
                            target.setScaleY(over ? 1.3f : 1f);
                        }
                    }
                    return true;
                }
                if (a == MotionEvent.ACTION_UP || a == MotionEvent.ACTION_CANCEL) {
                    if (target != null) target.setVisibility(View.INVISIBLE);
                    if (!moved) {
                        if (a == MotionEvent.ACTION_UP) open(c);
                    } else if (over) {
                        remove();
                    } else {
                        snap(dm.widthPixels, size, dm.heightPixels, dn);
                    }
                    return true;
                }
                return false;
            }
        });

        createTarget(c, dn); // ajoutee avant la bulle pour rester dessous
        try {
            wm.addView(root, lp);
        } catch (Throwable t) {
            remove();
            return;
        }
        root.setScaleX(0f);
        root.setScaleY(0f);
        root.animate().scaleX(1f).scaleY(1f).setDuration(260).setInterpolator(new OvershootInterpolator()).start();
    }
}
