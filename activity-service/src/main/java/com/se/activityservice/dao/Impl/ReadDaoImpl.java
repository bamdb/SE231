package com.se.activityservice.dao.Impl;

import com.se.topicservice.config.ds.DataSource;
import com.se.topicservice.dao.ReadDao;
import com.se.topicservice.entity.Topic;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReadDaoImpl implements ReadDao {

    private final
    TopicRepository topicRepository;

    @Autowired
    public ReadDaoImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    @DataSource("slave")
    public Iterable<Topic> findAll() {
        return topicRepository.findAll();
    }

    @Override
    @DataSource("slave")
    public boolean existsById(Long topicId) {
        return topicRepository.existsById(topicId);
    }

    @Override
    @DataSource("slave")
    public Topic findById(Long topicId) {
        return topicRepository.findById(topicId).orElse(null);
    }
}
