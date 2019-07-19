package com.se.messageservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Primary;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "friend"
        ,fallback = FriendClientFallBack.class
)
@Primary
public interface FriendClient {
    @RequestMapping(value = "/isfriend", method = RequestMethod.GET)
    Boolean isFriend(@RequestParam("userId1") Long senderId,
                     @RequestParam("userId2") Long receiverId);
}
