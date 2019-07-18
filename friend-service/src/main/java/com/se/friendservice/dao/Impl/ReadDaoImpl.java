package com.se.friendservice.dao.Impl;

import com.se.friendservice.client.UserClient;
import com.se.friendservice.config.ds.DataSource;
import com.se.friendservice.dao.ReadDao;
import com.se.friendservice.entity.Friend;
import com.se.friendservice.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ReadDaoImpl implements ReadDao {

    private final
    FriendRepository friendRepository;

    @Autowired
    public ReadDaoImpl(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    @Override
    @DataSource("slave")
    public boolean existsByUserId1AndUserId2(Long userId1, Long userId2) {
        return friendRepository.existsByUserId1AndUserId2(userId1, userId2);
    }

    @Override
    @DataSource("slave")
    public Iterable<Friend> findAllByUserId1(Long userId) {
        return friendRepository.findAllByUserId1(userId);
    }

    @Override
    @DataSource("slave")
    public Iterable<Friend> findAllByUserId2(Long userId) {
        return friendRepository.findAllByUserId2(userId);
    }
}
