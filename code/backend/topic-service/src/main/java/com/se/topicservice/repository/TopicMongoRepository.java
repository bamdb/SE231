package com.se.topicservice.repository;

import com.se.topicservice.entity.TopicPage;
import org.springframework.data.repository.CrudRepository;

public interface TopicMongoRepository extends CrudRepository<TopicPage, String> {
}
