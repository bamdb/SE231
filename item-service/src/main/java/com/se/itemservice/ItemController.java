package com.se.itemservice;

import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
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

    @GetMapping(value = "/tag/id/{itemId}", produces = "application/json")
    public List<Itemtag> getItemTag(@PathVariable Long itemId) {

    }

    @GetMapping(value = "/tag")
    public List<String> getUserTag(@RequestParam("itemId") Long itemId, @RequestParam("userId") Long userId) {

    }

    @PostMapping(value = "/add")
    public Item postItem(@RequestBody Item item) {
        return itemService.postItem(item);
    }

    @PostMapping(value = "/add/relation")
    public void postItemRelation(@RequestParam("priorId") Long priorId, @RequestParam("subsequentId") Long subsequentId,
                                 @RequestParam("relateType") boolean relateType) {
        itemService.postItemRelation(priorId, subsequentId, relateType);
    }

    @PostMapping(value = "/add/tag")
    public void postTag(@RequestParam("itemId") Long itemId, @RequestParam("userId") Long userId, @RequestBody List<String> tagList) {

    }

    @DeleteMapping(value = "/delete/id/{itemId}")
    public ResponseEntity<?> deleteItemById(@PathVariable Long itemId) {
        return itemService.deleteItemById(itemId);
    }

    @DeleteMapping(value = "/delete/relation")
    public void deleteRelationByItemId(@RequestParam("itemId") Long itemId,
                                       @RequestParam("relatedItemId") Long relatedItemId) {
        itemService.deleteItemRelationById(itemId, relatedItemId);
    }

    @DeleteMapping(value = "/delete/tag")
    public void deleteTag(@RequestParam("itemId") Long itemId, @RequestParam("userId") Long userId, @RequestBody List<String> tagList) {

    }

    @PutMapping(value = "/update", produces="application/json")
    public Item updateItemById(@RequestBody Item item) {
        return itemService.updateItem(item);
    }
}