package com.se.activityservice.dao;

import com.se.topicservice.entity.TopicPage;

public interface MongoDao {

    TopicPage save(TopicPage topicPage);

    TopicPage findById(String topicId);

    void deleteById(String topicId);
}
