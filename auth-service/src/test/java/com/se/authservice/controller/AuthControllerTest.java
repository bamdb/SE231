package com.se.authservice.controller;

import com.alibaba.fastjson.JSON;
import com.se.authservice.config.MethodSecurityConfig;
import com.se.authservice.config.ResourceServer;
import com.se.authservice.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
@ContextConfiguration
@Import({ResourceServer.class, MethodSecurityConfig.class})
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private WebApplicationContext context;
    @Autowired
    private AuthController authController;
    private MockMvc mvc;
    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .apply(springSecurity())
                .build();

    }

    @Test
    public void testController() throws  Exception{
        MultiValueMap<String, String> mm = new LinkedMultiValueMap<>();
        User user = new User("john", "123");

        mvc.perform(post("/signup")
                .content(JSON.toJSONString(user))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
        authController.revokeToken("00");
        mm.add("username", "john");
        mm.add("operation", "-");

        mvc.perform(post("/grant/role/ROLE_ADMIN")
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());

        mm.remove("operation");
        mm.add("operation", "+");

        mvc.perform(post("/grant/role/ROLE_ADMIN")
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mm.remove("operation");
        mm.add("operation", "+");


        mvc.perform(post("/grant/role/ROLE_ADMIN").with(user("admin").roles("USER","ADMIN"))
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());

        mvc.perform(post("/revoke/authority/comment").with(user("admin").roles("USER","ADMIN"))
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());

        mvc.perform(post("/revoke/authority/comment").with(user("admin").roles("USER","ADMIN"))
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mm.remove("operation");
        mm.add("operation", "-");
        mvc.perform(post("/revoke/authority/comment").with(user("admin").roles("USER","ADMIN"))
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mm.remove("operation");
        mm.add("operation", "+");
        mvc.perform(post("/revoke/authority/comment").with(user("admin").roles("USER","ADMIN"))
                .params(mm)
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());


    }
}
