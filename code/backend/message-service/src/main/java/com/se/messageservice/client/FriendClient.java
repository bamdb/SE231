package com.se.messageservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Primary;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(value = "friend"
        ,fallback = FriendClientFallBack.class
)
@Primary
public interface FriendClient {
    @RequestMapping(value = "/isfriend", method = RequestMethod.GET)
    Boolean isFriend(@RequestParam("userId1") Long userId1,
                     @RequestParam("userId2") Long userId2);
}
