package com.se.authservice.dao;

public interface RedisDao {
    void set(int entry, String key);
    String get(int entry);
}
