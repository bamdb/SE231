package com.se.searchservice.repository;

import com.se.searchservice.entity.Item;
import com.se.searchservice.entity.User;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserRepository extends ElasticsearchRepository<User, Long> {

}
