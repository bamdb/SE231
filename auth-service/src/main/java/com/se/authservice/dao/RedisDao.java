package com.se.authservice.dao;

public interface RedisDao {
    void set(int entry, String key);
    void setUuid(String entry, String value);
    String get(int entry);
    String getUuid(String entry);
}
