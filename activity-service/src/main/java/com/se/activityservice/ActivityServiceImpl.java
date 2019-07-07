package com.se.activityservice;

import com.se.activityservice.client.ItemClient;
import com.se.activityservice.client.UserClient;
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

    @Autowired
    UserClient userClient;

    @Autowired
    ItemClient itemClient;

    public Activity postActivity(Activity activity) {
        // check if user exists in User table
        if (activity.getUserId() == null || userClient.getUserById(activity.getUserId()) == null) {
            return null;
        }
        // check if  item exists in Item table
        if (activity.getItemId() == null || itemClient.getItemById(activity.getItemId()) == null) {
            return null;
        }
        return activityRepository.save(activity);
    }

    public Iterable<Activity> selectAll() {
        return activityRepository.findAll();
    }

    public Activity selectById(Long id) {
        return activityRepository.findById(id).orElse(null);
    }

    public Iterable<Activity> selectByUserId(Long id) {
        Iterable<Activity> activityIterable = activityRepository.findAllByUserId(id);
        if (!activityIterable.iterator().hasNext()) {
            return null;
        }
        // user has been deleted in user-service, then corresponding activity should be delete
        if (userClient.getUserById(id) == null) {
            deleteActivityByUserId(id);
            return null;
        }
        return activityIterable;
    }

    public Iterable<Activity> selectByItemId(Long id) {
        Iterable<Activity> activityIterable = activityRepository.findAllByItemId(id);
        if (!activityIterable.iterator().hasNext()) {
            return null;
        }
        // item has been deleted in item-service, then corresponding activity should be delete
        if (itemClient.getItemById(id) == null) {
            deleteActivityByItemId(id);
            return null;
        }
        return activityRepository.findAllByItemId(id);
    }

    public ResponseEntity<?> deleteActivityById(Long id) {
        activityRepository.deleteById(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }

    public ResponseEntity<?> deleteActivityByUserId(Long id) {
        activityRepository.deleteAllByUserId(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }

    public ResponseEntity<?> deleteActivityByItemId(Long id) {
        activityRepository.deleteAllByItemId(id);
        return ResponseEntity.ok().body("delete Activity successfully!");
    }
}
