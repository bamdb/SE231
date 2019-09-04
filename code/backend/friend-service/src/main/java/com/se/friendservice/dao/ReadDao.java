package com.se.friendservice.dao;

import com.se.friendservice.entity.Friend;

public interface ReadDao {

    boolean existsByUserId1AndUserId2(Long userId1, Long userId2);

    Iterable<Friend> findAllByUserId1(Long userId);

    Iterable<Friend> findAllByUserId2(Long userId);

}
