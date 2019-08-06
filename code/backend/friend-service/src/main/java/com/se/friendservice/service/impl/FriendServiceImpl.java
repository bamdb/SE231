package com.se.friendservice.service.impl;

import com.se.friendservice.dao.ReadDao;
import com.se.friendservice.dao.WriteDao;
import com.se.friendservice.repository.FriendRepository;
import com.se.friendservice.client.UserClient;
import com.se.friendservice.entity.Friend;
import com.se.friendservice.entity.User;
import com.se.friendservice.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class FriendServiceImpl implements FriendService {

    @Resource(name="readDaoImpl")
    private ReadDao readDao;

    @Resource(name="writeDaoImpl")
    private WriteDao writeDao;

    @Autowired
    UserClient userClient;

    public Friend addFriends(Friend friend) {
        return writeDao.save(friend);
    }

    public void rmFriends(Long userId1, Long userId2) {
        writeDao.deleteByUserId1AndUserId2(userId1, userId2);
        writeDao.deleteByUserId1AndUserId2(userId2, userId1);
    }

    public void rmAllFriends(Long userId) {
        writeDao.deleteAllByUserId1(userId);
        writeDao.deleteAllByUserId2(userId);
    }

    public Boolean isFriend(Long userId1, Long userId2) {
        return readDao.existsByUserId1AndUserId2(userId1, userId2) ||
                    readDao.existsByUserId1AndUserId2(userId2, userId1);
    }

    public Iterable<User> getFriends(Long userId) {
        List<Long> ids = new ArrayList<>();
        readDao.findAllByUserId1(userId).forEach((friend)-> ids.add(friend.getUserId2()));
        readDao.findAllByUserId2(userId).forEach((friend)-> ids.add(friend.getUserId1()));
        List<User> users = new ArrayList<>();
        ids.forEach((id)->users.add(userClient.getUserById(id)));
        return users;
    }
}
