package com.se.messageservice;



import javax.transaction.Transactional;
import java.util.Optional;

public interface MessageService {
    String selectBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time);
    void deleteBySenderIdAndReceiverIdAndSendTime(Long senderId, Long receiverId, Long send_time);
    void deleteAllBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Iterable<Message> selectBySenderIdAndReceiverId(Long senderId, Long receiverId);
    Message addMessage(Message message);
}
