package com.se.activityservice;

import com.github.tomakehurst.wiremock.junit.WireMockClassRule;
import com.netflix.loadbalancer.Server;
import com.netflix.loadbalancer.ServerList;
import com.se.activityservice.client.ItemClient;
import com.se.activityservice.client.UserClient;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = {
        "feign.hystrix.enabled=true"
})
@ContextConfiguration(classes = {ActivityServiceApplicationTests.LocalRibbonClientConfiguration.class})
public class ActivityServiceApplicationTests {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }

    @Resource(name="activityServiceImpl")
    ActivityService activityService;

    @ClassRule
    public static WireMockClassRule wiremock = new WireMockClassRule(
            wireMockConfig().dynamicPort());

    @Autowired
    UserClient userClient;

    @Autowired
    ItemClient itemClient;

    @Test
    public void testApplication() {
        ActivityServiceApplication.main(new String[] {});
    }

    @Test
    public void controllerTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":0, \"userId\":1, \"itemId\":1}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":0, \"userId\":2, \"itemId\":2}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":1, \"userId\":0, \"itemId\":2}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":1, \"userId\":null, \"itemId\":2}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":2, \"userId\":2, \"itemId\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":2, \"userId\":2, \"itemId\":null}"))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/userid/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/itemid/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/collect?userId=1&itemId=1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/userid/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/itemid/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        userClient.deleteUserById(1L);
        itemClient.deleteItemById(2L);
        mvc.perform(get("/userid/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/itemid/2").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":0, \"userId\":2, \"itemId\":2}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":0, \"userId\":3, \"itemId\":3}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":0, \"userId\":2, \"itemId\":4}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"actTime\":\"1562294429\", \"actType\":0, \"userId\":5, \"itemId\":3}"))
                .andExpect(status().isOk());
        if (activityService.selectAll().iterator().hasNext()) {
            Long id = activityService.selectAll().iterator().next().getId();
            mvc.perform(delete("/delete/id/"+id))
                    .andExpect(status().isOk());
            Assert.assertNull(activityService.selectById(id));
        }
        if (activityService.selectAll().iterator().hasNext()) {
            Long userId = activityService.selectAll().iterator().next().getUserId();
            mvc.perform(delete("/delete/userid/"+userId))
                    .andExpect(status().isOk());
            Assert.assertNull(activityService.selectByUserId(userId));
        }
        if (activityService.selectAll().iterator().hasNext()) {
            Long itemId = activityService.selectAll().iterator().next().getItemId();
            mvc.perform(delete("/delete/itemid/"+itemId))
                    .andExpect(status().isOk());
            Assert.assertNull(activityService.selectByUserId(itemId));
        }
    }

    @Test
    public void progressTest() throws Exception  {
        mvc.perform(put("/update/progress")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemId\":1, \"userId\":2, \"chapters\":[{\"chapterNum\":1,\"finish\":1,\"sections\":[1,1,1]}]}"))
                .andExpect(status().isOk());
        mvc.perform(get("/progress?itemId=1&userId=2"))
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