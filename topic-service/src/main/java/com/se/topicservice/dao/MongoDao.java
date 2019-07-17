package com.se.topicservice.dao;

import com.se.topicservice.entity.Topic;
import com.se.topicservice.entity.TopicPage;

public interface MongoDao {

    TopicPage save(TopicPage topicPage);

    TopicPage findById(String topicId);
}
