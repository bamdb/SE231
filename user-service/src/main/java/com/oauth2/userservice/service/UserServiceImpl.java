package com.oauth2.userservice.service;

import com.oauth2.userservice.dao.UserRepository;
import com.oauth2.userservice.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final
    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> selectAll() {
        return userRepository.findAll();
    }

    public User selectById(Long id) {
        return userRepository.findById(id).orElse(null);
    }


    public User selectByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User updateUser(User user) {
            return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteUserByUsername(String username) {
        userRepository.deleteUserByUsername(username);
    }
}
