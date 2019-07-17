package com.oauth2.userservice.repository;


import com.oauth2.userservice.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    @Transactional
    void deleteUserByUsername(String username);
    boolean existsByUsername(String username);
}