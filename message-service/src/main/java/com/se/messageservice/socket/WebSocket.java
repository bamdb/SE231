package com.se.messageservice.socket;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket")
@Slf4j
public class WebSocket {
    private Session session;

    private static CopyOnWriteArraySet<WebSocket> webSockets = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        this.session = session;
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

    public void sendMessage(String message){
        for (WebSocket webSocket: webSockets) {
            log.info("[websocket info]broadcast, message={}", message);
            try {
                webSocket.session.getBasicRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
