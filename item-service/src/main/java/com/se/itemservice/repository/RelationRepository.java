package com.se.itemservice.repository;

import com.se.itemservice.entity.Relation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RelationRepository extends CrudRepository<Relation, Long> {
    Iterable<Relation> findAllByItemId1(Long itemId1);
    Iterable<Relation> findAllByItemId2(Long itemId2);
}
