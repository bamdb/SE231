package com.se.ratingservice;

import com.se.ratingservice.entity.Item;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Component
public class ItemClientFallback implements ItemClient{
    private List<Item> itemList = new ArrayList<>();

    @Override
    public Item getItemById(Long itemId) {
        for (Item item : itemList) {
            if (item.getId().equals(itemId)) {
                return item;
            }
        }
        return null;
    }

    @Override
    public void deleteItemById(Long itemId) {
        for (Item item : itemList) {
            if (item.getId().equals(itemId)) {
                itemList.remove(item);
            }
        }
    }

    @Override
    public Item postItem(Item item) {
        itemList.add(item);
        return item;
    }
}
