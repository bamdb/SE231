package com.se.activityservice.client;

import com.se.activityservice.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@FeignClient(name = "auth",
        fallback = UserClientFallback.class)
@Primary
public interface UserClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    User getUserById(@PathVariable("id") Long userId);

    @RequestMapping(value="/delete/id/{id}")
    void deleteUserById(@PathVariable("id") Long id);
}
