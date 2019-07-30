package com.se.searchservice;

import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchServiceApplicationTests {

    @Autowired
    ItemRepository itemRepository;
    @Test
    public void contextLoads() {
//        Pageable pageable = PageRequest.of(0, 10);
        Assert.assertEquals("", ((Item)itemRepository.findAll().iterator()).getItemname());
    }

}
