package com.cns.tooole;

import com.google.firebase.messaging.RemoteMessage;

public class BubbleMessagingService extends com.capacitorjs.plugins.pushnotifications.MessagingService {
    @Override
    public void onMessageReceived(RemoteMessage message) {
        super.onMessageReceived(message);
        try {
            if (!BubbleHelper.appVisible) BubbleHelper.show(this, message);
        } catch (Throwable t) { }
    }
}
