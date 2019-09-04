package com.se.ratingservice.dao;

import com.se.ratingservice.entity.Score;

public interface ScoreReadDao {

    Score findByUserIdAndItemId(Long userId, Long itemId);

}
