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
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import javax.annotation.Resource;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
//@ActiveProfiles("test")
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

    @Test
    public void updateTest() throws Exception {
        mvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"root\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null, \"role\":0}"))
                .andExpect(status().isOk());
        mvc.perform(put("/update").contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":0, \"username\":\"root\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null, \"role\":0}"))
                .andExpect(status().isOk());
        User user = userService.selectAll().iterator().next();
        mvc.perform(put("/update").contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":"+user.getId()+", \"username\":\"modified\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null, \"role\":0}"))
                .andExpect(status().isOk());
        Assert.assertEquals("modified", userService.selectAll().iterator().next().getUsername());
    }

    @Test
    public void deleteTest() throws Exception {
        mvc.perform(delete("/delete/username/root"))
                .andExpect(status().isOk());
        Assert.assertNull(userService.selectByUsername("root"));
        if (userService.selectAll().iterator().hasNext()) {
            Long id = userService.selectAll().iterator().next().getId();
            mvc.perform(delete("/delete/id/"+id))
                    .andExpect(status().isOk());
            Assert.assertNull(userService.selectById(id));
        }
    }


    //    @WithMockUser(roles={"ADMIN"})
    @Test
    public void controllerTest() throws  Exception{
        mvc.perform(post("/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"root\", \"password\":\"bamdb\", \"mail\":\"isalb@qq.com\", \"img_url\":null, \"role\":0}"))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/username/root").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

}