package com.se.ratingservice;

import com.se.ratingservice.entity.Rating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RatingRepository extends CrudRepository<Rating, Long> {
    Optional<Rating> findByItemId(Long itemId);
    @Transactional
    void deleteRatingByItemId(Long itemId);
}
