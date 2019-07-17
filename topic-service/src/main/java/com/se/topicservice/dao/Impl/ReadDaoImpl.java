package com.se.topicservice.dao.Impl;

import com.se.topicservice.dao.ReadDao;
import com.se.topicservice.repository.TopicMongoRepository;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ReadDaoImpl implements ReadDao {

    private final
    TopicRepository topicRepository;

    @Autowired
    public ReadDaoImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }
}
