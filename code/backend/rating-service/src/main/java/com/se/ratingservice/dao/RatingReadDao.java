package com.se.ratingservice.dao;

import com.se.ratingservice.entity.Rating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface RatingReadDao {

    Rating findByItemId(Long itemId);

    Iterable<Rating> findAll();

    Rating findById(Long ratingId);

    Integer findRankByTypeAndItemId(Integer type, float avgScore);

    Page<Rating> findAllByType(Integer type, PageRequest pageRequest);
}
