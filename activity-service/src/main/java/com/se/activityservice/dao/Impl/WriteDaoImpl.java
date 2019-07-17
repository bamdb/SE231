package com.se.activityservice.dao.Impl;

import com.se.activityservice.dao.WriteDao;
import com.se.activityservice.entity.Activity;
import com.se.activityservice.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WriteDaoImpl implements WriteDao {

    private final ActivityRepository activityRepository;

    @Autowired
    public WriteDaoImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }


    @Override
    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    @Override
    public void deleteById(Long activityId) {
        activityRepository.deleteById(activityId);
    }

    @Override
    public void deleteAllByUserId(Long userId) {
        activityRepository.deleteAllByUserId(userId);
    }

    @Override
    public void deleteAllByItemId(Long itemId) {
        activityRepository.deleteAllByItemId(itemId);
    }
}
