package com.se.topicservice.dao.Impl;

import com.se.topicservice.dao.MongoDao;
import com.se.topicservice.repository.TopicMongoRepository;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class MongoDaoImpl implements MongoDao {

    private final
    TopicMongoRepository topicMongoRepository;

    @Autowired
    public MongoDaoImpl(TopicMongoRepository topicMongoRepository) {
        this.topicMongoRepository = topicMongoRepository;
    }
}
