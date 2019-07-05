package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import org.springframework.http.ResponseEntity;

public interface ActivityService {
    Activity postActivity(Activity Activity);
    Iterable<Activity> selectAll();
    Activity selectByUserId(Long id);
    Activity selectByItemId(Long id);
    ResponseEntity<?> deleteActivityById(Long id);
}
