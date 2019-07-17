package com.oauth2.authservice.repository;

import com.oauth2.authservice.domain.Authority;
import com.oauth2.authservice.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AuthorityRepository  extends CrudRepository<Authority, Long> {
    Optional<Authority> findByName(String authority);
}
