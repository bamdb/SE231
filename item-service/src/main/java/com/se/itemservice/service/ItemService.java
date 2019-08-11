package com.se.itemservice.service;

import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.entity.graph.Root;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    Item postItem(Item item);
    void postItemRelation(Long source, Long target, String relateType);
    Itemtag postItemTag(Long itemId, Long userId, List<String> tagList);
    Iterable<Item> selectAll();
    Item findItemById(Long id);
    Itemtag findItemtag(Long itemId);
    List<String> findUsertag(Long itemId, Long userId);
    Root findItemGraph(Long itemId);
    ResponseEntity<?> deleteItemById(Long id);
    ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId);
    ResponseEntity<?> deleteItemTag(Long itemId, Long userId, List<String> tagList);
    Item updateItem(Item item);
}