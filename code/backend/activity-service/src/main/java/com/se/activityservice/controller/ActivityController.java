package com.se.activityservice.controller;

import com.se.activityservice.client.UserClient;
import com.se.activityservice.config.intercepter.FeignRequestInterceptor;
import com.se.activityservice.entity.*;
import com.se.activityservice.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class ActivityController {
    @Resource(name="activityServiceImpl")
    ActivityService activityService;

    @Autowired
    UserClient userClient;

    @PreAuthorize("#activity.getUserId() == authentication.principal.id and hasRole('USER')")
    @PostMapping(value="/add")
    public Activity postActivity(@RequestBody Activity activity,
                                 @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return activityService.postActivity(activity);
    }

    @GetMapping(value ="/all", produces ="application/json")
    public Iterable<Activity> getAllActivities() {
        return activityService.selectAll();
    }

    @GetMapping(value ="/id/{activityId}", produces ="application/json")
    public Activity getActivityById(@PathVariable("activityId") Long activityId) {
        return activityService.selectById(activityId);
    }

    @GetMapping(value="/userid/{userId}", produces="application/json")
    public List<ActivityItemOut> getActivityByUserId(@PathVariable("userId") Long userId) {
        return activityService.selectByUserId(userId);
    }

    @GetMapping(value="/itemid/{itemId}", produces="application/json")
    public Iterable<Activity> getActivityByItemId(@PathVariable("itemId") Long itemId,
                                                  @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return activityService.selectByItemId(itemId);
    }

    @GetMapping(value="/collect", produces="application/json")
    public ActivityUserOut getActivityByItemIdAndUserId(@RequestParam("userId") Long userId,
                                                        @RequestParam("itemId") Long itemId,
                                                        @RequestHeader("Authorization") String accessToken) {
        FeignRequestInterceptor.accessToken = accessToken;
        return activityService.selectByUserIdAndItemId(userId, itemId);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(value="/progress")
    public Progress getProgress(@RequestParam("userId") Long userId,
                                @RequestParam("itemId") Long itemId) {
       // FeignRequestInterceptor.accessToken = accessToken;
        return activityService.selectProgress(userId, itemId);
    }
    /*TO BE REVISED*/
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(value="/delete/id/{activityId}")
    public ResponseEntity<?> deleteActivityById(@PathVariable("activityId") Long activityId, Authentication authentication) {
        /*An alternative to deal with the tricky case involved a path variable*/
        MyPrincipal myPrincipal = (MyPrincipal)authentication.getPrincipal();
        if (myPrincipal.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) ||
            myPrincipal.getId().equals( activityService.selectById(activityId).getUserId()) )
        return activityService.deleteActivityById(activityId);
        else return ResponseEntity.badRequest().body("No Authority!");
    }

    @PreAuthorize("hasRole('EDITOR') or #userId == authentication.principal.id")
    @DeleteMapping(value="/delete/userid/{userId}")
    public ResponseEntity<?> deleteActivityByUserId(@PathVariable("userId") Long userId) {
        return activityService.deleteActivityByUserId(userId);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @DeleteMapping(value="/delete/itemid/{itemId}")
    public ResponseEntity<?> deleteActivityByItemId(@PathVariable("itemId") Long itemId) {
        return activityService.deleteActivityByItemId(itemId);
    }


    @PreAuthorize("#progress.getUserId() == authentication.principal.id")
    @PutMapping(value="/update/progress")
    public Progress updateProgress(@RequestBody Progress progress) {
        return activityService.updateProgress(progress);
    }
}