package com.se.itemservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ItemServiceImpl implements ItemService{
    private final ItemMapper itemMapper;

    @Autowired
    public ItemServiceImpl(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    public List<Item> selectAll() {return itemMapper.selectAll();}

    public Item findItemById(Long id) {
        return itemMapper.selectOneById(id);
    }

    public boolean insertOneItem(String itemname, Timestamp pubTime, int chapterNum, String mainAuthor) {
        Item item = new Item();
        item.setItemname(itemname);
        item.setPubTime(pubTime);
        item.setChapterNum(chapterNum);
        item.setMainAuthor(mainAuthor);
        try {
            itemMapper.insertItem(item);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteOneItem(Long id) {
        try {
            itemMapper.deleteItem(id);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateOneItem(Long id, String itemname, Timestamp pubTime, int chapterNum, String mainAuthor) {
        try {
            itemMapper.updateItem(id, itemname, pubTime, chapterNum, mainAuthor);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
