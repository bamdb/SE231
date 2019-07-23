package com.se.activityservice.client;

import com.se.activityservice.entity.Item;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
public class ItemClientFallback implements ItemClient{
    private List<Long> deletedList = new ArrayList<>();

    @Override
    public Item getItemById(Long itemId) {
        if (itemId == 0 || deletedList.contains(itemId)) {
            return null;
        }
        Item item = new Item();
        item.setId(itemId);
        item.setItemname("mock");
        item.setChapterNum(12);
        item.setImgurl(null);
        item.setMainAuthor("bamdb");
        item.setPubTime(Timestamp.valueOf("2019-07-01 08:00:00.0"));
        item.setType(0);
        return item;
    }

    @Override
    public void deleteItemById(Long id) {
        deletedList.add(id);
    }
}
