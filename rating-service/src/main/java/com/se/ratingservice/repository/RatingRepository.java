package com.se.ratingservice.repository;

import com.se.ratingservice.entity.Rating;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends CrudRepository<Rating, Long> {
    Optional<Rating> findByItemId(Long itemId);
    @Transactional
    void deleteRatingByItemId(Long itemId);
    Page<Rating> findAllByType(Integer type, Pageable pageable);

    @Query("select count(r.id) from Rating r where r.type = ?1 and r.avgScore > ?2")
    Integer findRankByTypeAndItemId(Integer type, float avgScore);
}
