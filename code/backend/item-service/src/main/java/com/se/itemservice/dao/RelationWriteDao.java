package com.se.itemservice.dao;

import com.se.itemservice.entity.Relation;

public interface RelationWriteDao {

    void deleteRelationByItemId1AndItemId2(Long itemId1, Long itemId2);

    Relation save(Relation relation);

    void deleteAllByItemId1(Long itemId);

    void deleteAllByItemId2(Long itemId);
}
