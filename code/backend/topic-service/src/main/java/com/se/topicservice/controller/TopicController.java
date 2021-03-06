package com.se.topicservice.controller;

import com.se.topicservice.config.intercepter.FeignRequestInterceptor;
import com.se.topicservice.entity.*;
import com.se.topicservice.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
public class TopicController {
    @Resource(name="topicServiceImpl")
    private TopicService topicService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value="/add", produces="application/json")
    public Topic postTopic(@RequestBody TopicIn topicIn, @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return topicService.postTopic(topicIn);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(value="/add/reply", produces="application/json")
    public TopicPage postReply(@RequestParam("topicId") Long topicId,
                               @RequestParam("userId") Long userId,
                               @RequestBody String topicContent,
                               @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return topicService.postReply(topicId, userId, topicContent);
    }

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<Topic> getAllTopics() {
        return topicService.selectAll();
    }


    @GetMapping(value="/id/{topicId}", produces="application/json")
    public TopicPage getTopicById(@PathVariable("topicId") Long topicId) {
        return topicService.selectById(topicId);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @PutMapping(value="/update", produces="application/json")
    public Topic updateTopic(@RequestBody Topic topic) {
        return topicService.updateTopic(topic);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @DeleteMapping(value="/delete/id/{topicId}")
    public ResponseEntity<?> deleteTopicById(@PathVariable("topicId") Long topicId) {
        return topicService.deleteTopicById(topicId);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @DeleteMapping(value="/delete/reply")
    public ResponseEntity<?> deleteReplyById(@RequestParam("topicId") Long topicId, @RequestParam("replyId") Long replyId) {
        return topicService.deleteReplyById(topicId, replyId);
    }

}
