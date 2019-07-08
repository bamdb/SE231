package com.se.messageservice;

import org.bson.BsonTimestamp;
import org.bson.conversions.Bson;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface MessageRepository extends CrudRepository<Message, String> {
    Optional<Message> findBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, BsonTimestamp send_time);
    @Transactional
    void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, BsonTimestamp send_time);
    @Transactional
    void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
}
