package com.se.itemservice.dao;


import com.se.itemservice.entity.Item;

public interface ItemReadDao {

    Item findById(Long itemId);

    Iterable<Item> findAll();

    boolean existsById(Long itemId);

//    Iterable<Activity> findAll();
//
//    Activity findById(Long activityId);
//
//    Iterable<Activity> findAllByUserId(Long userId);
//
//    Iterable<Activity> findAllByItemId(Long itemId);
//
//    Activity findActivityByUserIdAndItemId(Long userId, Long itemId);
}
