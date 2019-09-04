package com.se.authservice.dao;

import com.se.authservice.entity.User;

public interface UserWriteDao {
    User save(User user);

    void deleteByUsername(String username);

    void deleteById(Long id);
}
