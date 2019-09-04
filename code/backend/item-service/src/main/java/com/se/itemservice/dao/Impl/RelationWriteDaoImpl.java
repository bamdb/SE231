package com.se.itemservice.dao.Impl;

import com.se.itemservice.config.ds.DataSource;
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
    public void deleteRelationBySourceAndTarget(Long source, Long target) {
        relationRepository.deleteRelationBySourceAndTarget(source, target);
    }

    @Override
    @DataSource("master")
    public Relation save(Relation relation) {
        return relationRepository.save(relation);
    }

    @Override
    @DataSource("master")
    public void deleteAllBySource(Long itemId) {
        relationRepository.deleteAllBySource(itemId);
    }

    @Override
    @DataSource("master")
    public void deleteAllByTarget(Long itemId) {
        relationRepository.deleteAllByTarget(itemId);
    }

}
