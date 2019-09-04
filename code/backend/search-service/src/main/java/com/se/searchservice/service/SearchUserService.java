package com.se.searchservice.service;

import com.se.searchservice.entity.Item;
import com.se.searchservice.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchUserService {
    Page<User> searchUser(String keystring, Pageable pageable);
}
