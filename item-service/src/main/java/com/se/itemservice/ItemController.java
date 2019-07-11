package com.se.itemservice;

import com.se.itemservice.entity.Item;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

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
    public Item postItem(@RequestBody Item item) {
        return itemService.postItem(item);
    }

    @PostMapping(value = "/add/relation")
    public void postItemRelation(@RequestParam("priorId") Long priorId, @RequestParam("subsequentId") Long subsequentId,
                                 @RequestParam("relateType") boolean relateType) {

    }

    @DeleteMapping(value = "/delete/id/{itemId}")
    public ResponseEntity<?> deleteItemById(@PathVariable Long itemId) {
        return itemService.deleteItemById(itemId);
    }

    @PutMapping(value = "/update", produces="application/json")
    public Item updateItemById(@RequestBody Item item) {
        return itemService.updateItem(item);
    }
}