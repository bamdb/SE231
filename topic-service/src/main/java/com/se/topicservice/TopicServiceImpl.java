package com.se.topicservice;

import com.se.topicservice.entity.Topic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TopicServiceImpl implements TopicService{
    private final
    TopicRepository topicRepository;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Autowired
    public UserClient userClient;

    public Topic postTopic(Topic topic) {
        // check if topic publisher exists in User table
        //if (topic.getUserId() == null || userClient.getUserById(topic.getUserId()) == null) {
        //    return null;
        //}
        return topicRepository.save(topic);
    }

    public Iterable<Topic> selectAll() {
        return topicRepository.findAll();
    }

    public Topic selectById(Long id) {
        return topicRepository.findById(id).orElse(null);
    }

    public Topic updateTopic(Topic topic) {
        if (topicRepository.existsById(topic.getId())) {
            Topic tempTopic = topicRepository.findById(topic.getId()).orElse(null);
            tempTopic.setTitle(topic.getTitle());
            return topicRepository.save(tempTopic);
        }
        else return null;
    }

    public ResponseEntity<?> deleteTopicById(Long id) {
        topicRepository.deleteById(id);
        return ResponseEntity.ok().body("delete topic successfully!");
    }

}
