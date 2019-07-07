package com.se.commentservice;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CommentServiceApplicationTests {
    @Test
    public void testApplication() {
        CommentServiceApplication.main(new String[] {});
    }

}