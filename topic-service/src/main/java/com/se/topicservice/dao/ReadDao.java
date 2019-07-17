package com.se.topicservice.dao;

import com.se.topicservice.entity.Topic;
import com.se.topicservice.repository.TopicMongoRepository;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface ReadDao {

    Iterable<Topic> findAll();

    boolean existsById(Long topicId);

    Topic findById(Long topicId);
}
