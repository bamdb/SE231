package com.se.ratingservice;

import com.se.ratingservice.service.UserInfoTokenServices;
import org.junit.Test;

public class UserInfoTokenServicesTest {
    @Test(expected = Exception.class)
    public void testUserInfoTokenServices() {
        UserInfoTokenServices userInfoTokenServices = new UserInfoTokenServices("", "");
        userInfoTokenServices.forTest();
    }
}
