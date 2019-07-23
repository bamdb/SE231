package com.se.commentservice;

import com.se.commentservice.service.UserInfoTokenServices;
import org.junit.Test;

public class UserInfoTokenServicesTest {
    @Test(expected = Exception.class)
    public void testUserInfoTokenServices() {
        UserInfoTokenServices userInfoTokenServices = new UserInfoTokenServices("", "");
        userInfoTokenServices.forTest();
    }
}
