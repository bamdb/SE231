package com.se.imageservice;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@RunWith(SpringRunner.class)
@SpringBootTest
public class ImageControllerTest {

    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup() {
        mvc = MockMvcBuilders.webAppContextSetup(context)
//                .apply(springSecurity())
                .build();
    }

    @Test
    public void testController() throws Exception {
        mvc.perform(delete("/delete/id/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        MockMultipartFile firstFile = new MockMultipartFile("image", "filename.png", "text/plain", "some xml".getBytes());
        mvc.perform(MockMvcRequestBuilders.multipart("/insert/id/1").file(firstFile))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(get("/id/0")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.content().string(""));
        mvc.perform(get("/id/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.content().string("some xml"));
//                .andExpect(MockMvcResultMatchers.jsonPath("$.image").exists());.value
        MockMultipartFile secondFile = new MockMultipartFile("image", "filename.png", "text/plain", "many xml".getBytes());
        mvc.perform(MockMvcRequestBuilders.multipart("/update/id/1").file(secondFile))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
        mvc.perform(get("/id/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk()).andExpect(MockMvcResultMatchers.content().string("many xml"));
        mvc.perform(delete("/delete/id/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

}
