package com.se.itemservice;

import org.springframework.beans.factory.annotation.Autowired;
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

    public Iterable<Item> selectAll() {return itemRepository.findAll();}

    public Item findItemById(Long id) {
        return itemRepository.findById(id).orElse(null);
    }

    public boolean insertOneItem(String itemname, Timestamp pubTime, int chapterNum, String mainAuthor) {
        Item item = new Item();
        item.setItemname(itemname);
        item.setPubTime(pubTime);
        item.setChapterNum(chapterNum);
        item.setMainAuthor(mainAuthor);
        try {
            itemRepository.save(item);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteOneItem(Long id) {
        try {
            itemRepository.deleteById(id);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateOneItem(Long id, String itemname, Timestamp pubTime, int chapterNum, String mainAuthor) {
        try {
            Item item = itemRepository.findById(id).orElse(null);
            if (item == null) return false;
            item.setChapterNum(chapterNum);
            item.setItemname(itemname);
            item.setPubTime(pubTime);
            item.setMainAuthor(mainAuthor);
            itemRepository.save(item);
            return true;
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}