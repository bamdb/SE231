package com.se.topicservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicServiceImpl implements TopicService{
    private final
    TopicRepository topicRepository;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public Iterable<Topic> selectAll() {
        return topicRepository.findAll();
    }

    public Topic selectById(Long id) {
        return topicRepository.findById(id).orElse(null);
    }

    public Topic updateTopic(Topic topic) {
        if (topicRepository.existsById(topic.getId()))
            return topicRepository.save(topic);
        else return null;
    }

    public void deleteTopicById(Long id) {
        topicRepository.deleteById(id);
    }

}
