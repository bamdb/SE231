package com.se.messageservice;

import org.bson.BsonTimestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.google.common.collect.Iterables;
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
    public String selectBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, BsonTimestamp send_time) {
        Message message = messageRepository.findBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, send_time).orElse(null);
        return (message == null)?null: message.getContent();
    }
    public void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, BsonTimestamp send_time) {
        messageRepository.deleteBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, send_time);
    }
    public void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        /*delete messages sent from both sides*/
        messageRepository.deleteAllBySenderIdAndReceiverId(senderId, receiverId);
        messageRepository.deleteAllBySenderIdAndReceiverId(receiverId, senderId);
    }
    public Iterable<Message> selectBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        /*select messages sent from both sides*/
        return Iterables.concat(messageRepository.findBySenderIdAndReceiverId(senderId, receiverId),
                messageRepository.findBySenderIdAndReceiverId(receiverId, senderId));
    }
    public Message addMessage(Message message) {
        if (!friendClient.isFriend(message.getSenderId(), message.getReceiverId())) return null;
        else return messageRepository.save(message);
    }
}