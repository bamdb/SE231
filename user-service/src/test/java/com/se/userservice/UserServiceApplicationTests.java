package com.se.userservice;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import javax.annotation.Resource;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class UserServiceApplicationTests {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
//                .apply(springSecurity())
                .build();
    }
    @Resource(name="userServiceImpl")
    UserService userService;

//    @WithMockUser(roles={"ADMIN"})
    @Test
    public void contextLoads() throws  Exception{
        mvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"roott\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null}"))
                .andExpect(status().isOk());

//        mvc.perform(get("/users").contentType(MediaType.APPLICATION_JSON))
//                .andDo(MockMvcResultHandlers.print())
//                .andExpect(status().is(404))
//                .andReturn().getResponse().getContentAsString();

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/userid/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/username/root").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

}
