package com.se.topicservice;

import com.se.topicservice.entity.Topic;
import org.springframework.http.ResponseEntity;

public interface TopicService {
    Topic postTopic(Topic topic);
    Iterable<Topic> selectAll();
    Topic selectById(Long id);
    Topic updateTopic(Topic topic);
    ResponseEntity<?> deleteTopicById(Long id);
}
