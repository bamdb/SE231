package com.se.ratingservice.dao.Impl;

import com.se.ratingservice.config.ds.DataSource;
import com.se.ratingservice.dao.ScoreWriteDao;
import com.se.ratingservice.entity.Score;
import com.se.ratingservice.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ScoreWriteDaoImpl implements ScoreWriteDao {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreWriteDaoImpl(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }

    @Override
    @DataSource("master")
    public Score save(Score score) {
        return scoreRepository.save(score);
    }

    @Override
    @DataSource("master")
    public void delete(Score score) {
        scoreRepository.delete(score);
    }

    @Override
    @DataSource("master")
    public void deleteAllByItemId(Long itemId) {
        scoreRepository.deleteAllByItemId(itemId);
    }
}
