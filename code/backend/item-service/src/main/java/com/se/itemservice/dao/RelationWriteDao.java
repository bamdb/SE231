package com.se.itemservice.dao;

import com.se.itemservice.entity.Relation;

public interface RelationWriteDao {

    void deleteRelationBySourceAndTarget(Long source, Long target);

    Relation save(Relation relation);

    void deleteAllBySource(Long source);

    void deleteAllByTarget(Long target);
}
