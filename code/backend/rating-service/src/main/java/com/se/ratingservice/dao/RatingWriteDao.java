package com.se.ratingservice.dao;

import com.se.ratingservice.entity.Rating;

public interface RatingWriteDao {

    Rating save(Rating rating);

    void deleteById(Long ratingId);

    void deleteRatingByItemId(Long itemId);
}
