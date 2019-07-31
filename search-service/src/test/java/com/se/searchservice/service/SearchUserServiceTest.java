package com.se.searchservice.service;

import com.se.searchservice.entity.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchUserServiceTest {
    @Autowired
    private WebApplicationContext context;
    private MockMvc mvc;
    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }

    @Test
    public void testController() throws Exception {
        User user = new User(null, null);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("keystring", "admin");
        map.add("page", "0");
        map.add("size", "1");
        mvc.perform(get("/ik/user")
                .params(map))
                .andExpect(status().isOk());
    }
}
