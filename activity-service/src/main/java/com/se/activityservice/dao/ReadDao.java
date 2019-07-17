package com.se.activityservice.dao;

import com.se.activityservice.entity.Activity;

public interface ReadDao {

    Iterable<Activity> findAll();
//
//    boolean existsById(Long topicId);
//
    Activity findById(Long activityId);

    Iterable<Activity> findAllByUserId(Long userId);

    Iterable<Activity> findAllByItemId(Long itemId);

    Activity findActivityByUserIdAndItemId(Long userId, Long itemId);
}
