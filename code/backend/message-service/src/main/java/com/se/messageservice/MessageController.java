package com.se.messageservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class MessageController {
    private final
    MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping(value = "/content", produces ="application/json")
    String selectBySenderIdAndReceiverIdAndSendTime(@RequestParam("senderId") Long senderId,
                                                    @RequestParam("receiverId") Long receiverId,
                                                    @RequestParam("sendTime") Long send_time) {
        return messageService.selectBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, send_time);
    }

    @DeleteMapping(value = "/delete/one", produces ="application/json")
    ResponseEntity<?> deleteBySenderIdAndReceiverIdAndSendTime(@RequestParam("senderId") Long senderId,
                                                               @RequestParam("receiverId") Long receiverId,
                                                               @RequestParam("sendTime") Long send_time) {
        messageService.deleteBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, send_time);
        return ResponseEntity.ok().body("Delete message successfully!");
    }

    @DeleteMapping(value = "/delete/all", produces ="application/json")
    ResponseEntity<?> deleteAllBySenderIdAndReceiverId(@RequestParam("senderId") Long senderId,
                                                       @RequestParam("receiverId") Long receiverId) {
        /*delete messages sent from both sides*/
        messageService.deleteAllBySenderIdAndReceiverId(senderId, receiverId);
        return ResponseEntity.ok().body("Delete messages successfully!");
    }

    @GetMapping(value = "/all", produces ="application/json")
    Iterable<Message> selectBySenderIdAndReceiverId(@RequestParam("senderId") Long senderId,
                                                    @RequestParam("receiverId") Long receiverId) {
        return messageService.selectBySenderIdAndReceiverId(senderId, receiverId);
    }

    @PostMapping(value = "/add", produces ="application/json")
    Message addMessage(@RequestBody Message message) {
        return messageService.addMessage(message);
    }
}