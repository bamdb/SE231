package com.se.itemservice.controller;

import com.se.itemservice.ItemService;
import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.security.Principal;
import java.util.List;

@RestController
public class ItemController {

    @Resource(name ="itemServiceImpl")
    private ItemService itemService;

    @GetMapping(value = "/all", produces = "application/json")
    public Iterable<Item> getAllItem() {return itemService.selectAll();}

    @GetMapping(value = "/id/{itemId}", produces = "application/json")
    public Item getItemById(@PathVariable Long itemId) {
        return itemService.findItemById(itemId);
    }

    @GetMapping(value = "/tag/id/{itemId}", produces = "application/json")
    public Itemtag getItemTag(@PathVariable Long itemId) {
        return itemService.findItemtag(itemId);
    }

    @GetMapping(value = "/tag")
    public List<String> getUserTag(@RequestParam("itemId") Long itemId, @RequestParam("userId") Long userId) {
        return itemService.findUsertag(itemId, userId);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @PostMapping(value = "/add")
    public Item postItem(@RequestBody Item item) {
        return itemService.postItem(item);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @PostMapping(value = "/add/relation")
    public void postItemRelation(@RequestParam("priorId") Long priorId, @RequestParam("subsequentId") Long subsequentId,
                                 @RequestParam("relateType") boolean relateType) {
        itemService.postItemRelation(priorId, subsequentId, relateType);
    }

    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id or hasRole('EDITOR')")
    @PostMapping(value = "/add/tag")
    public Itemtag postTag(@RequestParam("itemId") Long itemId,
                           @RequestParam("userId") Long userId,
                           @RequestBody List<String> tagList) {
        return itemService.postItemTag(itemId, userId, tagList);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @DeleteMapping(value = "/delete/id/{itemId}")
    public ResponseEntity<?> deleteItemById(@PathVariable Long itemId) {
        return itemService.deleteItemById(itemId);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @DeleteMapping(value = "/delete/relation")
    public void deleteRelationByItemId(@RequestParam("itemId") Long itemId,
                                       @RequestParam("relatedItemId") Long relatedItemId) {
        itemService.deleteItemRelationById(itemId, relatedItemId);
    }

    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id or hasRole('EDITOR')")
    @DeleteMapping(value = "/delete/tag")
    public void deleteTag(@RequestParam("itemId") Long itemId, @RequestParam("userId") Long userId, @RequestBody List<String> tagList) {
        itemService.deleteItemTag(itemId, userId, tagList);
    }

    @PreAuthorize("hasRole('EDITOR')")
    @PutMapping(value = "/update", produces="application/json")
    public Item updateItemById(@RequestBody Item item) {
        return itemService.updateItem(item);
    }
}