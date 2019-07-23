package com.se.imageservice;


import com.se.imageservice.service.UserInfoTokenServices;
import org.junit.Test;

public class UserInfoTokenServicesTest {
    @Test(expected = Exception.class)
    public void testUserInfoTokenServices() {
        UserInfoTokenServices userInfoTokenServices = new UserInfoTokenServices("", "");
        userInfoTokenServices.forTest();
    }
}
