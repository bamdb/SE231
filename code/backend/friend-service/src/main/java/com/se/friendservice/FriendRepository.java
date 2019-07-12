package com.se.friendservice;

import com.se.friendservice.entity.Friend;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface FriendRepository extends CrudRepository<Friend, Long> {
    @Transactional
    void deleteByUserId1AndUserId2(Long userId1, Long userId2);
    @Transactional
    void deleteAllByUserId1(Long userId);
    @Transactional
    void deleteAllByUserId2(Long userId);
    Boolean existsByUserId1AndUserId2(Long userId1, Long userId2);
    Iterable<Friend> findAllByUserId1(Long userId);
    Iterable<Friend> findAllByUserId2(Long userId);
}
