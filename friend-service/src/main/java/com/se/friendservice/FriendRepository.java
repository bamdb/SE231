package com.se.friendservice;

import com.se.friendservice.entity.Friend;
import org.springframework.data.repository.CrudRepository;

public interface FriendRepository extends CrudRepository<Friend, Long> {
    void deleteByUserId1AndUserId2(Long userId1, Long userId2);
    void deleteAllByUserId1(Long userId);
    void deleteAllByUserId2(Long userId);
    Boolean existsByUserId1AndUserId2(Long userId1, Long userId2);
    Iterable<Friend> findAllByUserId1(Long userId);
    Iterable<Friend> findAllByUserId2(Long userId);
}
