package com.se.activityservice.dao;

import com.se.activityservice.entity.Activity;

public interface WriteDao {

    Activity save(Activity activity);

    void deleteById(Long activityId);

    void deleteAllByUserId(Long userId);

    void deleteAllByItemId(Long itemId);
}
