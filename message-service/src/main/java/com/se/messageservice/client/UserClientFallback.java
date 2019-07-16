package com.se.messageservice.client;

import com.se.messageservice.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserClientFallback implements UserClient{
    private List<Long> deletedList = new ArrayList<>();

    @Override
    public User getUserById(Long userId) {
        if (userId == 0 || deletedList.contains(userId)) {
            return null;
        }
        User user = new User();
        user.setId(userId);
        user.setMail("mail@mail.com");
        user.setRole(0);
        user.setUsername("mock");
        user.setImgUrl(null);
        return user;
    }

    @Override
    public void deleteUserById(Long id) {
        deletedList.add(id);
    }
}
