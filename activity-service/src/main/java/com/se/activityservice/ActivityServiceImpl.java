package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService{
    private final
    ActivityRepository activityRepository;

    @Autowired
    public ActivityServiceImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public Activity postActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Iterable<Activity> selectAll() {
        return activityRepository.findAll();
    }

    public Activity selectByUserId(Long id) {
        return activityRepository.findByUserId(id).orElse(null);
    }

    public Activity selectByItemId(Long id) {
        return activityRepository.findByItemId(id).orElse(null);
    }

    public ResponseEntity<?> deleteActivityById(Long id) {
        activityRepository.deleteById(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }
}
