package com.se.messageservice;

import org.springframework.stereotype.Component;

@Component
public class FriendClientFallBack implements FriendClient {
    @Override
    public Boolean isFriend(Long senderId, Long receiverId) {
        return false;
    }
}
