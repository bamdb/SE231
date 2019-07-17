package com.se.topicservice.service;

import com.se.topicservice.client.UserClient;
import com.se.topicservice.config.ds.DataSource;
import com.se.topicservice.entity.*;
import com.se.topicservice.repository.TopicMongoRepository;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        topicPage.setReplyList(new ArrayList<>());
        topicMongoRepository.save(topicPage);

        return returnTopic;
    }

    @Override
    public Iterable<Topic> selectAll() {
        return topicRepository.findAll();
    }

    public TopicPage selectById(Long id) {
        return topicMongoRepository.findById(String.valueOf(id)).orElse(null);
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
        topicMongoRepository.deleteById(String.valueOf(id));
        return ResponseEntity.ok().body("delete topic successfully!");
    }

    public ResponseEntity<?> deleteReplyById(Long topicId, Long replyId) {
        // check if topic exists
        if (topicRepository.findById(topicId).orElse(null) == null) {
            return ResponseEntity.ok().body("Topic cannot be found!");
        }

        TopicPage topicPage = topicMongoRepository.findById(String.valueOf(topicId)).orElse(null);
        if (topicPage.getReplyList().size() == 0) {
            return ResponseEntity.ok().body("Reply cannot be found!");
        }
        List<Reply> replyList = topicPage.getReplyList();
        Reply replyDeleted = new Reply();
        boolean deleted = false;
        for (Reply reply : replyList) {
            if (deleted) {
                reply.setId(reply.getId()-1);
            }
            if (reply.getId().equals(replyId)) {
                replyDeleted = reply;
                deleted = true;
            }
        }
        if (replyDeleted.getId() == null) {
            return ResponseEntity.ok().body("Reply cannot be found!");
        }
        replyList.remove(replyDeleted);
        topicPage.setReplyList(replyList);
        topicMongoRepository.save(topicPage);

        return ResponseEntity.ok().body("delete topic successfully!");
    }

    public TopicPage postReply(Long topicId, Long userId, String topicContent) {
        User user = userClient.getUserById(userId);
        // check if user exists
        if (user == null) {
            return null;
        }

        // check if topic exists
        if (topicRepository.findById(topicId).orElse(null) == null) {
            return null;
        }

        TopicPage topicPage = topicMongoRepository.findById(String.valueOf(topicId)).orElse(null);
        Reply reply = new Reply();
        reply.setUser(user);
        reply.setReplyContent(topicContent);
        List<Reply> replyList;
        if(topicPage.getReplyList().size()>0) {
            replyList = topicPage.getReplyList();
            reply.setId(replyList.get(replyList.size()-1).getId() + 1);
            replyList.add(reply);
        }else {
            replyList = new ArrayList<>();
            reply.setId(1L);
            replyList.add(reply);
        }
        topicPage.setReplyList(replyList);

        topicMongoRepository.save(topicPage);

        return topicPage;
    }

}
