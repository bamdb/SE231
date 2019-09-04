package com.se.topicservice.dao.Impl;

import com.se.topicservice.config.ds.DataSource;
import com.se.topicservice.dao.WriteDao;
import com.se.topicservice.entity.Topic;
import com.se.topicservice.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WriteDaoImpl implements WriteDao {

    private final
    TopicRepository topicRepository;

    @Autowired
    public WriteDaoImpl(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    @DataSource("master")
    public Topic save(Topic topic) {
        return topicRepository.save(topic);
    }

    @Override
    @DataSource("master")
    public void deleteById(Long topicId) {
        topicRepository.deleteById(topicId);
    }

}
