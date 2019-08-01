package com.se.searchservice.service;


import com.se.searchservice.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SearchItemService {
    Page<Item> searchItem(String keystring, Pageable pageable);
}
