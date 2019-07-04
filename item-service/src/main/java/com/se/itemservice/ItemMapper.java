package com.se.itemservice;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.List;

@Mapper
@Component("itemMapper")
public interface ItemMapper {
    @Select("SELECT * FROM Item")
    List<Item> selectAll();

    @Select("SELECT * FROM Item WHERE id = #{id}")
    Item selectOneById(Long id);

    @Insert("INSERT INTO Item(id,itemname,pub_time,chapter_num,main_author) VALUES(#{id},#{itemname},#{pubTime},#{chapterNum},#{mainAuthor})")
    @SelectKey(keyProperty = "id",keyColumn = "id",resultType = BigInteger.class,before = false,statement = "select last_insert_id()")
    void insertItem(Item item);

    @Delete("DELETE FROM Item WHERE id = #{id}")
    void deleteItem(Long id);

    @Update("UPDATE Item SET itemname = #{itemname}, pub_time = #{pubTime}, chapter_num = #{chapterNum}, main_author = #{mainAuthor} WHERE id = #{id}")
    void updateItem(Long id, String itemname, Timestamp pubTime, int chapterNum, String mainAuthor);
}
