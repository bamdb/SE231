package com.se.itemservice;


import com.se.itemservice.entity.Item;
import org.springframework.http.ResponseEntity;

public interface ItemService {
    Item postItem(Item item);
    Iterable<Item> selectAll();
    Item findItemById(Long id);
    ResponseEntity<?> deleteItemById(Long id);
    Item updateItem(Item item);
}