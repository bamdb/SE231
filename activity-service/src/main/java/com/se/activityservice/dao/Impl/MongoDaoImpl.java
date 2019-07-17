package com.se.activityservice.dao.Impl;

import com.se.topicservice.dao.MongoDao;
import com.se.topicservice.entity.TopicPage;
import com.se.topicservice.repository.TopicMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MongoDaoImpl implements MongoDao {

    private final
    TopicMongoRepository topicMongoRepository;

    @Autowired
    public MongoDaoImpl(TopicMongoRepository topicMongoRepository) {
        this.topicMongoRepository = topicMongoRepository;
    }

    @Override
    public TopicPage save(TopicPage topicPage) {
        return topicMongoRepository.save(topicPage);
    }

    @Override
    public TopicPage findById(String topicId) {
        return topicMongoRepository.findById(topicId).orElse(null);
    }

    @Override
    public void deleteById(String topicId) {
        topicMongoRepository.deleteById(topicId);
    }
}
