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
        Item targetItem = new Item();
        for (Item item : itemList) {
            if (item.getId().equals(itemId)) {
                targetItem = item;
            }
        }
        itemList.remove(targetItem);
    }

    @Override
    public Item postItem(Item item) {
        for (Item itemIter : itemList) {
            if (item.getId().equals(itemIter.getId())) {
                return item;
            }
        }
        itemList.add(item);
        return item;
    }

    @Override
    public Item updateItemById(Item item) {
        for (Item itemIter : itemList) {
            if (item.getId() == itemIter.getId()) {
                itemIter.setType(item.getType());
                itemIter.setPubTime(item.getPubTime());
                itemIter.setMainAuthor(item.getMainAuthor());
                itemIter.setItemname(item.getItemname());
                itemIter.setChapterNum(item.getChapterNum());
                itemIter.setImgurl(item.getImgurl());
            }
        }
        return item;
    }
}
