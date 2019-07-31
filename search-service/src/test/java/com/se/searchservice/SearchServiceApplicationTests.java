package com.se.searchservice;

import com.google.gson.Gson;
import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SearchServiceApplicationTests {

    @Autowired
    ItemRepository itemRepository;
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;


    @Test
    public void contextLoads() {
        elasticsearchTemplate.putMapping(Item.class);
    }
    @Test
    public void search() {
        NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();
        queryBuilder.withQuery(QueryBuilders.matchQuery("itemname", "我老婆 男"));
        queryBuilder.withPageable(PageRequest.of(0, 160));
        Page<Item> items = itemRepository.search(queryBuilder.build());
        Gson gson = new Gson();
        Assert.assertEquals("", gson.toJson(items));
    }
}
