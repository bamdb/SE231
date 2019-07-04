package com.se.itemservice;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.Resource;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class ItemServiceApplicationTests {
    @Autowired
    private WebApplicationContext context;

    private MockMvc mvc;

    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
    }
    @Autowired
    ItemMapper itemMapper;
    @Resource(name = "itemServiceImpl")
    ItemService itemService;
    @Autowired
    ItemController itemController;

    @Test
    public void contextLoads() {
        Assert.assertEquals(null, itemService);

        List<Item> list = itemController.getAllItem();
        Assert.assertNotNull(list);

        //Item item = itemController.getItemById()
    }

}