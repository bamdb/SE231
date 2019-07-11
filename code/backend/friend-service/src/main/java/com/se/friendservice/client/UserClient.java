package com.se.friendservice.client;

import com.se.friendservice.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Primary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "user"
        , fallback = UserClientFallBack.class
)
@Primary
public interface UserClient {

    @RequestMapping(value="/id/{id}", produces="application/json")
    User getUserById(@PathVariable("id") Long userId);

}
