package com.se.ratingservice;

import com.se.ratingservice.entity.Rating;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

public class RatingController {
    @Resource(name="RatingServiceImpl")
    private RatingService ratingService;

    @PostMapping(value="/add", produces="application/json")
    public Rating postRating(@RequestBody Rating rating) {
        return ratingService.postRating(rating);
    }

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<Rating> getAllRatings() {
        return ratingService.selectAll();
    }

    @GetMapping(value="/id/{ratingId}", produces="application/json")
    public Rating getRatingById(@PathVariable("ratingId") Long ratingId) {
        return ratingService.selectById(ratingId);
    }

    @GetMapping(value="/itemId/{itemId}", produces="application/json")
    public Rating getRatingByItemId(@PathVariable("itemId") Long itemId) {
        return ratingService.selectByItemId(itemId);
    }

    @PutMapping(value="/update", produces="application/json")
    public Rating updateRating(@RequestBody Rating rating) {
        return ratingService.updateRating(rating);
    }

    @DeleteMapping(value="/delete/id/{ratingId}")
    public ResponseEntity<?> deleteRatingById(@PathVariable("ratingId") Long ratingId) {
        return ratingService.deleteRatingById(ratingId);
    }

    @DeleteMapping(value="/delete/itemId/{itemId}")
    public ResponseEntity<?> deleteRatingByItemId(@PathVariable("itemId") Long itemId) {
        return ratingService.deleteRatingByItemId(itemId);
    }
}
