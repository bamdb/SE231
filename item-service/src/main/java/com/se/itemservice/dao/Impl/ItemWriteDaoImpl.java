package com.se.itemservice.dao.Impl;

import com.se.activityservice.config.ds.DataSource;
import com.se.activityservice.dao.WriteDao;
import com.se.activityservice.entity.Activity;
import com.se.activityservice.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ItemWriteDaoImpl implements WriteDao {

    private final ActivityRepository activityRepository;

    @Autowired
    public ItemWriteDaoImpl(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }


    @Override
    @DataSource("master")
    public Activity save(Activity activity) {
        return activityRepository.save(activity);
    }

    @Override
    @DataSource("master")
    public void deleteById(Long activityId) {
        activityRepository.deleteById(activityId);
    }

    @Override
    @DataSource("master")
    public void deleteAllByUserId(Long userId) {
        activityRepository.deleteAllByUserId(userId);
    }

    @Override
    @DataSource("master")
    public void deleteAllByItemId(Long itemId) {
        activityRepository.deleteAllByItemId(itemId);
    }
}
