package com.se.itemservice.dao;

import com.se.itemservice.entity.Relation;

public interface RelationReadDao {

    Iterable<Relation> findAllBySource(Long source);

}
