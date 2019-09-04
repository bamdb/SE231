package com.se.itemservice.repository;

import com.se.itemservice.entity.Itemtag;
import com.se.itemservice.entity.graph.Root;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface RootRepository  extends CrudRepository<Root, String> {
    Optional<Root> findByItemId(Long itemId);
    @Transactional
    void deleteByItemId(Long itemId);
}
