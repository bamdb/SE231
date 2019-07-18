package com.se.friendservice.dao.Impl;

import com.se.friendservice.config.ds.DataSource;
import com.se.friendservice.dao.WriteDao;
import com.se.friendservice.entity.Friend;
import com.se.friendservice.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WriteDaoImpl implements WriteDao {

    private final FriendRepository friendRepository;

    @Autowired
    public WriteDaoImpl(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    @Override
    @DataSource("master")
    public void deleteByUserId1AndUserId2(Long userId1, Long userId2) {
        friendRepository.deleteByUserId1AndUserId2(userId1, userId2);
    }

    @Override
    @DataSource("master")
    public void deleteAllByUserId1(Long userId) {
        friendRepository.deleteAllByUserId1(userId);
    }

    @Override
    @DataSource("master")
    public Friend save(Friend friend) {
        return friendRepository.save(friend);
    }

    @Override
    @DataSource("master")
    public void deleteAllByUserId2(Long userId) {
        friendRepository.deleteAllByUserId2(userId);
    }

}
