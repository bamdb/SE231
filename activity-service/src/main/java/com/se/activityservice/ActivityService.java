package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import org.springframework.http.ResponseEntity;

public interface ActivityService {
    Activity postActivity(Activity Activity);
    Iterable<Activity> selectAll();
    Activity selectById(Long id);
    Iterable<Activity> selectByUserId(Long id);
    Iterable<Activity> selectByItemId(Long id);
    ResponseEntity<?> deleteActivityById(Long id);
    ResponseEntity<?> deleteActivityByUserId(Long id);
    ResponseEntity<?> deleteActivityByItemId(Long id);
}
