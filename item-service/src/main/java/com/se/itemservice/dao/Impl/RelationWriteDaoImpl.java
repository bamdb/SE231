package com.se.itemservice.dao.Impl;

import com.se.itemservice.dao.RelationWriteDao;
import com.se.itemservice.entity.Relation;
import com.se.itemservice.repository.RelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RelationWriteDaoImpl implements RelationWriteDao {

    private final RelationRepository relationRepository;

    @Autowired
    public RelationWriteDaoImpl(RelationRepository relationRepository) {
        this.relationRepository = relationRepository;
    }

    @Override
    public void deleteRelationByItemId1AndItemId2(Long itemId1, Long itemId2) {
        relationRepository.deleteRelationByItemId1AndItemId2(itemId1, itemId2);
    }

    @Override
    public Relation save(Relation relation) {
        return relationRepository.save(relation);
    }

    @Override
    public void deleteAllByItemId1(Long itemId) {
        relationRepository.deleteAllByItemId1(itemId);
    }

    @Override
    public void deleteAllByItemId2(Long itemId) {
        relationRepository.deleteAllByItemId2(itemId);
    }


}
