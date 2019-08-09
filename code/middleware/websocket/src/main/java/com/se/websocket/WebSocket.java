package com.se.websocket;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket/{uuid}/{userId}")
@Slf4j
public class WebSocket {
    private Session session;

    private static CopyOnWriteArraySet<WebSocket> webSockets = new CopyOnWriteArraySet<>();

    // used in message notification and friend notification, when user has logged in, and uuid should be "nouuid"
    private Long userId;

    // used in QRcode authentication, when user has not logged in, and userId should be 0.
    private String uuid;

    @OnOpen
    public void onOpen(@PathParam("uuid") String uuid, @PathParam("userId") Long userId, Session session) {
        this.session = session;
        if (userId == 0) {
            this.uuid = uuid;
            this.userId = 0L;
        }else {
            this.userId = userId;
            this.uuid = "nouuid";
        }
        webSockets.add(this);
        log.info("[websocket info] new connection, total: {}", webSockets.size());
    }


    @OnClose
    public void onClose() {
        webSockets.remove(this);
        log.info("[websocket info] one connection disconnect, total: {}", webSockets.size());
    }

    @OnMessage
    public void onMessage(String message) {
        log.info("[websocket info] receive message from client: {}", message);
    }

    public void sendMessage(String message, Long userId){
        for (WebSocket webSocket: webSockets) {
            if (webSocket.userId.equals(userId)) {
                log.info("[websocket info]broadcast, message={}, receiverId={}", message, userId);
                try {
                    webSocket.session.getBasicRemote().sendText(message);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }

    public void sendQRToken(String token, String uuid) {
        for (WebSocket webSocket: webSockets) {
            if (webSocket.uuid.equals(uuid)) {
                log.info("[websocket info]broadcast, message={}, receiverId={}", token, userId);
                try {
                    webSocket.session.getBasicRemote().sendText(token);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                break;
            }
        }
    }
}
