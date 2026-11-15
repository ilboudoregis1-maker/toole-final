package com.cns.tooole;

import android.content.Intent;
import android.os.Bundle;
import com.google.firebase.messaging.RemoteMessage;

public class BubbleMessagingService extends com.capacitorjs.plugins.pushnotifications.MessagingService {
    @Override
    public void onMessageReceived(RemoteMessage message) {
        super.onMessageReceived(message);
        try {
            if (!BubbleHelper.appVisible) BubbleHelper.show(this, message);
        } catch (Throwable t) { }
    }

    /* Appli fermee ou en arriere-plan : Firebase affiche seul les messages avec bloc
       "notification" sans appeler onMessageReceived. On les intercepte ici pour la bulle. */
    @Override
    public void handleIntent(Intent intent) {
        try {
            Bundle b = intent == null ? null : intent.getExtras();
            if (b != null && !BubbleHelper.appVisible && BubbleHelper.enabled(this)) {
                RemoteMessage m = new RemoteMessage(b);
                if (m.getNotification() != null && !"post".equals(m.getData().get("type"))) {
                    BubbleHelper.show(this, m);
                    return;
                }
            }
        } catch (Throwable t) { }
        super.handleIntent(intent);
    }
}
