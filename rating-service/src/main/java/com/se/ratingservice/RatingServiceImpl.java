package com.se.ratingservice;

import com.netflix.discovery.converters.Auto;
import com.se.ratingservice.entity.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl implements RatingService {
    private final
    RatingRepository ratingRepository;

    @Autowired
    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Autowired
    ItemClient itemClient;

    public Rating postRating(Rating rating) {
        // check if corresponding item exists in Item Service
        if (rating.getItemId() == null || itemClient.getItemById(rating.getItemId()) == null) {
            return null;
        }
        return ratingRepository.save(rating);
    }

    public Iterable<Rating> selectAll() {
        return ratingRepository.findAll();
    }

    public Rating selectById(Long id) {
        return ratingRepository.findById(id).orElse(null);
    }

    public Rating selectByItemId(Long itemId) {
        return ratingRepository.findByItemId(itemId).orElse(null);
    }

    public Rating updateRating(Rating rating) {
        if (ratingRepository.existsById(rating.getId())) {
            return ratingRepository.save(rating);
        }
        else return null;
    }

    public ResponseEntity<?> deleteRatingById(Long id) {
        ratingRepository.deleteById(id);
        return ResponseEntity.ok().body("delete rating successfully!");
    }

    public ResponseEntity<?> deleteRatingByItemId(Long itemId) {
        ratingRepository.deleteRatingByItemId(itemId);
        return ResponseEntity.ok().body("delete rating successfully!");
    }
}
