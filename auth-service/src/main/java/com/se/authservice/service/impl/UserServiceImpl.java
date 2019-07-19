package com.se.authservice.service.impl;
import com.se.authservice.dao.AuthorityReadDao;
import com.se.authservice.dao.RoleReadDao;
import com.se.authservice.dao.UserReadDao;
import com.se.authservice.dao.UserWriteDao;
import com.se.authservice.entity.Authority;
import com.se.authservice.entity.Role;
import com.se.authservice.entity.User;
import com.se.authservice.service.UserService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Resource(name="authorityReadDaoImpl")
    private AuthorityReadDao authorityReadDao;

    @Resource(name="roleReadDaoImpl")
    private RoleReadDao roleReadDao;
    
    @Resource(name="userReadDaoImpl")
    private UserReadDao userReadDao;

    @Resource(name="userWriteDaoImpl")
    private UserWriteDao userWriteDao;

    @Override
    public User create(User user) {
        Optional<User> existing = userReadDao.findByUsername(user.getUsername());
        existing.ifPresent(it-> {throw new IllegalArgumentException("userDetail already exists: " + it.getUsername());});
        User userDetail = new User();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userDetail.setPassword(encoder.encode(user.getPassword()));
        userDetail.setUsername(user.getUsername());
        return userWriteDao.save(userDetail);
    }


    public User changeRole(String username, String roleName, String c) {
        User user = userReadDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Role> roles = user.getRoles();
        if (c.equals('+'))
            roleReadDao.findByName(roleName).ifPresent(
                    role -> {if (!roles.contains(role)) roles.add(role);});
        if (c.equals('-'))
            roleReadDao.findByName(roleName).ifPresent(
                    roles::remove);
        user.setRoles(roles);
        return userWriteDao.save(user);
    }



    public User changeRevokeAuthority(String username, String revokeAuthorityName, String c) {
        User user = userReadDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Authority> revokeAuthorities = user.getRevokeAuthorities();
        if (c.equals('+')) authorityReadDao.findByName(revokeAuthorityName).ifPresent(
                authority -> {if (!revokeAuthorities.contains(authority)) revokeAuthorities.add(authority);});
        else if (c.equals('-')) authorityReadDao.findByName(revokeAuthorityName).ifPresent(
                revokeAuthorities::remove);
        user.setRevokeAuthorities(revokeAuthorities);
        return user;
    }

    public User disableUser(String username) {
        User user = userReadDao.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        user.setEnabled(false);
        return user;
    }

    public User selectByUsername(String username) {
        return userReadDao.findByUsername(username).orElse(null);
    }

    public Iterable<User> selectAll() {
        return userReadDao.findAll();
    }

    public User updateUser(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User u = userReadDao.findByUsername(user.getUsername()).orElse(userReadDao.findById(user.getId()).orElse(null));
        if (u == null) return null;
        if (!user.getPassword().equals("")) u.setPassword(encoder.encode( user.getPassword() ));
        if (!user.getUsername().equals("")) u.setUsername(user.getUsername());
        if (!user.getImgUrl().equals("")) u.setImgUrl(user.getImgUrl());
        if (!user.getMail().equals("")) u.setMail(user.getMail());
        return userWriteDao.save(u);
    }

    public void deleteUserByUsername(String username) {
        userWriteDao.deleteByUsername(username);
    }

    public void deleteUserById(Long id) {
        userWriteDao.deleteById(id);
    }
    public User selectUserById(Long id) {
        return userReadDao.findById(id).orElse(null);
    }

    public User truncate(User user) {
        if (user == null) return null;
        user.setPassword(null);
        user.setEnabled(null);
        user.setRevokeAuthorities(null);
        user.setRoles(null);
        return user;
    }
}