package com.se.messageservice;

import com.se.messageservice.client.FriendClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.common.collect.Iterables;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;


@Service
public class MessageServiceImpl implements MessageService {
    private final
    MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, FriendClient friendClient) {
        this.messageRepository = messageRepository;
        this.friendClient = friendClient;
    }

    private final FriendClient friendClient;
    public String selectBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time) {
        Message message = messageRepository.findBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, new Timestamp( send_time)).orElse(null);
        return (message == null)?null: message.getContent();
    }
    public void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time) {
        messageRepository.deleteBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, new Timestamp( send_time));
    }
    public void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        /*delete messages sent from both sides*/
        messageRepository.deleteAllBySenderIdAndReceiverId(senderId, receiverId);
        messageRepository.deleteAllBySenderIdAndReceiverId(receiverId, senderId);
    }
    public Iterable<Message> selectBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        /*select messages sent from both sides*/
        List<Message> ms = new LinkedList<>();
        messageRepository.findBySenderIdAndReceiverId(senderId, receiverId).forEach(ms::add);
        messageRepository.findBySenderIdAndReceiverId(receiverId, senderId).forEach(ms::add);
        return ms;
    }

    public Iterable<Message> selectByReceiverId(Long receiverId) {
        List<Message> ms = new LinkedList<>();
        messageRepository.findByReceiverId(receiverId).forEach(ms::add);
        return ms;
    }

    public Iterable<Message> selectBySenderId(Long senderId) {
        List<Message> ms = new LinkedList<>();
        messageRepository.findByReceiverId(senderId).forEach(ms::add);
        return ms;
    }

    public Message addMessage(Message message) {
        if (!friendClient.isFriend(message.getSenderId(), message.getReceiverId())) return null;
        else return messageRepository.save(message);
    }
}