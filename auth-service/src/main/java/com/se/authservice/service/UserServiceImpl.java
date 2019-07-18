package com.se.authservice.service;
import com.se.authservice.domain.Authority;
import com.se.authservice.domain.Role;
import com.se.authservice.domain.User;
import com.se.authservice.repository.AuthorityRepository;
import com.se.authservice.repository.RoleRepository;
import com.se.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, AuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public User create(User user) {
        Optional<User> existing = userRepository.findByUsername(user.getUsername());
        existing.ifPresent(it-> {throw new IllegalArgumentException("userDetail already exists: " + it.getUsername());});
        User userDetail = new User();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userDetail.setPassword(encoder.encode(user.getPassword()));
        userDetail.setUsername(user.getUsername());
        return userRepository.save(userDetail);
    }

    public User changeRole(String username, String roleName, Character c) {
        User user = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Role> roles = user.getRoles();
        if (c.equals('+'))
            roleRepository.findByName(roleName).ifPresent(
                    role -> {if (!roles.contains(role)) roles.add(role);});
        if (c.equals('-'))
            roleRepository.findByName(roleName).ifPresent(
                    roles::remove);
        user.setRoles(roles);
        return userRepository.save(user);
    }


    public User changeRevokeAuthority(String username, String revokeAuthorityName, Character c) {
        User user = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Authority> revokeAuthorities = user.getRevokeAuthorities();
        if (c.equals('+')) authorityRepository.findByName(revokeAuthorityName).ifPresent(
                authority -> {if (!revokeAuthorities.contains(authority)) revokeAuthorities.add(authority);});
        else if (c.equals('-')) authorityRepository.findByName(revokeAuthorityName).ifPresent(
                revokeAuthorities::remove);
        user.setRevokeAuthorities(revokeAuthorities);
        return user;
    }

    public User disableUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        user.setEnabled(false);
        return user;
    }

    public User selectByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public Iterable<User> selectAll() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User u = userRepository.findByUsername(user.getUsername()).orElse(userRepository.findById(user.getId()).orElse(null));
        if (u == null) return null;
        if (!user.getPassword().equals("")) u.setPassword(encoder.encode( user.getPassword() ));
        if (!user.getUsername().equals("")) u.setUsername(user.getUsername());
        if (!user.getImgUrl().equals("")) u.setImgUrl(user.getImgUrl());
        if (!user.getMail().equals("")) u.setMail(user.getMail());
        return userRepository.save(u);
    }

    public void deleteUserByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    @Transactional
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
    public User selectUserById(Long id) {
        return userRepository.findById(id).orElse(null);
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