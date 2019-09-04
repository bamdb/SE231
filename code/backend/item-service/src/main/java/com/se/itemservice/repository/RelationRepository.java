package com.se.itemservice.repository;

import com.se.itemservice.entity.Relation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RelationRepository extends CrudRepository<Relation, Long> {
    Iterable<Relation> findAllBySource(Long Source);
    Iterable<Relation> findAllByTarget(Long target);
    @Transactional
    void deleteRelationBySourceAndTarget(Long source, Long target);
    @Transactional
    void deleteAllBySource(Long source);
    @Transactional
    void deleteAllByTarget(Long target);
}
