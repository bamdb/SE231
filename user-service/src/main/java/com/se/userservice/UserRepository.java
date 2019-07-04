package com.se.userservice;


import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    void deleteUserByUsername(String username);
    boolean existsByUsername(String username);
}