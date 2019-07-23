package com.se.topicservice.client;

import com.se.topicservice.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name = "auth",
        fallback = UserClientFallback.class)
public interface UserClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    User getUserById(@PathVariable("id") Long userId);

    @RequestMapping(value="/signup", method = RequestMethod.POST)
    User postUser(@RequestBody User user);
}
