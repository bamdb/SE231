package com.oauth2.authservice.repository;

import com.oauth2.authservice.domain.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository  extends CrudRepository<Role, Long> {
    Optional<Role> findByName(String role);
}
