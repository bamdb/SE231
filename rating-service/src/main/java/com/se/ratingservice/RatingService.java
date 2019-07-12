package com.se.ratingservice;

import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.entity.RatingOut;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RatingService {
    Rating postRating(Long itemId);
    Iterable<Rating> selectAll();
    Rating selectById(Long id);
    List<RatingOut> selectPageByType(Integer type, int pageNum, int pageSize);
    Rating selectByItemId(Long itemId);
    ResponseEntity<?> updateRating(Long itemId, List<Integer> ratingList);
    ResponseEntity<?> updateRatingByUserId(Long userId, int score, Long itemId);
    ResponseEntity<?> deleteRatingById(Long id);
    ResponseEntity<?> deleteRatingByItemId(Long id);
}
