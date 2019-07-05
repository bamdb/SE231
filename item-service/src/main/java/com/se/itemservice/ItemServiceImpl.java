package com.se.itemservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private final ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item postItem(Item item) {
        return itemRepository.save(item);
    }

    public Iterable<Item> selectAll() {return itemRepository.findAll();}

    public Item findItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    public ResponseEntity<?> deleteItemById(Long id) {
        itemRepository.deleteById(id);
        return ResponseEntity.ok().body("delete topic successfully!");
    }

    public Item updateItem(Item item) {
        if (itemRepository.existsById(item.getId())) {
            return itemRepository.save(item);
        }
        else return null;
    }
}