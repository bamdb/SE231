package com.se.messageservice.service.impl;

import com.netflix.discovery.converters.Auto;
import com.se.messageservice.client.FriendClient;
import com.se.messageservice.client.UserClient;
import com.se.messageservice.dao.MongoDao;
import com.se.messageservice.entity.Message;
import com.se.messageservice.entity.MessageOut;
import com.se.messageservice.entity.User;
import com.se.messageservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;


@Service
public class MessageServiceImpl implements MessageService {

    @Resource(name="mongoDaoImpl")
    private MongoDao mongoDao;

    @Autowired
    private FriendClient friendClient;

    @Autowired
    private  UserClient userClient;

    @Autowired
    RestTemplate restTemplate;

    public String selectBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time) {
        Message message = mongoDao.findBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, new Timestamp( send_time));
        return (message == null)?null: message.getContent();
    }
    public void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time) {
        mongoDao.deleteBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, new Timestamp( send_time));
    }
    public void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        /*delete messages sent from both sides*/
        mongoDao.deleteAllBySenderIdAndReceiverId(senderId, receiverId);
        mongoDao.deleteAllBySenderIdAndReceiverId(receiverId, senderId);
    }
    public Iterable<Message> selectBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        /*select messages sent from both sides*/
        List<Message> ms = new LinkedList<>();
        mongoDao.findBySenderIdAndReceiverId(senderId, receiverId).forEach(ms::add);
        mongoDao.findBySenderIdAndReceiverId(receiverId, senderId).forEach(ms::add);
        return ms;
    }

    public List<MessageOut> selectByReceiverId(Long receiverId) {
        List<MessageOut> ms = new LinkedList<>();
        Iterable<Message> messageIterable = mongoDao.findByReceiverId(receiverId);
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
        Iterable<Message> messageIterable = mongoDao.findBySenderId(senderId);
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
        else {
            // notify receiver
            restTemplate.getForObject("http://47.103.107.39:8080/websocket/{1}/{2}", void.class,
                     "nouuid", message.getReceiverId());
            return mongoDao.save(message);
        }
    }
}