package com.se.searchservice.service;


import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import org.elasticsearch.index.mapper.Mapping;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.net.http.HttpResponse;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchItemServiceTest {
    @Autowired
    private WebApplicationContext context;
    private MockMvc mvc;
    @Before
    public void setup(){
        mvc = MockMvcBuilders.webAppContextSetup(context)
                .build();
        elasticsearchTemplate.deleteIndex(Item.class);
        elasticsearchTemplate.createIndex(Item.class);
        elasticsearchTemplate.putMapping(Item.class);
        elasticsearchTemplate.refresh(Item.class);
    }
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;
    @Autowired
    ItemRepository itemRepository;
    @Test
    public void testController() throws Exception {
        Item item = new Item(0L, "我是高中生", "高中生");
        itemRepository.save(item);
        mvc.perform(get("/ik/item")
                .content("{\"keystring\": \"高中生\", \"page\": 0, \"size\": 1}")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers
                        .jsonPath("$.content[0].itemname")
                        .value("我是高中生"));

    }
}
