package com.se.itemservice.dao;


import com.se.itemservice.entity.Item;

public interface ItemWriteDao {
    Item save(Item item);

    void deleteById(Long itemId);
//
//    void deleteById(Long activityId);
//
//    void deleteAllByUserId(Long userId);
//
//    void deleteAllByItemId(Long itemId);
}
