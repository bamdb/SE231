package com.se.friendservice.client;

import com.se.friendservice.entity.User;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Component
public class UserClientFallBack implements UserClient {
    @Override
    public User getUserById(Long userId) {
        return null;
    }
}
