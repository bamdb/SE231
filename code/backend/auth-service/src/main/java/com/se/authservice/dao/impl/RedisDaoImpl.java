package com.se.authservice.dao.impl;

import com.se.authservice.dao.RedisDao;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

@Repository
public class RedisDaoImpl implements RedisDao {

    @Resource(name="redisTemplate")
    private RedisTemplate redisTemplate;

    public void set(int entry, String value) {
        redisTemplate.opsForValue().set(entry, value, 600, TimeUnit.SECONDS);
    }

//    public void setUuid(String entry, String value) {
//        redisTemplate.opsForValue().set(entry, value, 600, TimeUnit.SECONDS);
//    }

    public String get(int entry) {
        return (String)redisTemplate.opsForValue().get(entry);
    }

//    public String getUuid(String entry) {
//        return (String)redisTemplate.opsForValue().get(entry);
//    }
}
