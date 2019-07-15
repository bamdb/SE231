package com.oauth2.userservice.client;

import com.oauth2.userservice.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Primary
@FeignClient(value = "auth", fallback = AuthFallback.class)
public interface AuthClient {

    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    User postUser(User user);

}