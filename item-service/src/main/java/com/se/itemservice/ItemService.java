package com.se.itemservice;


import org.springframework.http.ResponseEntity;

import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface ItemService {
    Item postItem(Item item);
    Iterable<Item> selectAll();
    Item findItemById(Long id);
    ResponseEntity<?> deleteItemById(Long id);
    Item updateItem(Item item);
}