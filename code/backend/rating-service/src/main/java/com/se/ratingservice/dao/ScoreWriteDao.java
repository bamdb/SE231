package com.se.ratingservice.dao;

import com.se.ratingservice.entity.Score;

public interface ScoreWriteDao {

    Score save(Score score);

    void delete(Score score);

    void deleteAllByItemId(Long itemId);
}
