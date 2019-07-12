package com.se.friendservice;

import com.se.friendservice.client.UserClient;
import com.se.friendservice.entity.Friend;
import com.se.friendservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {
    private final
    FriendRepository friendRepository;

    @Autowired
    public FriendServiceImpl(FriendRepository friendRepository, UserClient userClient) {
        this.friendRepository = friendRepository;
        this.userClient = userClient;
    }
    private final
    UserClient userClient;
    public Friend addFriends(Friend friend) {
        return friendRepository.save(friend);
    }

    public void rmFriends(Long userId1, Long userId2) {
        friendRepository.deleteByUserId1AndUserId2(userId1, userId2);
        friendRepository.deleteByUserId1AndUserId2(userId2, userId1);
    }

    public void rmAllFriends(Long userId) {
        friendRepository.deleteAllByUserId1(userId);
        friendRepository.deleteAllByUserId2(userId);
    }

    public Boolean isFriend(Long userId1, Long userId2) {
        return friendRepository.existsByUserId1AndUserId2(userId1, userId2) ||
                    friendRepository.existsByUserId1AndUserId2(userId2, userId1);
    }

    public Iterable<User> getFriends(Long userId) {
        List<Long> ids = new ArrayList<>();
        friendRepository.findAllByUserId1(userId).forEach((friend)-> ids.add(friend.getUserId2()));
        friendRepository.findAllByUserId2(userId).forEach((friend)-> ids.add(friend.getUserId1()));
        List<User> users = new ArrayList<>();
        ids.forEach((id)->users.add(userClient.getUserById(userId)));
        return users;
    }
}
