package com.se.authservice.service;

import com.se.authservice.entity.User;
import com.se.authservice.service.impl.CustomUserDetailsService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.fail;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CustomUserDetailsServiceTest {
    @Autowired
    private CustomUserDetailsService customUserDetailsService = new CustomUserDetailsService();
    @Autowired
    UserService userService;
    @Test(expected = UsernameNotFoundException.class)
    public void testCustomUserDetailsService() {
        User user = new User("john2", "0");
        user.setMail("574402791@qq.com");
        int hashCode = 0;
        try {
            hashCode = userService.verification(user);
        }catch (Exception e) {
            fail();
        }
        userService.create(hashCode);
        Assert.assertNotNull( customUserDetailsService.loadUserByUsername("john2"));
        customUserDetailsService.loadUserByUsername("nhoj");
    }
}
