package com.se.itemservice.dao;

import com.se.itemservice.entity.Itemtag;

public interface MongoDao {

    Itemtag findByItemId(Long itemId);

    Itemtag save(Itemtag itemtag);

    Itemtag findByItemIdAndUserId(Long itemId, Long userId);
//    Progress findByItemIdAndUserId(Long userId, Long itemId);
//
//    Progress save(Progress progress);
}
