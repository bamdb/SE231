package com.se.itemservice;


import com.se.itemservice.entity.Item;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ItemService {
    Item postItem(Item item);
    void postItemRelation(Long priorId, Long subsequentId, boolean relateType);
    void postItemTag(Long itemId, Long userId, List<String> tagList);
    Iterable<Item> selectAll();
    Item findItemById(Long id);
    ResponseEntity<?> deleteItemById(Long id);
    ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId);
    Item updateItem(Item item);
}