package com.se.authservice.service;

import com.se.authservice.entity.User;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {
    @Autowired
    UserService userService;
    @Test(expected = IllegalArgumentException.class)
    public void testUserService() {
        userService.create(new User("john1", "0"));
        Assert.assertNotNull(userService.disableUser("john1"));
        Assert.assertNull(userService.create(new User("john1", "0")));
    }
}
