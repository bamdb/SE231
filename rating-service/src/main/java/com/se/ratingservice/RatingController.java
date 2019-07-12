package com.se.ratingservice;

import com.se.ratingservice.entity.Rating;
import com.se.ratingservice.entity.RatingOut;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class RatingController {
    @Resource(name="ratingServiceImpl")
    private RatingService ratingService;

    @PostMapping(value="/add/itemid/{itemId}", produces="application/json")
    public Rating postRating(@PathVariable("itemId") Long itemId) {
        return ratingService.postRating(itemId);
    }

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<Rating> getAllRatings() {
        return ratingService.selectAll();
    }

    @GetMapping(value="/id/{ratingId}", produces="application/json")
    public Rating getRatingById(@PathVariable("ratingId") Long ratingId) {
        return ratingService.selectById(ratingId);
    }

    @GetMapping(value="/itemid/{itemId}", produces="application/json")
    public Rating getRatingByItemId(@PathVariable("itemId") Long itemId) {
        return ratingService.selectByItemId(itemId);
    }

    @GetMapping(value="/browser", produces="application/json")
    public List<RatingOut> getRatingPageByType(@RequestParam("type") Integer type, @RequestParam("page") int pageNum,
                                               @RequestParam("pageSize") int pageSize) {
        return ratingService.selectPageByType(type, pageNum, pageSize);
    }

    // input an integer array of size 10.Each integer shows the increase number of corresponding score，just for test
    @PutMapping(value="/update/itemid/{itemId}", produces="application/json")
    public ResponseEntity<?> updateRating(@PathVariable("itemId") Long itemId, @RequestBody List<Integer> ratingList) {
        return ratingService.updateRating(itemId, ratingList);
    }

    // 权限验证，通过token取出用户id
    @PutMapping(value="/update")
    public ResponseEntity<?> updateRatingByUserId(@RequestParam("userId") Long userId, @RequestParam("score") int score,
                                                  @RequestParam("itemId") Long itemId) {
        return ratingService.updateRatingByUserId(userId, score, itemId);
    }


    @DeleteMapping(value="/delete/id/{ratingId}")
    public ResponseEntity<?> deleteRatingById(@PathVariable("ratingId") Long ratingId) {
        return ratingService.deleteRatingById(ratingId);
    }

    @DeleteMapping(value="/delete/itemid/{itemId}")
    public ResponseEntity<?> deleteRatingByItemId(@PathVariable("itemId") Long itemId) {
        return ratingService.deleteRatingByItemId(itemId);
    }
}
