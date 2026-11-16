package com.cns.tooole;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Shader;
import android.graphics.Typeface;
import android.graphics.drawable.AdaptiveIconDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.Person;
import androidx.core.content.ContextCompat;
import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;
import com.google.firebase.messaging.RemoteMessage;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

public class BubbleHelper {
    public static volatile boolean appVisible = false;
    private static final String CH = "toole_bulles";
    private static final int[] PALETTE = {0xFF1B6EF3, 0xFFE8590C, 0xFF2B8A3E, 0xFF9C36B5, 0xFFD6336C, 0xFF0C8599};

    public static boolean enabled(Context c) {
        return c.getSharedPreferences("toole_native", Context.MODE_PRIVATE).getBoolean("bulles", true);
    }

    public static void setEnabled(Context c, boolean v) {
        SharedPreferences.Editor e = c.getSharedPreferences("toole_native", Context.MODE_PRIVATE).edit();
        e.putBoolean("bulles", v);
        e.apply();
    }

    private static String pick(Map<String, String> d, String... keys) {
        for (String k : keys) {
            String v = d.get(k);
            if (v != null && v.trim().length() > 0 && !"null".equals(v) && !"undefined".equals(v)) return v;
        }
        return null;
    }

    /* ---------- dessin de la bulle : cercle + logo inscrit + badge de la personne ---------- */

    private static String initials(String name) {
        StringBuilder r = new StringBuilder();
        if (name != null) {
            for (String part : name.trim().split("\\s+")) {
                if (part.length() > 0 && r.length() < 2 && Character.isLetterOrDigit(part.charAt(0))) {
                    r.append(Character.toUpperCase(part.charAt(0)));
                }
            }
        }
        return r.length() > 0 ? r.toString() : "T";
    }

    private static Bitmap fetch(String url) {
        try {
            if (url == null || !url.startsWith("http")) return null;
            HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
            c.setConnectTimeout(3000);
            c.setReadTimeout(3000);
            InputStream in = c.getInputStream();
            Bitmap b = BitmapFactory.decodeStream(in);
            in.close();
            return b;
        } catch (Throwable t) {
            return null;
        }
    }

    private static void drawPhotoCircle(Canvas cv, Bitmap src, float cx, float cy, float r) {
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG | Paint.FILTER_BITMAP_FLAG);
        BitmapShader sh = new BitmapShader(src, Shader.TileMode.CLAMP, Shader.TileMode.CLAMP);
        float s = (2 * r) / Math.min(src.getWidth(), src.getHeight());
        Matrix m = new Matrix();
        m.setScale(s, s);
        m.postTranslate(cx - src.getWidth() * s / 2f, cy - src.getHeight() * s / 2f);
        sh.setLocalMatrix(m);
        p.setShader(sh);
        cv.drawCircle(cx, cy, r, p);
    }

    static Bitmap compose(Context ctx, String name, Bitmap photo) {
        final int S = 256;
        Bitmap out = Bitmap.createBitmap(S, S, Bitmap.Config.ARGB_8888);
        Canvas cv = new Canvas(out);
        Paint p = new Paint(Paint.ANTI_ALIAS_FLAG);
        float c = S / 2f;

        // disque blanc avec un fin anneau gris
        p.setStyle(Paint.Style.FILL);
        p.setColor(Color.WHITE);
        cv.drawCircle(c, c, c - 4, p);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeWidth(6);
        p.setColor(0xFFDDE3EE);
        cv.drawCircle(c, c, c - 4, p);

        // logo inscrit dans le cercle
        try {
            Drawable d = ContextCompat.getDrawable(ctx, R.mipmap.ic_launcher);
            if (d != null) {
                boolean adaptive = Build.VERSION.SDK_INT >= 26 && d instanceof AdaptiveIconDrawable;
                int in = adaptive ? (int) (-0.15f * S) : (int) (0.17f * S);
                cv.save();
                Path clip = new Path();
                clip.addCircle(c, c, c - 9, Path.Direction.CW);
                cv.clipPath(clip);
                d.setBounds(in, in, S - in, S - in);
                d.draw(cv);
                cv.restore();
            }
        } catch (Throwable t) { }

        // badge de la personne (photo ou initiales), en bas a gauche
        float br = S * 0.21f;
        float bx = br + 3, by = S - br - 3;
        p.setStyle(Paint.Style.FILL);
        p.setColor(Color.WHITE);
        cv.drawCircle(bx, by, br + 6, p);
        if (photo != null) {
            drawPhotoCircle(cv, photo, bx, by, br);
        } else {
            String key = name == null ? "T" : name;
            p.setColor(PALETTE[Math.abs(key.hashCode()) % PALETTE.length]);
            cv.drawCircle(bx, by, br, p);
            p.setColor(Color.WHITE);
            p.setTypeface(Typeface.DEFAULT_BOLD);
            p.setTextAlign(Paint.Align.CENTER);
            String ini = initials(name);
            p.setTextSize(ini.length() > 1 ? br * 0.95f : br * 1.15f);
            Paint.FontMetrics fm = p.getFontMetrics();
            cv.drawText(ini, bx, by - (fm.ascent + fm.descent) / 2f, p);
        }
        return out;
    }

    /* ---------- notification + bulle ---------- */

    public static void show(Context ctx, RemoteMessage m) {
        if (!enabled(ctx)) return;
        Map<String, String> d = m.getData();
        if ("post".equals(d.get("type"))) return;
        String peer = pick(d, "peer");
        String group = pick(d, "group");
        String title = pick(d, "gname", "title", "sender", "from", "name");
        String body = pick(d, "body", "message", "text", "content");
        RemoteMessage.Notification n = m.getNotification();
        if (n != null) {
            if (title == null) title = n.getTitle();
            if (body == null) body = n.getBody();
        }
        if (body == null) return;
        if (title == null) title = "TÕÕLé";

        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel ch = new NotificationChannel(CH, "Messages TÕÕLé", NotificationManager.IMPORTANCE_HIGH);
            if (Build.VERSION.SDK_INT >= 29) ch.setAllowBubbles(true);
            nm.createNotificationChannel(ch);
        }

        String key = group != null ? "g" + group : (peer != null ? "p" + peer : "n" + title);
        int id = Math.abs(key.hashCode());
        String sid = "c_" + id;

        Bitmap photo = fetch(pick(d, "avatar", "photo", "pic", "picture"));
        IconCompat icon = IconCompat.createWithBitmap(compose(ctx, title, photo));

        Person sender = new Person.Builder().setName(title).setKey(sid).setImportant(true)
                .setIcon(icon).build();

        Intent open = new Intent(ctx, MainActivity.class).setAction(Intent.ACTION_MAIN)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        ShortcutInfoCompat sc = new ShortcutInfoCompat.Builder(ctx, sid)
                .setLongLived(true).setShortLabel(title).setPerson(sender)
                .setIcon(icon)
                .setIntent(open).build();
        ShortcutManagerCompat.pushDynamicShortcut(ctx, sc);

        Intent bi = new Intent(ctx, BubbleChatActivity.class).setAction(Intent.ACTION_VIEW)
                .setData(Uri.parse("toole://bulle/" + Uri.encode(key)))
                .putExtra("p", peer).putExtra("g", group).putExtra("n", title);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 31 ? PendingIntent.FLAG_MUTABLE : 0);
        PendingIntent bubblePi = PendingIntent.getActivity(ctx, id, bi, flags);
        PendingIntent tapPi = PendingIntent.getActivity(ctx, id + 1, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.BubbleMetadata meta = new NotificationCompat.BubbleMetadata.Builder(bubblePi, icon)
                .setDesiredHeight(560).setAutoExpandBubble(false).setSuppressNotification(false).build();

        Person me = new Person.Builder().setName("Moi").build();
        NotificationCompat.MessagingStyle style = new NotificationCompat.MessagingStyle(me)
                .addMessage(body, System.currentTimeMillis(), sender);

        NotificationCompat.Builder b = new NotificationCompat.Builder(ctx, CH)
                .setSmallIcon(R.drawable.ic_stat_toole).setContentTitle(title).setContentText(body)
                .setStyle(style).setCategory(NotificationCompat.CATEGORY_MESSAGE)
                .setPriority(NotificationCompat.PRIORITY_HIGH).setAutoCancel(true)
                .setShortcutId(sid).setContentIntent(tapPi);
        boolean overlay = FloatingBubble.canShow(ctx);
        if (!overlay) b.setBubbleMetadata(meta);
        nm.notify(id, b.build());
        if (overlay) FloatingBubble.show(ctx, title, peer, group, photo);
    }
}
