package com.cns.tooole;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.Person;
import androidx.core.content.pm.ShortcutInfoCompat;
import androidx.core.content.pm.ShortcutManagerCompat;
import androidx.core.graphics.drawable.IconCompat;
import com.google.firebase.messaging.RemoteMessage;
import java.util.Map;

public class BubbleHelper {
    public static volatile boolean appVisible = false;
    private static final String CH = "toole_bulles";

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
        Person sender = new Person.Builder().setName(title).setKey(sid).setImportant(true)
                .setIcon(IconCompat.createWithResource(ctx, R.mipmap.ic_launcher)).build();

        Intent open = new Intent(ctx, MainActivity.class).setAction(Intent.ACTION_MAIN)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        ShortcutInfoCompat sc = new ShortcutInfoCompat.Builder(ctx, sid)
                .setLongLived(true).setShortLabel(title).setPerson(sender)
                .setIcon(IconCompat.createWithResource(ctx, R.mipmap.ic_launcher))
                .setIntent(open).build();
        ShortcutManagerCompat.pushDynamicShortcut(ctx, sc);

        Intent bi = new Intent(ctx, BubbleChatActivity.class).setAction(Intent.ACTION_VIEW)
                .setData(Uri.parse("toole://bulle/" + Uri.encode(key)))
                .putExtra("p", peer).putExtra("g", group).putExtra("n", title);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT | (Build.VERSION.SDK_INT >= 31 ? PendingIntent.FLAG_MUTABLE : 0);
        PendingIntent bubblePi = PendingIntent.getActivity(ctx, id, bi, flags);
        PendingIntent tapPi = PendingIntent.getActivity(ctx, id + 1, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.BubbleMetadata meta = new NotificationCompat.BubbleMetadata.Builder(
                bubblePi, IconCompat.createWithResource(ctx, R.mipmap.ic_launcher))
                .setDesiredHeight(560).setAutoExpandBubble(false).setSuppressNotification(false).build();

        Person me = new Person.Builder().setName("Moi").build();
        NotificationCompat.MessagingStyle style = new NotificationCompat.MessagingStyle(me)
                .addMessage(body, System.currentTimeMillis(), sender);

        NotificationCompat.Builder b = new NotificationCompat.Builder(ctx, CH)
                .setSmallIcon(R.drawable.ic_stat_toole).setContentTitle(title).setContentText(body)
                .setStyle(style).setCategory(NotificationCompat.CATEGORY_MESSAGE)
                .setPriority(NotificationCompat.PRIORITY_HIGH).setAutoCancel(true)
                .setShortcutId(sid).setContentIntent(tapPi).setBubbleMetadata(meta);
        nm.notify(id, b.build());
    }
}
