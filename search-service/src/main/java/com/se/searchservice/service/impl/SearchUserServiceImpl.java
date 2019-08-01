package com.se.searchservice.service.impl;

import com.se.searchservice.entity.User;
import com.se.searchservice.repository.ItemRepository;
import com.se.searchservice.repository.UserRepository;
import com.se.searchservice.service.SearchUserService;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

@Service
public class SearchUserServiceImpl implements SearchUserService {
    private final UserRepository userRepository;
    public SearchUserServiceImpl(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }
    public Page<User> searchUser(String keystring, Pageable pageable) {
        MatchQueryBuilder queryBuilder = new MatchQueryBuilder("username", keystring);

//        NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();
//        queryBuilder.withQuery(QueryBuilders.matchQuery("username", keystring));
//        queryBuilder.withPageable(pageable);
        return userRepository.search(queryBuilder, pageable);
    }
}
