package com.se.friendservice.entity;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.AssertTrue;

public class UserTest {
    @Test
    public void testUser() {
        User user = new User(1L, "1", "3", "4", 0);
        Assert.assertEquals((Long)1L, user.getId());
        Assert.assertEquals("3", user.getMail());
        Assert.assertEquals("4", user.getImgUrl());
        Assert.assertEquals((Integer)0, user.getRole());
        Assert.assertEquals("1", user.getUsername());
    }
}
