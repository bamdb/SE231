package com.se.itemservice.controller;

import com.se.itemservice.config.MethodSecurityConfig;
import com.se.itemservice.config.ResourceServer;
import com.se.itemservice.entity.Item;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;
import java.util.Iterator;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@Import({ResourceServer.class, MethodSecurityConfig.class})
@ActiveProfiles("test")
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
    com.se.itemservice.ItemService itemService;

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
        Assert.assertEquals(1562295020L, modifiedItem.getPubTime().getTime());
        Assert.assertEquals(9, modifiedItem.getChapterNum());
        Assert.assertEquals("Liu", modifiedItem.getMainAuthor());
        Assert.assertEquals("notnull", modifiedItem.getImgurl());
        Assert.assertEquals(Integer.valueOf(1), modifiedItem.getType());
    }


    @Test
    public void deleteTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());

        if (itemService.selectAll().iterator().hasNext()) {
            Long id = itemService.selectAll().iterator().next().getId();
            mvc.perform(delete("/delete/id/"+id))
                    .andExpect(status().isOk());
            Assert.assertNull(itemService.findItemById(id));
        }

        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());

        Iterator<Item> itemIterator = itemService.selectAll().iterator();
        Item item = itemIterator.next();
        Item item1 = itemIterator.next();
        mvc.perform(post("/add/relation?priorId="+item.getId()+"&subsequentId="+item1.getId()+"&relateType=0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/relation?itemId="+item.getId()+"&relatedItemId="+item1.getId()))
                .andExpect(status().isOk());
    }

    @Test
    public void controllerTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());

        Iterator<Item> itemIterator = itemService.selectAll().iterator();
        Item item = itemIterator.next();
        Item item1 = itemIterator.next();
        Item item2 = itemIterator.next();
        mvc.perform(post("/add/relation?priorId="+item.getId()+"&subsequentId="+item1.getId()+"&relateType=0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/relation?priorId="+item.getId()+"&subsequentId="+item2.getId()+"&relateType=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/relation?priorId="+item1.getId()+"&subsequentId="+item.getId()+"&relateType=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/relation?priorId="+item2.getId()+"&subsequentId="+item.getId()+"&relateType=0")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/relation?priorId="+item.getId()+"&subsequentId=0&relateType=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(post("/add/relation?priorId=0&subsequentId="+item2.getId()+"&relateType=1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/all").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(get("/id/"+item.getId()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(get("/id/0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void tagTest() throws Exception {
        mvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"itemname\":\"three body\", \"pubTime\":\"1562294429\", \"chapterNum\":12, \"mainAuthor\":\"Cixin Liu\", \"imgurl\":null, \"type\":0}"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/tag?itemId=0&userId=1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\"]"))
                .andExpect(status().isOk());
        Item item = itemService.selectAll().iterator().next();
        mvc.perform(post("/add/tag?itemId="+item.getId()+"&userId=1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\"]"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/tag?itemId="+item.getId()+"&userId=2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\"]"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/tag?itemId="+item.getId()+"&userId=2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\",\"tag3\"]"))
                .andExpect(status().isOk());
        mvc.perform(post("/add/tag?itemId="+item.getId()+"&userId=1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\"]"))
                .andExpect(status().isOk());

        mvc.perform(get("/tag/id/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(get("/tag?itemId="+item.getId()+"&userId=1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mvc.perform(get("/tag?itemId="+item.getId()+"&userId=3").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        mvc.perform(delete("/delete/tag?itemId="+item.getId()+"&userId=1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\",\"tag3\"]"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/tag?itemId="+item.getId()+"&userId=1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\"]"))
                .andExpect(status().isOk());
        mvc.perform(delete("/delete/tag?itemId="+item.getId()+"&userId=2")
                .contentType(MediaType.APPLICATION_JSON)
                .content("[\"tag1\",\"tag2\",\"tag3\",\"tag4\"]"))
                .andExpect(status().isOk());
    }
}
