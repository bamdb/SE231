package com.se.topicservice.service.impl;

import com.se.topicservice.client.UserClient;
import com.se.topicservice.config.ds.DataSource;
import com.se.topicservice.dao.MongoDao;
import com.se.topicservice.dao.ReadDao;
import com.se.topicservice.dao.WriteDao;
import com.se.topicservice.entity.*;
import com.se.topicservice.repository.TopicMongoRepository;
import com.se.topicservice.repository.TopicRepository;
import com.se.topicservice.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class TopicServiceImpl implements TopicService {

    @Resource(name="mongoDaoImpl")
    private MongoDao mongoDao;

    @Resource(name="readDaoImpl")
    private ReadDao readDao;

    @Resource(name="writeDaoImpl")
    private WriteDao writeDao;

    @Autowired
    public UserClient userClient;

    public Topic postTopic(TopicIn topicIn) {
        // check if topic publisher exists in User table
        Topic topic = topicIn.getTopic();
        if (topic.getUserId() == null || userClient.getUserById(topic.getUserId()) == null) {
            return null;
        }
        Topic returnTopic = writeDao.save(topic);

        // initialize corresponding topic page
        TopicPage topicPage = new TopicPage();
        topicPage.setId(String.valueOf(returnTopic.getId()));
        topicPage.setTopicContent(topicIn.getTopicContent());
        topicPage.setReplyList(new ArrayList<>());
        mongoDao.save(topicPage);

        return returnTopic;
    }

    @Override
    @DataSource("slave")
    public Iterable<Topic> selectAll() {
        return readDao.findAll();
    }

    public TopicPage selectById(Long id) {
        return mongoDao.findById(String.valueOf(id));
    }

    public Topic updateTopic(Topic topic) {
        if (readDao.existsById(topic.getId())) {
            Topic tempTopic = readDao.findById(topic.getId());
            tempTopic.setTitle(topic.getTitle());
            return writeDao.save(tempTopic);
        }
        else return null;
    }

    public ResponseEntity<?> deleteTopicById(Long id) {
        writeDao.deleteById(id);
        mongoDao.deleteById(String.valueOf(id));
        return ResponseEntity.ok().body("delete topic successfully!");
    }

    public ResponseEntity<?> deleteReplyById(Long topicId, Long replyId) {
        // check if topic exists
        if (readDao.findById(topicId) == null) {
            return ResponseEntity.ok().body("Topic cannot be found!");
        }

        TopicPage topicPage = mongoDao.findById(String.valueOf(topicId));
        if (topicPage == null) {
            topicPage = new TopicPage();
            topicPage.setReplyList(new ArrayList<>());
        }
        if (topicPage.getReplyList() == null) {
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
        mongoDao.save(topicPage);

        return ResponseEntity.ok().body("delete topic successfully!");
    }

    public TopicPage postReply(Long topicId, Long userId, String topicContent) {
        User user = userClient.getUserById(userId);
        // check if user exists
        if (user == null) {
            return null;
        }

        // check if topic exists
        if (readDao.findById(topicId) == null) {
            return null;
        }

        TopicPage topicPage = mongoDao.findById(String.valueOf(topicId));
        Reply reply = new Reply();
        reply.setUser(user);
        reply.setReplyContent(topicContent);
        List<Reply> replyList;
        if (topicPage == null) {
            topicPage = new TopicPage();
            topicPage.setReplyList(new ArrayList<>());
        }
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

        mongoDao.save(topicPage);

        return topicPage;
    }

}
