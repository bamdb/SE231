package com.se.authservice.ServiceTest;

import com.se.authservice.domain.User;
import com.se.authservice.service.impl.CustomUserDetailsService;
import com.se.authservice.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CustomUserDetailsServiceTest {
    @Autowired
    private CustomUserDetailsService customUserDetailsService = new CustomUserDetailsService();
    @Autowired
    UserService userService;
    @Test(expected = UsernameNotFoundException.class)
    public void testCustomUserDetailsService() {
        userService.create(new User("john2", "0"));
        Assert.assertNotNull( customUserDetailsService.loadUserByUsername("john2"));
        customUserDetailsService.loadUserByUsername("nhoj");
    }
}
