package com.se.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class MessageController {

    @Autowired
    private WebSocket webSocket;

    @GetMapping(value = "/message")
    public void newMessage() {
        webSocket.sendMessage("您有新的消息");
    }

    @GetMapping(value = "/friend")
    public void newFriend() {
        webSocket.sendMessage("您有新的好友请求");
    }

    @GetMapping(value = "/qrcode")
    public void passQrcode(@RequestParam("token") String token) {
        webSocket.sendMessage(token);
    }
}