package com.se.itemservice;

import com.se.itemservice.entity.Item;
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
import java.sql.Timestamp;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ItemControllerTest {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }

    @Resource(name="itemServiceImpl")
    ItemService itemService;

    @Test
    public void updateTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562293010\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(put("/update").contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":0, \"itemname\":\"three body\", \"pubTime\":\"1562293010\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        Item item = itemService.selectAll().iterator().next();
        mvc.perform(put("/update").contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":"+item.getId()+", \"itemname\":\"modified\", \"pubTime\":\"1562295020\", \"chapterNum\":9, \"mainAuthor\":\"Liu\", \"imgurl\":\"notnull\", \"type\":1}"))
                .andExpect(status().isOk());
        Item modifiedItem = itemService.selectAll().iterator().next();
        Long test1 = modifiedItem.getPubTime().getTime();
        Assert.assertEquals("modified", modifiedItem.getItemname());
        Assert.assertEquals(1562295000L, modifiedItem.getPubTime().getTime());
        Assert.assertEquals(9, modifiedItem.getChapterNum());
        Assert.assertEquals("Liu", modifiedItem.getMainAuthor());
        Assert.assertEquals("notnull", modifiedItem.getImgurl());
        Assert.assertEquals(Integer.valueOf(1), modifiedItem.getType());
    }


    @Test
    public void deleteTest() throws Exception {
        if (itemService.selectAll().iterator().hasNext()) {
            Long id = itemService.selectAll().iterator().next().getId();
            mvc.perform(delete("/delete/id/"+id))
                    .andExpect(status().isOk());
            Assert.assertNull(itemService.findItemById(id));
        }
    }

    @Test
    public void controllerTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
