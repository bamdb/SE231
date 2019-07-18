package com.se.itemservice.dao;

import com.se.itemservice.entity.Relation;

public interface RelationReadDao {

    Iterable<Relation> findAllByItemId1(Long itemId);

    Iterable<Relation> findAllByItemId2(Long itemId);
}
