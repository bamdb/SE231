package com.oauth2.userservice.client;

import com.oauth2.userservice.domain.User;
import org.springframework.stereotype.Component;

@Component
public class AuthFallback implements AuthClient {
    public User postUser(User user) {
        return null;
    }
}
