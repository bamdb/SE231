package com.se.topicservice;

import com.se.topicservice.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@FeignClient(name = "user-service")
public interface UserClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    User getUserById(@PathVariable("id") Long userId);

    @RequestMapping(value="/all", method= RequestMethod.GET)
    Iterable<User> getAllUsers();
}
