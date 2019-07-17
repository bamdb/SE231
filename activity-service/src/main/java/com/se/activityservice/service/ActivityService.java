package com.se.activityservice.service;

import com.se.activityservice.entity.Activity;
import com.se.activityservice.entity.ActivityItemOut;
import com.se.activityservice.entity.ActivityUserOut;
import com.se.activityservice.entity.Progress;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ActivityService {
    Activity postActivity(Activity Activity);

    Iterable<Activity> selectAll();

    Activity selectById(Long id);

    List<ActivityItemOut> selectByUserId(Long id);

    Iterable<Activity> selectByItemId(Long id);

    ActivityUserOut selectByUserIdAndItemId(Long userId, Long itemId);

    Progress selectProgress(Long userId, Long itemId);

    ResponseEntity<?> deleteActivityById(Long id);

    ResponseEntity<?> deleteActivityByUserId(Long id);

    ResponseEntity<?> deleteActivityByItemId(Long id);

    Progress updateProgress(Progress progress);
}
