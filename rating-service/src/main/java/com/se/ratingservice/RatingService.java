package com.se.ratingservice;

import com.se.ratingservice.entity.Rating;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RatingService {
    Rating postRating(Rating rating);
    Iterable<Rating> selectAll();
    Rating selectById(Long id);
    List<Rating> selectPageByType(Integer type, int pageNum, int pageSize);
    Rating selectByItemId(Long itemId);
    ResponseEntity<?> updateRating(Long itemId, List<Integer> ratingList);
    ResponseEntity<?> deleteRatingById(Long id);
    ResponseEntity<?> deleteRatingByItemId(Long id);
}
