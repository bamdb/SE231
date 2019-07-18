package com.oauth2.userservice.service;

import com.oauth2.userservice.domain.User;

import javax.transaction.Transactional;

public interface UserService {
    Iterable<User> selectAll();
    User selectByUsername(String username);
    User updateUser(User user);
    @Transactional
    void deleteUserByUsername(String username);
}