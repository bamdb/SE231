package com.se.topicservice;

import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.topicservice.client.UserClient;
import com.se.topicservice.dao.WriteDao;
import com.se.topicservice.entity.Topic;
import com.se.topicservice.entity.User;
import com.se.topicservice.service.TopicService;
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

import java.sql.Timestamp;

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

    @Resource(name="writeDaoImpl")
    private WriteDao writeDao;

    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());

    @Autowired
    UserClient userClient;

    @Test
    public void controllerTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"topic\":{\"userId\":0, \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}, " +
                        "\"topicContent\":\"This is the first topic in bamdb\"}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"topic\":{\"userId\":null, \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}, " +
                        "\"topicContent\":\"This is the first topic in bamdb\"}"))
                .andExpect(status().isOk());

        User user = new User();
        user.setId(1L);
        user.setRole(1);
        user.setUsername("a");
        user.setImgUrl(null);
        userClient.postUser(user);
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"topic\":{\"userId\":"+user.getId()+", \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}, " +
                        "\"topicContent\":\"This is the first topic in bamdb\"}"))
                .andExpect(status().isOk());

        Topic topic = topicService.selectAll().iterator().next();
        mvc.perform(post("/add/reply?topicId="+topic.getId()+"&userId=0")
                .contentType(MediaType.APPLICATION_JSON)
                .content("A reply"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/reply?topicId=0&userId="+topic.getUserId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("A reply"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/reply?topicId="+topic.getId()+"&userId="+topic.getUserId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("A reply"))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updateTest() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setRole(1);
        user.setUsername("a");
        user.setImgUrl(null);
        userClient.postUser(user);

        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"topic\":{\"userId\":"+user.getId()+", \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}, " +
                        "\"topicContent\":\"This is the first topic in bamdb\"}"))
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
        User user = new User();
        user.setId(1L);
        user.setRole(1);
        user.setUsername("a");
        user.setImgUrl(null);
        userClient.postUser(user);

        Topic topic1 = new Topic();
        topic1.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00"));
        topic1.setUserId(1L);
        topic1.setTitle("mock");
        writeDao.save(topic1);
        mvc.perform(delete("/delete/reply?topicId=1&replyId=10"))
                .andExpect(status().isOk());

        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"topic\":{\"userId\":"+user.getId()+", \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}, " +
                        "\"topicContent\":\"This is the first topic in bamdb\"}"))
                .andExpect(status().isOk());


        Topic topic = topicService.selectAll().iterator().next();
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=10"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/reply?topicId="+topic.getId()+"&userId="+topic.getUserId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("A reply"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/reply?topicId="+topic.getId()+"&userId="+topic.getUserId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("A reply"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/reply?topicId="+topic.getId()+"&userId="+topic.getUserId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("A reply"))
                .andExpect(status().isOk());


        mvc.perform(delete("/delete/reply?topicId=0&replyId=1"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=10"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=1"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=1"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=1"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=1"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/reply?topicId="+topic.getId()+"&replyId=1"))
                .andExpect(status().isOk());

        mvc.perform(delete("/delete/id/"+topic.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void userClientTest() {
        User user = new User();
        user.setId(10L);
        user.setRole(1);
        user.setUsername("a");
        user.setImgUrl(null);
        userClient.postUser(user);
        User user1 = new User();
        user1.setId(1L);
        user1.setRole(1);
        user1.setUsername("a");
        user1.setImgUrl(null);
        userClient.postUser(user1);
        User user2 = new User();
        user2.setId(1L);
        user2.setRole(1);
        user2.setUsername("a");
        user2.setImgUrl(null);
        userClient.postUser(user2);

        userClient.getUserById(0L);
        userClient.getUserById(1L);
        userClient.getUserById(100L);
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
