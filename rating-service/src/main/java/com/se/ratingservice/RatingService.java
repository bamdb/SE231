package com.se.ratingservice;

import com.se.ratingservice.entity.Rating;
import org.springframework.http.ResponseEntity;

public interface RatingService {
    Rating postRating(Rating rating);
    Iterable<Rating> selectAll();
    Rating selectById(Long id);
    Rating selectByItemId(Long itemId);
    Rating updateRating(Rating rating);
    ResponseEntity<?> deleteRatingById(Long id);
    ResponseEntity<?> deleteRatingByItemId(Long id);
}
