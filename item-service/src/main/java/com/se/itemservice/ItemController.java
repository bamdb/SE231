package com.se.itemservice;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;

@RestController
public class ItemController {
    @Resource(name = "itemServiceImpl")
    private ItemService itemService;

    @GetMapping(value = "/all", produces = "application/json")
    public Iterable<Item> getAllItem() {return itemService.selectAll();}

    @GetMapping(value = "/id/{itemId}", produces = "application/json")
    public Item getItemById(@PathVariable Long itemId) {
        return itemService.findItemById(itemId);
    }

    @PostMapping(value = "/add")
    public boolean insertOneItem(@RequestParam(value = "itemname") String itemname, @RequestParam(value = "pubTime") Timestamp pubTime,
                                 @RequestParam(value = "chapterNum") int chapterNum, @RequestParam(value = "mainAuthor") String mainAuthor) {
        return itemService.insertOneItem(itemname, pubTime, chapterNum, mainAuthor);
    }

    @DeleteMapping(value = "/delete/{itemId}")
    public boolean deleteItemById(@PathVariable Long itemId) {
        return itemService.deleteOneItem(itemId);
    }

    @PutMapping(value = "/update/{itemId}")
    public boolean updateItemById(@PathVariable Long itemId, @RequestParam(value = "itemname") String itemname,
                                  @RequestParam(value = "pubTime") Timestamp pubTime, @RequestParam(value = "chapterNum") int chapterNum,
                                  @RequestParam(value = "mainAuthor") String mainAuthor) {
        return itemService.updateOneItem(itemId, itemname, pubTime, chapterNum, mainAuthor);
    }
}