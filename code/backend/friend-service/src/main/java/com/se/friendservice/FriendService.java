package com.se.friendservice;

import com.se.friendservice.entity.Friend;
import com.se.friendservice.entity.User;

import javax.transaction.Transactional;

public interface FriendService {
//    Friend addFriends(Long userId1, Long userId2);
    Friend addFriends(Friend friend);
    void rmFriends(Long userId1, Long userId2);
    void rmAllFriends(Long userId);
    Boolean isFriend(Long userId1, Long userId2);
    Iterable<User> getFriends(Long userId);
}