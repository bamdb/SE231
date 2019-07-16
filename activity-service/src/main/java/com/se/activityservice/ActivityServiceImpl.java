package com.se.activityservice;

import com.se.activityservice.client.ItemClient;
import com.se.activityservice.client.UserClient;
import com.se.activityservice.entity.Activity;
import com.se.activityservice.entity.Progress;
import com.se.activityservice.repository.ActivityRepository;
import com.se.activityservice.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ActivityServiceImpl implements ActivityService{
    private final
    ActivityRepository activityRepository;
    private final ProgressRepository progressRepository;

    @Autowired
    public ActivityServiceImpl(ActivityRepository activityRepository, ProgressRepository progressRepository) {
        this.activityRepository = activityRepository;
        this.progressRepository = progressRepository;
    }

    @Autowired
    UserClient userClient;

    @Autowired
    ItemClient itemClient;

    public Progress selectProgress(Long userId, Long itemId) {
        return progressRepository.findByItemIdAndUserId(userId, itemId).orElse(null);
    }

    public Progress updateProgress(Progress progress) {
        Progress progress1 = progressRepository.findByItemIdAndUserId(progress.getItemId(), progress.getUserId()).orElse(null);
        if (progress1 != null) {
            progress.setId(progress1.getId());
        }
        return progressRepository.save(progress);
    }

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

    public Activity selectByUserIdAndItemId(Long userId, Long itemId) {
        return activityRepository.findActivityByUserIdAndItemId(userId, itemId).orElse(null);
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