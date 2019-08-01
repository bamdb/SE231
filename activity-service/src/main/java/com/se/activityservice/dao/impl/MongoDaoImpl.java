package com.se.activityservice.dao.impl;

import com.se.activityservice.entity.Progress;
import com.se.activityservice.repository.ProgressRepository;
import com.se.activityservice.dao.MongoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MongoDaoImpl implements MongoDao {
    
    private final ProgressRepository progressRepository;

    @Autowired
    public MongoDaoImpl(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    @Override
    public Progress findByItemIdAndUserId(Long itemId, Long userId) {
        return progressRepository.findByItemIdAndUserId(itemId, userId).orElse(null);
    }

    @Override
    public Progress save(Progress progress) {
        return progressRepository.save(progress);
    }
}
