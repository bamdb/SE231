package com.se.messageservice.controller;

import com.alibaba.fastjson.JSON;
import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.messageservice.MessageServiceApplication;
import com.se.messageservice.config.MethodSecurityConfig;
import com.se.messageservice.config.ResourceServer;
import com.se.messageservice.entity.Message;
import com.se.messageservice.repository.MessageRepository;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.context.WebApplicationContext;
import java.sql.Timestamp;
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
@ContextConfiguration(classes = {MessageControllerTest.LocalRibbonClientConfiguration.class})
public class MessageControllerTest {
    @Autowired
    private WebApplicationContext context;
    @Autowired
    MessageRepository messageRepository;
    private MockMvc mvc;
    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());

    @TestConfiguration
    public static class LocalRibbonClientConfiguration {
        @Bean
        public ServerList<Server> ribbonServerList() {
            return new StaticServerList<>(new Server("localhost", wiremock.port()));
        }
    }
    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
//                .apply(springSecurity())
                .build();
    }


    @Test
    public void testApplication() {
        MessageServiceApplication.main(new String[]{});
    }

    @Test
    public void testController() throws Exception {
        MultiValueMap<String, String> mm = new LinkedMultiValueMap<>();
        mm.add("senderId", "1");
        mm.add("receiverId", "2");
        mvc.perform(delete("/delete/all")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        Timestamp t = new Timestamp(0);
        Timestamp t1 = new Timestamp(1);
        Message message = new Message(1L, 2L, t, "NOTHINHG HAPPENS BETWEEN US");
        Message message1 = new Message(0L,2L, t1, "NOTHINHG HAPPENS BETWEEN US");
        mvc.perform(post("/add")
                .header("Authorization", "0")
                .content(JSON.toJSONString(message))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .header("Authorization", "0")
                .content(JSON.toJSONString(message1))
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(get("/all")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].content").value("NOTHINHG HAPPENS BETWEEN US"));
        mvc.perform(get("/senderid/1"))
                .andExpect(status().isOk());
        mvc.perform(get("/receiverid/2"))
                .andExpect(status().isOk());
        Long i = new Timestamp(0).getTime();
        mm.add("sendTime", i.toString());
        mvc.perform(get("/content")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("NOTHINHG HAPPENS BETWEEN US"));
        mvc.perform(delete("/delete/one")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(get("/content")
                .params(mm))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(""));
    }

}
