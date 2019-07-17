package com.se.activityservice.dao;

import com.se.activityservice.entity.Progress;

public interface MongoDao {

    Progress findByItemIdAndUserId(Long userId, Long itemId);

    Progress save(Progress progress);
}
