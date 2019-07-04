package com.se.itemservice;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component("itemMapper")
public interface ItemMapper {
    @Select("SELECT * FROM Item")
    List<Item> selectAll();
}
