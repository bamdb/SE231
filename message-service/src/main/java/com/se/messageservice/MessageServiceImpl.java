package com.se.messageservice;

import com.se.messageservice.client.FriendClient;
import com.se.messageservice.client.UserClient;
import com.se.messageservice.entity.Message;
import com.se.messageservice.entity.MessageOut;
import com.se.messageservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;


@Service
public class MessageServiceImpl implements MessageService {
    private final
    MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, FriendClient friendClient, UserClient userClient) {
        this.messageRepository = messageRepository;
        this.friendClient = friendClient;
        this.userClient = userClient;
    }

    private final FriendClient friendClient;
    private final UserClient userClient;
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

    public List<MessageOut> selectByReceiverId(Long receiverId) {
        List<MessageOut> ms = new LinkedList<>();
        Iterable<Message> messageIterable = messageRepository.findByReceiverId(receiverId);
        Iterator<Message> messageIterator = messageIterable.iterator();
        while (messageIterator.hasNext()) {
            Message message = messageIterator.next();
            User user = userClient.getUserById(message.getSenderId());
            MessageOut messageOut = new MessageOut();
            messageOut.setMessage(message);
            messageOut.setUser(user);
            ms.add(messageOut);
        }
        return ms;
    }

    public List<MessageOut> selectBySenderId(Long senderId) {
        List<MessageOut> ms = new LinkedList<>();
        Iterable<Message> messageIterable = messageRepository.findBySenderId(senderId);
        Iterator<Message> messageIterator = messageIterable.iterator();
        while (messageIterator.hasNext()) {
            Message message = messageIterator.next();
            User user = userClient.getUserById(message.getReceiverId());
            MessageOut messageOut = new MessageOut();
            messageOut.setMessage(message);
            messageOut.setUser(user);
            ms.add(messageOut);
        }
        return ms;
    }

    public Message addMessage(Message message) {
        if (!friendClient.isFriend(message.getSenderId(), message.getReceiverId())) return null;
        else return messageRepository.save(message);
    }
}