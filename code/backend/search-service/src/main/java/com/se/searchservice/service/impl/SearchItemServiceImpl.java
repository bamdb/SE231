package com.se.searchservice.service.impl;

import com.se.searchservice.entity.Item;
import com.se.searchservice.repository.ItemRepository;
import com.se.searchservice.service.SearchItemService;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SearchItemServiceImpl implements SearchItemService {
    private final
    ItemRepository itemRepository;

    public SearchItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public Page<Item> searchItem(String keystring, Pageable pageable) {
        MultiMatchQueryBuilder queryBuilder =
                new MultiMatchQueryBuilder(keystring, "itemname", "main_author");
//        NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();
//        queryBuilder.withQuery(QueryBuilders.matchQuery("itemname", keystring));
//        queryBuilder.withHighlightFields(new Flied);
//        queryBuilder.withPageable(pageable);
        Page<Item> items = itemRepository.search(queryBuilder, pageable);
        return items;
    }
}
