package com.se.friendservice;

import com.se.friendservice.service.UserInfoTokenServices;
import org.junit.Test;

public class UserInfoTokenServicesTest {
    @Test(expected = Exception.class)
    public void testUserInfoTokenServices() {
        UserInfoTokenServices userInfoTokenServices = new UserInfoTokenServices("", "");
        userInfoTokenServices.forTest();
    }
}
