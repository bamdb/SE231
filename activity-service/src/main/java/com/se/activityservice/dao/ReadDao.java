package com.se.activityservice.dao;

import com.se.topicservice.entity.Topic;

public interface ReadDao {

    Iterable<Topic> findAll();

    boolean existsById(Long topicId);

    Topic findById(Long topicId);
}
