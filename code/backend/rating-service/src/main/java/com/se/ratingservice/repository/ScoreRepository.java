package com.se.ratingservice.repository;

import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.entity.Score;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ScoreRepository extends CrudRepository<Score, Long> {
    Optional<Score> findByUserIdAndItemId(Long userId, Long itemId);
    @Transactional
    void deleteAllByItemId(Long itemId);
    @Transactional
    void deleteAllByUserId(Long userId);
}
