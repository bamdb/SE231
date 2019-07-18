package com.se.ratingservice.service;

import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.entity.RatingOut;
import com.se.ratingservice.entity.Score;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RatingService {
    Rating postRating(Long itemId);
    Iterable<Rating> selectAll();
    Rating selectById(Long id);
    Score selectScoreByUserId(Long userId, Long itemId);
    List<RatingOut> selectPageByType(Integer type, int pageNum, int pageSize);
    Rating selectByItemId(Long itemId);
    ResponseEntity<?> updateRating(Long itemId, List<Integer> ratingList);
    ResponseEntity<?> updateRatingByUserId(Long userId, int score, Long itemId);
    ResponseEntity<?> cancelRatingByUserId(Long userId, Long itemId);
    ResponseEntity<?> deleteRatingById(Long id);
    ResponseEntity<?> deleteRatingByItemId(Long id);
}
