package com.se.topicservice;

import com.se.topicservice.entity.ReplyIn;
import com.se.topicservice.entity.Topic;
import com.se.topicservice.entity.TopicIn;
import com.se.topicservice.entity.TopicPage;
import org.springframework.http.ResponseEntity;

public interface TopicService {
    Topic postTopic(TopicIn topicIn);
    Iterable<Topic> selectAll();
    Topic selectById(Long id);
    Topic updateTopic(Topic topic);
    ResponseEntity<?> deleteTopicById(Long id);
    TopicPage postReply(Long topicId, ReplyIn replyIn);
}
