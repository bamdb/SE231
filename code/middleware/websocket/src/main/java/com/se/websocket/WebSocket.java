package com.se.websocket;


import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.nio.charset.StandardCharsets;
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
        String queueName = String.valueOf(userId);
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("47.103.107.39");
        try {
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();

            channel.queueDeclare(queueName, false, false, false, null);
            System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
                System.out.println(" [x] Received '" + message + "'");
                session.getBasicRemote().sendText(message);
            };
            channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @OnClose
    public void onClose() {
        log.info("[websocket info] one connection disconnect");
    }

    @OnMessage
    public void onMessage(String message) {
        log.info("[websocket info] receive message from client: {}", message);
    }

    public void sendMessage(String message, Long userId, String uuid) {
        String queueName;
        if (uuid.equals("nouuid")) {
            queueName = "userid-" + userId;
        } else {
            queueName = "uuid-" + uuid;
        }

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("47.103.107.39");
        try {
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            channel.queueDeclare(queueName, false, false, false, null);
            channel.basicPublish("", queueName, null, message.getBytes());
            System.out.println(" [x] Sent '" + message + "'");
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
