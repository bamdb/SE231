package com.se.messageservice.client;

import com.se.messageservice.client.FriendClient;
import org.springframework.stereotype.Component;

@Component
public class FriendClientFallBack implements FriendClient {
    @Override
    public Boolean isFriend(Long senderId, Long receiverId) {
        return true;
    }
}
