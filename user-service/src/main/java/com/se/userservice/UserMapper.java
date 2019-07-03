package com.se.userservice;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;
@Mapper
@Component("userMapper")
public interface UserMapper {
    @Select("SELECT * FROM user")
    List<User> selectAll();
}
