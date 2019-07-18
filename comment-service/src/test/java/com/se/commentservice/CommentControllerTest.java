package com.se.commentservice;

import com.alibaba.fastjson.JSON;
import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.commentservice.client.UserClient;
import com.se.commentservice.entity.Comment;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.cloud.netflix.ribbon.StaticServerList;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = {
        "feign.hystrix.enabled=true"
})
@ContextConfiguration(classes = {CommentControllerTest.LocalRibbonClientConfiguration.class})
public class CommentControllerTest {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = MockMvcBuilders.webAppContextSetup(context)
//                .apply(springSecurity())
                .build();
    }

    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());

    @Autowired
    UserClient userClient;

    @Test
    public void testApplication() {
        CommentServiceApplication.main(new String[] {});
    }

    @Test
    public void controllerTest() throws Exception  {
        Comment comment = new Comment(11L, 22L, new Timestamp(33), "nothing");
        Map<String, String> hm = new HashMap<>();
        MultiValueMap<String, String> mm = new LinkedMultiValueMap<>();
        mm.add("itemId","11");
        mm.add("userId", "22");
        mvc.perform(delete("/delete")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(get("/userid/22"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].itemId").doesNotExist());
        mvc.perform(get("/itemid/11"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].itemId").doesNotExist());
        mvc.perform(post("/insert")
                .content(JSON.toJSONString(comment))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.itemId").exists());
        mvc.perform(get("/")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value("nothing"));
        mvc.perform(get("/userid/22"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.[0].itemId").exists());
        mvc.perform(get("/itemid/11"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.jsonPath("$.[0].comment.itemId").exists());
        mvc.perform(delete("/delete")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
    }

    @TestConfiguration
    public static class LocalRibbonClientConfiguration {
        @Bean
        public ServerList<Server> ribbonServerList() {
            return new StaticServerList<>(new Server("localhost", wiremock.port()));
        }
    }
}
