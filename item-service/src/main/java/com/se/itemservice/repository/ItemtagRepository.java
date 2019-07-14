package com.se.itemservice.repository;

import com.se.itemservice.entity.Itemtag;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ItemtagRepository extends CrudRepository<Itemtag, String> {
    @Query()
}
