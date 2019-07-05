package com.se.itemservice;


import javax.swing.text.html.Option;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface ItemService {
    Iterable<Item> selectAll();

    Item findItemById(Long id);

    boolean insertOneItem(String itemname, Timestamp pubTime, int chapterNum, String mainAuthor);

    boolean deleteOneItem(Long id);

    boolean updateOneItem(Long id, String itemname, Timestamp pubTime, int chapterNum, String mainAuthor);
}