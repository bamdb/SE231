package com.se.topicservice;

import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.topicservice.entity.Topic;
import com.se.topicservice.entity.User;
import org.junit.Assert;
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
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import static com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = {
        "feign.hystrix.enabled=true"
})
@ContextConfiguration(classes = {TopicServiceApplicationTests.LocalRibbonClientConfiguration.class})
public class TopicServiceApplicationTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }

    @Resource(name="topicServiceImpl")
    TopicService topicService;

    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());

    @Autowired
    UserClient userClient;

    @Test
    public void updateTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\":1, \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}"))
                .andExpect(status().isOk());
        mvc.perform(put("/update").contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":0,\"title\":\"modified\"}"))
                .andExpect(status().isOk());
        Topic topic = topicService.selectAll().iterator().next();
        mvc.perform(put("/update").contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":"+topic.getId()+", \"title\":\"modified\"}"))
                .andExpect(status().isOk());
        Assert.assertEquals("modified", topicService.selectAll().iterator().next().getTitle());
    }


    @Test
    public void deleteTest() throws Exception {
        if (topicService.selectAll().iterator().hasNext()) {
            Long id = topicService.selectAll().iterator().next().getId();
            mvc.perform(delete("/delete/id/"+id))
                    .andExpect(status().isOk());
            Assert.assertNull(topicService.selectById(id));
        }
    }

    @Test
    public void controllerTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\":0, \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}"))
                .andExpect(status().isOk());

        User user = userClient.getAllUsers().iterator().next();
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\":"+user.getId()+", \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}"))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testApplication() {
        TopicServiceApplication.main(new String[] {});
    }

    @TestConfiguration
    public static class LocalRibbonClientConfiguration {
        @Bean
        public ServerList<Server> ribbonServerList() {
            return new StaticServerList<>(new Server("localhost", wiremock.port()));
        }
    }
}
