package com.se.itemservice.dao.Impl;

import com.se.itemservice.config.ds.DataSource;
import com.se.itemservice.dao.ItemReadDao;
import com.se.itemservice.entity.Item;
import com.se.itemservice.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ItemReadDaoImpl implements ItemReadDao {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemReadDaoImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    @DataSource("slave")
    public Item findById(Long itemId) {
        return itemRepository.findById(itemId).orElse(null);
    }

    @Override
    @DataSource("slave")
    public Iterable<Item> findAll() {
        return itemRepository.findAll();
    }

    @Override
    @DataSource("slave")
    public boolean existsById(Long itemId) {
        return itemRepository.existsById(itemId);
    }
}
