package com.se.itemservice.repository;

import com.se.itemservice.entity.Relation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RelationRepository extends CrudRepository<Relation, Long> {
    Iterable<Relation> findAllByItemId1(Long itemId1);
    Iterable<Relation> findAllByItemId2(Long itemId2);
    @Transactional
    void deleteRelationByItemId1AndItemId2(Long itemId1, Long itemId2);
    @Transactional
    void deleteAllByItemId1(Long itemId1);
    @Transactional
    void deleteAllByItemId2(Long itemId2);
}
