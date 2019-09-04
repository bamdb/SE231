package com.se.authservice.dao;

import com.se.authservice.entity.Role;

import java.util.Optional;

public interface RoleReadDao {

    Optional<Role> findByName(String roleName);
}
