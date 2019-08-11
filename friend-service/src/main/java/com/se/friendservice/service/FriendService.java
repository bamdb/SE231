package com.se.friendservice.service;

import com.se.friendservice.entity.Friend;
import com.se.friendservice.entity.User;

import javax.transaction.Transactional;

public interface FriendService {
    Friend addFriends(Friend friend);
    void reqFriends(Long userId);
    void rmFriends(Long userId1, Long userId2);
    void rmAllFriends(Long userId);
    Boolean isFriend(Long userId1, Long userId2);
    Iterable<User> getFriends(Long userId);
}
