package com.se.messageservice;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Optional;

public interface MessageRepository extends CrudRepository<Message, String> {
    Optional<Message> findBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Timestamp send_time);
    @Transactional
    void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Timestamp send_time);
    @Transactional
    void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> findByReceiverId(Long receiverId);
    Iterable<Message> findBySenderId(Long senderId);
}
