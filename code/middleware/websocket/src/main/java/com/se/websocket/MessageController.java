package com.se.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class MessageController {

    @Autowired
    private WebSocket webSocket;

    @GetMapping(value = "/message")
    public void testMessage() {
        webSocket.sendMessage("您有新的消息");
    }
}