package com.se.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.channels.Channel;


@RestController
public class MessageController {

    @Autowired
    private WebSocket webSocket;

    @Autowired
    private ChatWebSocket chatWebSocket;

    @GetMapping(value = "/message/{userId}")
    public void newMessage(@PathVariable("userId") Long userId){
        webSocket.sendMessage("您有新的消息", userId, "nouuid");
    }

    @GetMapping(value = "/friend")
    public void newFriend(@RequestParam("userIdReq") Long userIdReq, @RequestParam("userIdRecv") Long userIdRecv) {
        webSocket.sendMessage(userIdReq+" "+userIdRecv, userIdRecv, "nouuid");
    }

    @GetMapping(value = "/qrcode")
    public void passQrcode(@RequestParam("token") String token, @RequestParam("uuid") String uuid) {
        webSocket.sendMessage(token, 0L, uuid);
    }

    @PutMapping(value = "/chat")
    public void pubChat(@RequestParam("userId") Long userId, @RequestParam("content") String content) {
        chatWebSocket.pubMessage(content, userId);
    }
}