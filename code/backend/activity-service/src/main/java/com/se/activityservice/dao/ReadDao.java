package com.se.activityservice.dao;

import com.se.activityservice.entity.Activity;
import org.springframework.stereotype.Component;

public interface ReadDao {

    Iterable<Activity> findAll();

    Activity findById(Long activityId);

    Iterable<Activity> findAllByUserId(Long userId);

    Iterable<Activity> findAllByItemId(Long itemId);

    Activity findActivityByUserIdAndItemId(Long userId, Long itemId);
}
