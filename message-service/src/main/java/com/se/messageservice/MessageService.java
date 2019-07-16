package com.se.messageservice;

import com.se.messageservice.entity.Message;
import com.se.messageservice.entity.MessageOut;

import java.util.List;

public interface MessageService {
    String selectBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time);
    void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time);
    void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> selectBySenderIdAndReceiverId(Long senderId, Long receiverId);
    List<MessageOut> selectByReceiverId(Long receiverId);
    List<MessageOut> selectBySenderId(Long senderId);
    Message addMessage(Message message);
}
