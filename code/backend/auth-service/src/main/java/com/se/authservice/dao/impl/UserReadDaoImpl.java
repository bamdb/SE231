package com.se.authservice.dao.impl;

import com.se.authservice.config.ds.DataSource;
import com.se.authservice.dao.UserReadDao;
import com.se.authservice.entity.User;
import com.se.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserReadDaoImpl implements UserReadDao {

    private final UserRepository userRepository;

    @Autowired
    public UserReadDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @DataSource("slave")
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @DataSource("slave")
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    @DataSource("slave")
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
