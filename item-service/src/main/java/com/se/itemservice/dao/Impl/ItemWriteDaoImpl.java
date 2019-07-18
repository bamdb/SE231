package com.se.itemservice.dao.Impl;

import com.se.itemservice.config.ds.DataSource;
import com.se.itemservice.dao.ItemWriteDao;
import com.se.itemservice.entity.Item;
import com.se.itemservice.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ItemWriteDaoImpl implements ItemWriteDao {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemWriteDaoImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    @DataSource("master")
    public Item save(Item item) {
        return itemRepository.save(item);
    }

    @Override
    @DataSource("master")
    public void deleteById(Long itemId) {
        itemRepository.deleteById(itemId);
    }

}
