package com.se.itemservice.dao;

import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.entity.graph.Root;

public interface MongoDao {

    Itemtag findItemtagByItemId(Long itemId);

    Itemtag save(Itemtag itemtag);

    Itemtag findByItemIdAndUserId(Long itemId, Long userId);

    Root findRootByItemId(Long itemId);

    Root save(Root root);
//    Progress findByItemIdAndUserId(Long userId, Long itemId);
//
//    Progress save(Progress progress);
}
