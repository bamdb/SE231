package com.se.topicservice;

public interface TopicService {
    Iterable<Topic> selectAll();
    Topic selectById(Long id);
    Topic updateTopic(Topic topic);
    void deleteTopicById(Long id);
}
