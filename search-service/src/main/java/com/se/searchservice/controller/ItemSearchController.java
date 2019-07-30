package com.se.searchservice.controller;

import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemSearchController {
    @Autowired
    ItemRepository itemRepository;
    @GetMapping("/")
    public Page<Item> test() {
        Pageable pageable = PageRequest.of(0, 10);
        return itemRepository.findAll(pageable);
    }
}
