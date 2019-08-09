package com.se.messageservice.dao.impl;

import com.se.messageservice.dao.MongoDao;
import com.se.messageservice.entity.Message;
import com.se.messageservice.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public class MongoDaoImpl implements MongoDao {

    private final MessageRepository messageRepository;

    @Autowired
    public MongoDaoImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message findBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Timestamp timestamp) {
        return messageRepository.findBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, timestamp).orElse(null);
    }

    @Override
    public Iterable<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    @Override
    public Iterable<Message> findByReceiverId(Long receiverId) {
        return messageRepository.findByReceiverId(receiverId);
    }

    @Override
    public Iterable<Message> findBySenderId(Long senderId) {
        return messageRepository.findBySenderId(senderId);
    }

    @Override
    public void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Timestamp timestamp) {
        messageRepository.deleteBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, timestamp);
    }

    @Override
    public void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        messageRepository.deleteAllBySenderIdAndReceiverId(senderId, receiverId);
    }

    @Override
    public Message save(Message message) {
        return messageRepository.save(message);
    }
}
