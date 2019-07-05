package com.se.topicservice;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
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
                .content("{\"id\":"+topic.getId()+", \"title\":\"hello bamdb\""))
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

        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"userId\":1, \"title\":\"hello bamdb\", \"pubTime\":\"1562294429\"}"))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
