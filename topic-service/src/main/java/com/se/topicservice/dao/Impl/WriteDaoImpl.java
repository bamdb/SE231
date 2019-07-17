package com.se.topicservice.dao.Impl;

import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class WriteDaoImpl {

    private final
    TopicRepository topicRepository;

    @Autowired
    public WriteDaoImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }
}
