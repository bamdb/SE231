package com.se.topicservice;

import com.se.topicservice.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name = "user",
        fallback = UserClientFallback.class,
        qualifier = "userClient")
public interface UserClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    User getUserById(@PathVariable("id") Long userId);

    @RequestMapping(value="/all", method= RequestMethod.GET)
    Iterable<User> getAllUsers();

    @RequestMapping(value="/signup", method = RequestMethod.POST)
    User postUser(@RequestBody User user);
}
