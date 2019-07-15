package com.oauth2.authservice.service;

import com.oauth2.authservice.domain.User;
import com.oauth2.authservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository repository;

    @Override
    public User create(User user) {
        Optional<User> existing = repository.findByUsername(user.getUsername());
        existing.ifPresent(it-> {throw new IllegalArgumentException("userDetail already exists: " + it.getUsername());});

        User userDetail = new User();
        userDetail.setPassword(user.getPassword());
        userDetail.setUsername(user.getUsername());
        return repository.save(userDetail);
    }
}
