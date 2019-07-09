package com.se.topicservice;

import com.se.topicservice.entity.*;
import com.se.topicservice.repository.TopicMongoRepository;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class TopicServiceImpl implements TopicService{
    private final
    TopicRepository topicRepository;

    private final
    TopicMongoRepository topicMongoRepository;

    @Autowired
    public TopicServiceImpl(TopicRepository topicRepository, TopicMongoRepository topicMongoRepository) {
        this.topicRepository = topicRepository;
        this.topicMongoRepository = topicMongoRepository;
    }

    @Autowired
    public UserClient userClient;

    public Topic postTopic(TopicIn topicIn) {
        // check if topic publisher exists in User table
        Topic topic = topicIn.getTopic();
        if (topic.getUserId() == null || userClient.getUserById(topic.getUserId()) == null) {
            return null;
        }
        Topic returnTopic = topicRepository.save(topic);

        // initialize corresponding topic page
        TopicPage topicPage = new TopicPage();
        topicPage.setId(String.valueOf(returnTopic.getId()));
        topicPage.setTopicContent(topicIn.getTopicContent());
        topicPage.setReplyList(null);
        topicMongoRepository.save(topicPage);

        return returnTopic;
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

    @Override
    public TopicPage postReply(Long topicId, ReplyIn replyIn) {
        Topic topic = selectById(topicId);
        if (topicId == null) {
            return null;
        }
        User user = userClient.getUserById(replyIn.getUserId());
        // check if user exists
        if (user == null) {
            return null;
        }

        TopicPage topicPage = topicMongoRepository.findById(String.valueOf(topicId)).orElse(null);
        Reply reply = new Reply();
        reply.setUser(user);
        reply.setReplyContent(replyIn.getReplyContent());
        topicPage.getReplyList().add(reply);

        topicMongoRepository.save(topicPage);

        return topicPage;
    }

}
