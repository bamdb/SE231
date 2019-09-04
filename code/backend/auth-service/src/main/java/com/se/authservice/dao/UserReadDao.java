package com.se.authservice.dao;

import com.se.authservice.entity.User;

import java.util.Optional;

public interface UserReadDao {

    Optional<User> findByUsername(String username);

    Iterable<User> findAll();

    Optional<User> findById(Long id);
}
