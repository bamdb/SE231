package com.se.userservice;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
//@ActiveProfiles("test")
public class UserServiceApplicationTests {

    @Test
    public void testApplication() { UserServiceApplication.main(new String[] {});
    }

}