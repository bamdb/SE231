package com.se.topicservice;

import com.se.topicservice.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class UserClientFallback implements UserClient{
    private List<User> userList = new ArrayList<>();

    @Override
    public User getUserById(Long userId) {
        if (userId == 0) {
            return null;
        }
        for (User user: userList) {
            if (user.getId().equals(userId)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User postUser(User user) {
        for (User userIter : userList) {
            if(user.getId().equals(userIter.getId())) {
                return user;
            }
        }
        userList.add(user);
        return null;
    }
}
