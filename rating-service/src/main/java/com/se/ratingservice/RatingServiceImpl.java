package com.se.ratingservice;

import com.netflix.discovery.converters.Auto;
import com.se.ratingservice.entity.Item;
import com.se.ratingservice.entity.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

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
        // check if corresponding item exists in Item Service or corresponding item has already been rated
        Item item = itemClient.getItemById(rating.getItemId());
        if (rating.getItemId() == null || item == null
                || ratingRepository.findByItemId(rating.getItemId()).orElse(null) != null) {
            return null;
        }
        // auto save item type from item-service into Rating Entity
        rating.setType(item.getType());

        return ratingRepository.save(rating);
    }

    public Iterable<Rating> selectAll() {
        return ratingRepository.findAll();
    }

    public Rating selectById(Long id) {
        return ratingRepository.findById(id).orElse(null);
    }

    public Rating selectByItemId(Long itemId) {
        Rating rating = ratingRepository.findByItemId(itemId).orElse(null);
        if (rating == null) {
            return null;
        }
        // item has been deleted in item-service, then corresponding activity should be delete
        if (itemClient.getItemById(itemId) == null) {
            deleteRatingByItemId(itemId);
            return null;
        }
        return ratingRepository.findByItemId(itemId).orElse(null);
    }

    public List<Rating> selectPageByType(Integer type, int pageNum, int pageSize) {
        Sort sort = new Sort(Sort.Direction.DESC, "avgScore");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
        Page<Rating> ratingPage = ratingRepository.findAllByType(type, pageRequest);
        return ratingPage.getContent();
    }

    public ResponseEntity<?> updateRating(Long itemId, List<Integer> ratingList) {
        if (ratingList.size() != 10) {
            return ResponseEntity.ok().body("Array length should be 10!");
        }
        Rating rating = selectByItemId(itemId);
        if (rating == null) {
            return ResponseEntity.ok().body("Item id not found!");
        }
        Integer totNum = 0;
        Integer totScore = 0;
        Integer score = 1;

        for (Integer num : ratingList) {
            totNum += num;
            totScore += score * num;
            score++;
        }
        Integer totScoreNum = rating.getTotScoreNum() + totNum;
        float avgScore = (rating.getAvgScore() * rating.getTotScoreNum() + totScore) / totScoreNum;
        Integer rank = ratingRepository.findRankByTypeAndItemId(rating.getType(), avgScore);
        rating.setTotScoreNum(totScoreNum);
        rating.setAvgScore(avgScore);
        rating.setRank(rank);
        ratingRepository.save(rating);
        return ResponseEntity.ok().body("update rating successfully");
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
