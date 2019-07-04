package com.se.itemservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class ItemController {
    @Resource(name = "itemServiceImpl")
    private ItemService itemService;

    @GetMapping(value = "/item/all", produces = "application/json")
    List<Item> getAllItem() {return itemService.selectAll();}
}
