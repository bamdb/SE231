package com.se.messageservice.controller;


import com.se.messageservice.config.intercepter.FeignRequestInterceptor;
import com.se.messageservice.service.MessageService;
import com.se.messageservice.entity.Message;
import com.se.messageservice.entity.MessageOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class MessageController {
    private final
    MessageService messageService;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/content", produces ="application/json")
    public String selectBySenderIdAndReceiverIdAndSendTime(@RequestParam("senderId") Long senderId,
                                                    @RequestParam("receiverId") Long receiverId,
                                                    @RequestParam("sendTime") Long send_time) {
        return messageService.selectBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, send_time);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/delete/one", produces ="application/json")
    public ResponseEntity<?> deleteBySenderIdAndReceiverIdAndSendTime(@RequestParam("senderId") Long senderId,
                                                               @RequestParam("receiverId") Long receiverId,
                                                               @RequestParam("sendTime") Long send_time) {
        messageService.deleteBySenderIdAndReceiverIdAndSendTime(senderId, receiverId, send_time);
        return ResponseEntity.ok().body("Delete message successfully!");
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value = "/delete/all", produces ="application/json")
    public ResponseEntity<?> deleteAllBySenderIdAndReceiverId(@RequestParam("senderId") Long senderId,
                                                       @RequestParam("receiverId") Long receiverId) {
        /*delete messages sent from both sides*/
        messageService.deleteAllBySenderIdAndReceiverId(senderId, receiverId);
        return ResponseEntity.ok().body("Delete messages successfully!");
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/all", produces ="application/json")
    public Iterable<Message> selectBySenderIdAndReceiverId(@RequestParam("senderId") Long senderId,
                                                    @RequestParam("receiverId") Long receiverId) {
        return messageService.selectBySenderIdAndReceiverId(senderId, receiverId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/senderid/{senderId}", produces ="application/json")
    public List<MessageOut> selectBySenderId(@PathVariable Long senderId) {
        return messageService.selectBySenderId(senderId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value = "/receiverid/{receiverId}", produces ="application/json")
    public List<MessageOut> selectByReceiverId(@PathVariable Long receiverId) {
        return messageService.selectByReceiverId(receiverId);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value = "/add", produces ="application/json")
    public Message addMessage(@RequestBody Message message, @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return messageService.addMessage(message);
    }
}