package com.se.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class MessageController {

    @Autowired
    private WebSocket webSocket;

    @GetMapping(value = "/message/{userId}")
    public void newMessage(@PathVariable("userId") Long userId){
        webSocket.sendMessage("您有新的消息", userId, "nouuid");
    }

    @GetMapping(value = "/friend/{userId}")
    public void newFriend(@PathVariable("userId") Long userId) {
        webSocket.sendMessage("您有新的好友请求", userId, "nouuid");
    }

    @GetMapping(value = "/qrcode")
    public void passQrcode(@RequestParam("token") String token, @RequestParam("uuid") String uuid) {
        webSocket.sendMessage(token, 0L, uuid);
    }
}