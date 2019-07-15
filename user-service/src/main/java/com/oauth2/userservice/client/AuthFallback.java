package com.oauth2.userservice.client;

import com.oauth2.userservice.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
public class AuthFallback implements AuthClient {
    public User postUser(User user) {
        return null;
    }
}
