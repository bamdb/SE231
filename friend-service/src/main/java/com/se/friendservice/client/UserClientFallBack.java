package com.se.friendservice.client;

import com.se.friendservice.entity.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

public class UserClientFallBack implements UserClient {
    public User getUserById(Long userId) {
        return null;
    }
}
