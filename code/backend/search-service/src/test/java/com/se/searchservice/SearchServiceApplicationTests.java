package com.se.searchservice;


import com.se.searchservice.config.MethodSecurityConfig;
import com.se.searchservice.config.ResourceServer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@Import({ResourceServer.class, MethodSecurityConfig.class})
@ActiveProfiles("test")
@SpringBootTest
public class SearchServiceApplicationTests {


    @Test
    public void testApplication() {
        SearchServiceApplication.main(new String[] {});
    }
}
