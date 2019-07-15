package com.se.itemservice.repository;

import com.se.itemservice.entity.Item;
import com.se.itemservice.entity.Itemtag;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ItemtagRepository extends CrudRepository<Itemtag, String> {
    @Query("{'itemId':?0},{'tags':{$elemMatch:{'tagname':?1}}}")
    Optional<Itemtag> findByItemIdAndTagname(String itemId, String tagname);
}
