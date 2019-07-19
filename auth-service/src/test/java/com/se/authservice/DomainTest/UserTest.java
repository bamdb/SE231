package com.se.authservice.DomainTest;

import com.se.authservice.domain.Role;
import com.se.authservice.domain.User;
import com.se.authservice.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collections;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserTest {
    @Autowired
    UserService userService;
    @Test
    public void testUser() {
        User u = new User("1", "2", "3", "4");
        u.setRoles(Collections.singletonList(new Role(3L, "ROLE_USER")));
        Assert.assertNotNull(u.getAuthorities());
    }
}
