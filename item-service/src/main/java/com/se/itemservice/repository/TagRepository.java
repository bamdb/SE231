package com.se.itemservice.repository;

import com.se.itemservice.entity.Tag;
import org.springframework.data.repository.CrudRepository;

public interface TagRepository extends CrudRepository<Tag, String> {
}
