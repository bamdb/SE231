package com.se.messageservice;



import com.se.messageservice.entity.Message;

public interface MessageService {
    String selectBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time);
    void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time);
    void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> selectBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> selectByReceiverId(Long receiverId);
    Iterable<Message> selectBySenderId(Long senderId);
    Message addMessage(Message message);
}
