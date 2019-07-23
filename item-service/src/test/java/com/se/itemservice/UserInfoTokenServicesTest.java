package com.se.itemservice;


import com.se.itemservice.service.UserInfoTokenServices;
import org.junit.Test;

public class UserInfoTokenServicesTest {
    @Test(expected = Exception.class)
    public void testUserInfoTokenServices() {
        UserInfoTokenServices userInfoTokenServices = new UserInfoTokenServices("", "");
        userInfoTokenServices.forTest();
    }
}
