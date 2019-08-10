package com.se.websocket;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/chatwebsocket")
@Slf4j
public class ChatWebSocket {

    private Session session;
    private Connection connection;
    private Channel channel;


    private static CopyOnWriteArraySet<ChatWebSocket> webSockets = new CopyOnWriteArraySet<>();

    @OnOpen
    public void onOpen(Session session) {
        String exchangeName = "chatroom";
        this.session = session;

        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("47.103.107.39");
        try {
            this.connection = factory.newConnection();
            this.channel = this.connection.createChannel();

            channel.exchangeDeclare(exchangeName, "fanout");
            String queueName = channel.queueDeclare().getQueue();
            channel.queueBind(queueName, exchangeName, "");

            System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), StandardCharsets.UTF_8);
                System.out.println(" [x] Received '" + message + "'");
            };
            channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
            });
            webSockets.add(this);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose() {
        try {
            this.session.close();
            this.channel.close();
            this.connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        webSockets.remove(this);
        log.info("[websocket info] one connection disconnect");
    }

    @OnMessage
    public void onMessage(String message) {
        log.info("[websocket info] receive message from client: {}", message);
    }

    public void pubMessage(String message, Long userId) {
        String exchangeName = "chatroom";
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("47.103.107.39");
        try {
            Connection connection = factory.newConnection();
            Channel channel = connection.createChannel();
            channel.exchangeDeclare(exchangeName, "fanout");

            channel.basicPublish(exchangeName, "", null, message.getBytes(StandardCharsets.UTF_8));
            System.out.println(" [x] Sent '" + message + "'");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}