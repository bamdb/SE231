package com.se.itemservice.dao.Impl;

import com.se.itemservice.dao.MongoDao;
import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.repository.ItemtagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MongoDaoImpl implements MongoDao {

    private final ItemtagRepository itemtagRepository;

    @Autowired
    public MongoDaoImpl(ItemtagRepository itemtagRepository) {
        this.itemtagRepository = itemtagRepository;
    }

    @Override
    public Itemtag findByItemId(Long itemId) {
        return itemtagRepository.findByItemId(itemId).orElse(null);
    }

    @Override
    public Itemtag save(Itemtag itemtag) {
        return itemtagRepository.save(itemtag);
    }

    @Override
    public Itemtag findByItemIdAndUserId(Long itemId, Long userId) {
        return itemtagRepository.findByItemIdAndUserId(itemId, userId).orElse(null);
    }
}
