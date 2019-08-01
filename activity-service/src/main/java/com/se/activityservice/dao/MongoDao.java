package com.se.activityservice.dao;

import com.se.activityservice.entity.Progress;

public interface MongoDao {

    Progress findByItemIdAndUserId(Long itemId, Long userId);

    Progress save(Progress progress);
}
