package com.oauth2.authservice.service;

import com.oauth2.authservice.domain.Authority;
import com.oauth2.authservice.domain.Role;
import com.oauth2.authservice.domain.User;
import com.oauth2.authservice.repository.AuthorityRepository;
import com.oauth2.authservice.repository.RoleRepository;
import com.oauth2.authservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;

@Service
@Slf4j
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
        if (c.equals('+')) roleRepository.findByName(roleName).ifPresent(roles::add);
        else if (c.equals('-')) roleRepository.findByName(roleName).ifPresent(roles::remove);
        else return null;
        user.setRoles(roles);
        return userRepository.save(user);
    }


    public User changeRevokeAuthority(String username, String revokeAuthorityName, Character c) {
        User user = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        Collection<Authority> revokeAuthorities = user.getRevokeAuthorities();
        if (c.equals('+')) authorityRepository.findByName(revokeAuthorityName).ifPresent(revokeAuthorities::add);
        else if (c.equals('-')) authorityRepository.findByName(revokeAuthorityName).ifPresent(revokeAuthorities::remove);
        else return null;
        user.setRevokeAuthorities(revokeAuthorities);
        return user;
    }

    public User disableUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException(username));
        user.setEnabled(false);
        return user;
    }

    public User findUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}