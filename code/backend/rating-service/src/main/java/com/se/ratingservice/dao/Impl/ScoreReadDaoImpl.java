package com.se.ratingservice.dao.Impl;

import com.se.ratingservice.config.ds.DataSource;
import com.se.ratingservice.dao.ScoreReadDao;
import com.se.ratingservice.entity.Score;
import com.se.ratingservice.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScoreReadDaoImpl implements ScoreReadDao {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreReadDaoImpl(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    @Override
    @DataSource("slave")
    public Score findByUserIdAndItemId(Long userId, Long itemId) {
        return scoreRepository.findByUserIdAndItemId(userId, itemId).orElse(null);
    }
}
