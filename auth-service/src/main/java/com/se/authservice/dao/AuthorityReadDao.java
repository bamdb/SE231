package com.se.authservice.dao;

import com.se.authservice.entity.Authority;
import com.se.authservice.entity.Role;
import com.se.authservice.entity.User;

import java.util.Optional;

public interface AuthorityReadDao {

    Optional<Authority> findByName(String revokeAuthorityName);
}
