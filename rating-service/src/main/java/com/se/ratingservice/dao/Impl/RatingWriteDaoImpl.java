package com.se.ratingservice.dao.Impl;

import com.se.ratingservice.config.ds.DataSource;
import com.se.ratingservice.dao.RatingWriteDao;
import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RatingWriteDaoImpl implements RatingWriteDao {

    private final RatingRepository ratingRepository;

    @Autowired
    public RatingWriteDaoImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    @DataSource("master")
    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    @DataSource("master")
    public void deleteById(Long ratingId) {
        ratingRepository.deleteById(ratingId);
    }

    @Override
    @DataSource("master")
    public void deleteRatingByItemId(Long itemId) {
        ratingRepository.deleteRatingByItemId(itemId);
    }
}
