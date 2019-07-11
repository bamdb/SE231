package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
public class ActivityController {
    @Resource(name="activityServiceImpl")
    private ActivityService activityService;

    @PostMapping(value="/add")
    public Activity postActivity(@RequestBody Activity activity) {
        return activityService.postActivity(activity);
    }

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<Activity> getAllActivitys() {
        return activityService.selectAll();
    }

    @GetMapping(value ="/id/{activityId}", produces ="application/json")
    public Activity getAllActivitys(@PathVariable("activityId") Long activityId) {
        return activityService.selectById(activityId);
    }

    @GetMapping(value="/userid/{userId}", produces="application/json")
    public Iterable<Activity> getActivityByUserId(@PathVariable("userId") Long userId) {
        return activityService.selectByUserId(userId);
    }

    @GetMapping(value="/itemid/{itemId}", produces="application/json")
    public Iterable<Activity> getActivityByItemId(@PathVariable("itemId") Long itemId) {
        return activityService.selectByItemId(itemId);
    }

    @DeleteMapping(value="/delete/id/{activityId}")
    public ResponseEntity<?> deleteActivityById(@PathVariable("activityId") Long activityId) {
        return activityService.deleteActivityById(activityId);
    }

    @DeleteMapping(value="/delete/userid/{userId}")
    public ResponseEntity<?> deleteActivityByUserId(@PathVariable("userId") Long userId) {
        return activityService.deleteActivityByUserId(userId);
    }

    @DeleteMapping(value="/delete/itemid/{itemId}")
    public ResponseEntity<?> deleteActivityByItemId(@PathVariable("itemId") Long itemId) {
        return activityService.deleteActivityByItemId(itemId);
    }
}
