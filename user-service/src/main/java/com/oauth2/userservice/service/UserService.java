package com.oauth2.userservice.service;

import com.oauth2.userservice.domain.User;

public interface UserService {
    Iterable<User> selectAll();
    User selectByUsername(String username);
    User updateUser(User user);
    void deleteUserByUsername(String username);
}