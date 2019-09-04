package com.se.messageservice.dao;

import com.se.messageservice.entity.Message;

import java.sql.Timestamp;

public interface MongoDao {

    Message findBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Timestamp timestamp);

    Iterable<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    Iterable<Message> findByReceiverId(Long receiverId);

    Iterable<Message> findBySenderId(Long senderId);

    void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Timestamp timestamp);

    void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId);

    Message save(Message message);
}
