package com.se.authservice.dao.impl;

import com.se.authservice.config.ds.DataSource;
import com.se.authservice.dao.UserWriteDao;
import com.se.authservice.entity.User;
import com.se.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserWriteDaoImpl implements UserWriteDao {

    private final UserRepository userRepository;

    @Autowired
    public UserWriteDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @DataSource("master")
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    @DataSource("master")
    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    @Transactional
    @DataSource("master")
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
