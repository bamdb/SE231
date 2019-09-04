package com.se.searchservice.controller;

import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import com.se.searchservice.service.SearchItemService;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;

@RestController
public class ItemSearchController {
    @Resource(name = "searchItemServiceImpl")
    SearchItemService searchItemService;

    @GetMapping("/ik/item")
    public Page<Item> test(@RequestParam("keystring") String keystring,
                               @RequestParam("page") int page,
                               @RequestParam("size") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Item> items = searchItemService.searchItem(keystring, pageable);
        return items;
    }
}
