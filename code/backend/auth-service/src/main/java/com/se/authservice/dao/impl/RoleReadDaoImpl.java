package com.se.authservice.dao.impl;

import com.se.authservice.config.ds.DataSource;
import com.se.authservice.dao.RoleReadDao;
import com.se.authservice.entity.Role;
import com.se.authservice.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class RoleReadDaoImpl implements RoleReadDao {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleReadDaoImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @DataSource("slave")
    public Optional<Role> findByName(String roleName) {
        return roleRepository.findByName(roleName);
    }
}
