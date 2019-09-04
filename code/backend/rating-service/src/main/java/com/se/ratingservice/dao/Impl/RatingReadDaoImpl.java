package com.se.ratingservice.dao.Impl;

import com.se.ratingservice.config.ds.DataSource;
import com.se.ratingservice.dao.RatingReadDao;
import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Repository
public class RatingReadDaoImpl implements RatingReadDao {

    private final RatingRepository ratingRepository;

    @Autowired
    public RatingReadDaoImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    @DataSource("slave")
    public Rating findByItemId(Long itemId) {
        return ratingRepository.findByItemId(itemId).orElse(null);
    }

    @Override
    @DataSource("slave")
    public Iterable<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    @DataSource("slave")
    public Rating findById(Long ratingId) {
        return ratingRepository.findById(ratingId).orElse(null);
    }

    @Override
    @DataSource("slave")
    public Integer findRankByTypeAndItemId(Integer type, float avgScore) {
        return ratingRepository.findRankByTypeAndItemId(type, avgScore);
    }

    @Override
    @DataSource("slave")
    public Page<Rating> findAllByType(Integer type, PageRequest pageRequest) {
        return ratingRepository.findAllByType(type, pageRequest);
    }
}
