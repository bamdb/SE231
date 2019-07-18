package com.se.authservice.repository;


import com.se.authservice.domain.User;
import org.springframework.data.repository.CrudRepository;
import javax.transaction.Transactional;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
    @Transactional
    Optional<User> deleteByUsername(String username);
}