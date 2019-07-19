package com.se.authservice.repository;

import com.se.authservice.entity.Authority;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AuthorityRepository  extends CrudRepository<Authority, Long> {
    Optional<Authority> findByName(String authority);
}
