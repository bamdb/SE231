package com.se.topicservice.service;

import com.se.topicservice.entity.Topic;
import com.se.topicservice.entity.TopicIn;
import com.se.topicservice.entity.TopicPage;
import org.springframework.http.ResponseEntity;

public interface TopicService {
    Topic postTopic(TopicIn topicIn);
    Iterable<Topic> selectAll();
    TopicPage selectById(Long id);
    Topic updateTopic(Topic topic);
    ResponseEntity<?> deleteTopicById(Long id);
    ResponseEntity<?> deleteReplyById(Long topicId, Long replyId);
    TopicPage postReply(Long topicId, Long userId, String topicContent);
}
