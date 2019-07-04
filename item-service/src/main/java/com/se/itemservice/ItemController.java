package com.se.itemservice;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;

@RestController
public class ItemController {
    @Resource(name = "itemServiceImpl")
    private ItemService itemService;

    @GetMapping(value = "/item/all", produces = "application/json")
    public List<Item> getAllItem() {return itemService.selectAll();}

    @GetMapping(value = "/item/{itemId}", produces = "application/json")
    public Item getItemById(@PathVariable Long itemId) {
        return itemService.findItemById(itemId);
    }

    @PostMapping(value = "/item/add")
    public Item insertOneItem(@RequestParam(value = "itemname") String itemname, @RequestParam(value = "pubTime") Timestamp pubTime,
                              @RequestParam(value = "chapterNum") int chapterNum, @RequestParam(value = "mainAuthor") String mainAuthor) {

    }
}
