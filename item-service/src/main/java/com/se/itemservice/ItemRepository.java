package com.se.itemservice;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ItemRepository extends CrudRepository<Item, Long> {
    Optional<Item> findByItemname(String username);
    @Transactional
    void deleteUserByItemname(String username);
    boolean existsByItemname(String username);
}