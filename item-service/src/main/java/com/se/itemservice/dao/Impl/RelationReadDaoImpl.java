package com.se.itemservice.dao.Impl;

import com.se.itemservice.config.ds.DataSource;
import com.se.itemservice.dao.RelationReadDao;
import com.se.itemservice.entity.Relation;
import com.se.itemservice.repository.RelationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RelationReadDaoImpl implements RelationReadDao {

    private final RelationRepository relationRepository;

    @Autowired
    public RelationReadDaoImpl(RelationRepository relationRepository) {
        this.relationRepository = relationRepository;
    }

    @Override
    @DataSource("slave")
    public Iterable<Relation> findAllBySource(Long source) {
        return relationRepository.findAllBySource(source);
    }

    @Override
    @DataSource("slave")
    public Iterable<Relation> findAllByTarget(Long target) {
        return relationRepository.findAllByTarget(target);
    }

}
