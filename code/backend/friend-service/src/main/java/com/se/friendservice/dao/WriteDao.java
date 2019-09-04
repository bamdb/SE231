package com.se.friendservice.dao;

import com.se.friendservice.entity.Friend;

public interface WriteDao {

    void deleteByUserId1AndUserId2(Long userId1, Long userId2);

    void deleteAllByUserId1(Long userId);

    void deleteAllByUserId2(Long userId);

    Friend save(Friend friend);

}
