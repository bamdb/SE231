package com.se.imageservice;

import org.bson.types.Binary;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ImageServiceApplicationTests {
    @Test
    public void testApplication() {
        ImageServiceApplication.main(new String[] {});
    }
}
