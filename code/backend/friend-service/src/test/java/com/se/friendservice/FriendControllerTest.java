package com.se.friendservice;

import com.alibaba.fastjson.JSON;
import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.friendservice.client.UserClient;
import com.se.friendservice.config.MethodSecurityConfig;
import com.se.friendservice.config.ResourceServer;
import com.se.friendservice.entity.Friend;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cloud.netflix.ribbon.StaticServerList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import java.util.HashMap;
import java.util.Map;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@Import({ResourceServer.class, MethodSecurityConfig.class})
@ActiveProfiles("test")
@SpringBootTest(properties = {
        "feign.hystrix.enabled=true"
})
@ContextConfiguration(classes = {FriendControllerTest.LocalRibbonClientConfiguration.class})
public class FriendControllerTest {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;
    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());
    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
//                .apply(springSecurity())
                .build();
    }
    @Autowired
    UserClient userClient;
    @TestConfiguration
    public static class LocalRibbonClientConfiguration {
        @Bean
        public ServerList<Server> ribbonServerList() {
            return new StaticServerList<>(new Server("localhost", wiremock.port()));
        }
    }

    @Test
    public void testApplication() {
        FriendServiceApplication.main(new String[]{});
    }

    @Test
    public void testController() throws Exception{
        MultiValueMap<String, String> mm = new LinkedMultiValueMap<>();
        mm.add("userId1","11");
        mm.add("userId2", "22");
        mvc.perform(delete("/delete")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        Friend friend = new Friend(11L, 22L);
        Friend friend1 = new Friend(22L, 11L);
        mvc.perform(post("/addreq?userIdReq=11&userIdRecv=22"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .content(JSON.toJSONString(friend))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId1").value("11"));
        mvc.perform(get("/isfriend")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
        MultiValueMap<String, String> mm1 = new LinkedMultiValueMap<>();
        mm1.add("userId1","22");
        mm1.add("userId2", "11");
        mvc.perform(get("/isfriend")
                .params(mm1))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));

        mvc.perform(post("/add")
                .content(JSON.toJSONString(friend1))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userId1").value("22"));
        mvc.perform(get("/isfriend")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("true"));
        MultiValueMap<String, String> mm2 = new LinkedMultiValueMap<>();
        mm2.add("userId1","111");
        mm2.add("userId2", "222");
        mvc.perform(get("/isfriend")
                .params(mm2))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("false"));
        mvc.perform(get("/all/userid/11")
                .header("Authorization", "0"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/userid/22"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(get("/isfriend")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("false"));
    }
}
