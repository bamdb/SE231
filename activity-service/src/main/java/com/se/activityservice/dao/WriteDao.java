package com.se.activityservice.dao;

import com.se.topicservice.entity.Topic;

public interface WriteDao {

    Topic save(Topic topic);

    void deleteById(Long topicId);
}
