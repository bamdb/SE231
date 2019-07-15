package com.se.itemservice;


import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    Item postItem(Item item);
    void postItemRelation(Long priorId, Long subsequentId, boolean relateType);
    void postItemTag(Long itemId, Long userId, List<String> tagList);
    Iterable<Item> selectAll();
    Item findItemById(Long id);
    Itemtag findItemtag(Long itemId);
    List<String> findUsertag(Long itemId, Long userId);
    ResponseEntity<?> deleteItemById(Long id);
    ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId);
    ResponseEntity<?> deleteItemTag(Long itemId, Long userId, List<String> tagList);
    Item updateItem(Item item);
}