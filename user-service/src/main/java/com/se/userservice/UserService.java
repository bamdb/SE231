package com.se.userservice;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Iterable<User> selectAll();
    User selectById(long id);
    User postUser(User user);
    User selectByUsername(String username);
    User updateUser(User user);
    void deleteUserById(long id);
    void deleteUserByUsername(String username);
}
