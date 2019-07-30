package com.se.searchservice.repository;
import com.se.searchservice.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
public interface ItemRepository extends ElasticsearchRepository<Item, Long> {

    Page<Item> findByItemname(String name, Pageable pageable);
//    @Query("{\"bool\": {\"must\": [{\"match\": {\"authors.name\": \"?0\"}}]}}")
//    Page<Item> findByAuthorsNameUsingCustomQuery(String name, Pageable pageable);
}
