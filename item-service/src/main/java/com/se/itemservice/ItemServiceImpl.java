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

    public boolean insertOneItem(String itemname, Timestamp pubTime, int chapterNum, String mainAuthor {

    }
}
