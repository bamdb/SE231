package com.se.commentservice.client;

import com.se.commentservice.entity.User;
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
}
