package com.se.authservice.dao.impl;

import com.se.authservice.config.ds.DataSource;
import com.se.authservice.dao.AuthorityReadDao;
import com.se.authservice.entity.Authority;
import com.se.authservice.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class AuthorityReadDaoImpl implements AuthorityReadDao {

    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityReadDaoImpl(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Override
    @DataSource("slave")
    public Optional<Authority> findByName(String revokeAuthorityName) {
        return authorityRepository.findByName(revokeAuthorityName);
    }
}
