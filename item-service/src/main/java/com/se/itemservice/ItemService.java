package com.se.itemservice;


import com.se.itemservice.entity.Item;
import org.springframework.http.ResponseEntity;

public interface ItemService {
    Item postItem(Item item);
    void postItemRelation(Long priorId, Long subsequentId, boolean relateType);
    Iterable<Item> selectAll();
    Item findItemById(Long id);
    ResponseEntity<?> deleteItemById(Long id);
    ResponseEntity<?> deleteItemRelationById(Long itemId, Long relatedItemId);
    Item updateItem(Item item);
}