package com.se.itemservice.dao.Impl;

import com.se.itemservice.dao.MongoDao;
import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.entity.graph.Root;
import com.se.itemservice.repository.ItemtagRepository;
import com.se.itemservice.repository.RootRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MongoDaoImpl implements MongoDao {

    private final ItemtagRepository itemtagRepository;

    private final RootRepository rootRepository;

    @Autowired
    public MongoDaoImpl(ItemtagRepository itemtagRepository, RootRepository rootRepository) {
        this.itemtagRepository = itemtagRepository;
        this.rootRepository = rootRepository;
    }

    @Override
    public Itemtag findItemtagByItemId(Long itemId) {
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

    @Override
    public Root findRootByItemId(Long itemId) {
        return rootRepository.findByItemId(itemId).orElse(null);
    }

    @Override
    public Root save(Root root) {
        return rootRepository.save(root);
    }
}
