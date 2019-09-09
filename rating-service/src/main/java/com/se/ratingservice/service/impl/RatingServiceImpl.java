package com.se.ratingservice.service.impl;

import com.se.ratingservice.client.ItemClient;
import com.se.ratingservice.dao.RatingReadDao;
import com.se.ratingservice.dao.RatingWriteDao;
import com.se.ratingservice.dao.ScoreReadDao;
import com.se.ratingservice.dao.ScoreWriteDao;
import com.se.ratingservice.entity.Item;
import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.entity.RatingOut;
import com.se.ratingservice.entity.Score;
import com.se.ratingservice.repository.RatingRepository;
import com.se.ratingservice.repository.ScoreRepository;
import com.se.ratingservice.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    
    @Resource(name="ratingReadDaoImpl")
    private RatingReadDao ratingReadDao;

    @Resource(name="ratingWriteDaoImpl")
    private RatingWriteDao ratingWriteDao;

    @Resource(name="scoreReadDaoImpl")
    private ScoreReadDao scoreReadDao;

    @Resource(name="scoreWriteDaoImpl")
    private ScoreWriteDao scoreWriteDao;

    @Autowired
    ItemClient itemClient;

    public Rating postRating(Long itemId) {
        // check if corresponding item exists in Item Service or corresponding item has already been rated
        Item item = itemClient.getItemById(itemId);
        if (item == null || ratingReadDao.findByItemId(itemId) != null) {
            return null;
        }
        // auto save item type from item-service into Rating Entity
        Rating rating = new Rating();
        rating.setType(item.getType());
        rating.setRank(0);
        rating.setAvgScore(0);
        rating.setTotScoreNum(0);
        rating.setItemId(itemId);
        rating.setScore1(0);
        rating.setScore2(0);
        rating.setScore3(0);
        rating.setScore4(0);
        rating.setScore5(0);
        rating.setScore6(0);
        rating.setScore7(0);
        rating.setScore8(0);
        rating.setScore9(0);
        rating.setScore10(0);

        return ratingWriteDao.save(rating);
    }

    public Iterable<Rating> selectAll() {
        return ratingReadDao.findAll();
    }

    public Rating selectById(Long id) {
        return ratingReadDao.findById(id);
    }

    public Score selectScoreByUserId(Long userId, Long itemId) {
        return scoreReadDao.findByUserIdAndItemId(userId, itemId);
    }

    public Rating selectByItemId(Long itemId) {
        Rating rating = ratingReadDao.findByItemId(itemId);
        if (rating == null) {
            return null;
        }
        // item has been deleted in item-service, then corresponding activity should be delete
        Item item = itemClient.getItemById(itemId);
        if (item == null) {
            deleteRatingByItemId(itemId);
            return null;
        }
        // corresponding item type has been changed, the rating type should be changed too
        if (!item.getType().equals(rating.getType())) {
            rating.setType(item.getType());
        }
        List<Integer> ratingList = new ArrayList<>();
        for (int i=0; i<10; i++) {
            ratingList.add(0);
        }
        updateRating(item.getId(), ratingList);
        Integer rank = 1 + ratingReadDao.findRankByTypeAndItemId(rating.getType(), rating.getAvgScore());
        rating.setRank(rank);
        return ratingReadDao.findByItemId(itemId);
    }

    public List<RatingOut> selectPageByType(Integer type, int pageNum, int pageSize) {
        Sort sort = new Sort(Sort.Direction.DESC, "avgScore");
        PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);
        Page<Rating> ratingPage = ratingReadDao.findAllByType(type, pageRequest);
        Integer totalPage = ratingPage.getTotalPages();
        List<Rating> ratingList = ratingPage.getContent();
        List<RatingOut> ratingOuts = new ArrayList<>();
        for (Rating rating : ratingList) {
            RatingOut ratingOut = new RatingOut();
            ratingOut.setRating(rating);
            Item item = itemClient.getItemById(rating.getItemId());
            if (item == null) {
                deleteRatingByItemId(rating.getId());
            }else {
                List<Integer> ratingList1 = new ArrayList<>();
                for (int i=0; i<10; i++) {
                    ratingList1.add(0);
                }
                updateRating(item.getId(), ratingList1);
                Integer rank = 1 + ratingReadDao.findRankByTypeAndItemId(rating.getType(), rating.getAvgScore());
                rating.setRank(rank);
                ratingOut.setItem(item);
                ratingOut.setTotalPage(totalPage);
                ratingOuts.add(ratingOut);
            }
        }
        return ratingOuts;
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
        Integer rank = 1 + ratingReadDao.findRankByTypeAndItemId(rating.getType(), avgScore);
        rating.setTotScoreNum(totScoreNum);
        rating.setAvgScore(avgScore);
        rating.setRank(rank);
        rating.setScore1(ratingList.get(0) + rating.getScore1());
        rating.setScore2(ratingList.get(1) + rating.getScore2());
        rating.setScore3(ratingList.get(2) + rating.getScore3());
        rating.setScore4(ratingList.get(3) + rating.getScore4());
        rating.setScore5(ratingList.get(4) + rating.getScore5());
        rating.setScore6(ratingList.get(5) + rating.getScore6());
        rating.setScore7(ratingList.get(6) + rating.getScore7());
        rating.setScore8(ratingList.get(7) + rating.getScore8());
        rating.setScore9(ratingList.get(8) + rating.getScore9());
        rating.setScore10(ratingList.get(9) + rating.getScore10());
        ratingWriteDao.save(rating);
        return ResponseEntity.ok().body("update rating successfully");
    }

    public ResponseEntity<?> updateRatingByUserId(Long userId, int score, Long itemId) {
        Rating rating = selectByItemId(itemId);
        if (rating == null) {
            return ResponseEntity.ok().body("Item id not found");
        }
        Score scoreAct = scoreReadDao.findByUserIdAndItemId(userId, itemId);
        if (scoreAct == null) {
            scoreAct = new Score();
        }
        scoreAct.setUserId(userId);
        scoreAct.setItemId(itemId);
        scoreAct.setScore(score);
        scoreWriteDao.save(scoreAct);

        Integer totScoreNum = rating.getTotScoreNum()+1;
        float avgScore = (rating.getAvgScore() * rating.getTotScoreNum() + score) / totScoreNum;
        Integer rank = 1 + ratingReadDao.findRankByTypeAndItemId(rating.getType(), avgScore);
        rating.setTotScoreNum(totScoreNum);
        rating.setRank(rank);
        rating.setAvgScore(avgScore);
        switch (score) {
            case 1: rating.setScore1(rating.getScore1() + 1); break;
            case 2: rating.setScore2(rating.getScore2() + 1); break;
            case 3: rating.setScore3(rating.getScore3() + 1); break;
            case 4: rating.setScore4(rating.getScore4() + 1); break;
            case 5: rating.setScore5(rating.getScore5() + 1); break;
            case 6: rating.setScore6(rating.getScore6() + 1); break;
            case 7: rating.setScore7(rating.getScore7() + 1); break;
            case 8: rating.setScore8(rating.getScore8() + 1); break;
            case 9: rating.setScore9(rating.getScore9() + 1); break;
            case 10: rating.setScore10(rating.getScore10() + 1); break;
            default: return ResponseEntity.ok().body("Invalid rating!");
        }
        ratingWriteDao.save(rating);
        return ResponseEntity.ok().body("Update score successfully!");
    }

    public ResponseEntity<?> cancelRatingByUserId(Long userId, Long itemId) {
        Rating rating = selectByItemId(itemId);
        if (rating == null) {
            return ResponseEntity.ok().body("Item id not found!");
        }
        Score scoreAct = scoreReadDao.findByUserIdAndItemId(userId, itemId);
        if (scoreAct == null) {
            return ResponseEntity.ok().body("User score not found!");
        }
        scoreWriteDao.delete(scoreAct);
        return ResponseEntity.ok().body("Cancel score successfully!");
    }

    public ResponseEntity<?> deleteRatingById(Long id) {
        ratingWriteDao.deleteById(id);
        return ResponseEntity.ok().body("delete rating successfully!");
    }

    public ResponseEntity<?> deleteRatingByItemId(Long itemId) {
        ratingWriteDao.deleteRatingByItemId(itemId);
        scoreWriteDao.deleteAllByItemId(itemId);
        return ResponseEntity.ok().body("delete rating successfully!");
    }
}
