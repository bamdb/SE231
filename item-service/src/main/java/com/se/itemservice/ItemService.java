package com.se.itemservice;

import java.sql.Timestamp;
import java.util.List;

public interface ItemService {
    List<Item> selectAll();

    Item findItemById(Long id);

    boolean insertOneItem(String itemname, Timestamp pubTime, int chapterNum, String mainAuthor);

    boolean deleteOneItem(Long id);

    boolean updateOneItem(Long id, String itemname, Timestamp pubTime, int chapterNum, String mainAuthor);
}
