package com.se.activityservice.client;

import com.se.activityservice.entity.Item;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@FeignClient(name = "item",
        fallback = ItemClientFallback.class,
        qualifier = "itemClient")
public interface ItemClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    Item getItemById(@PathVariable("id") Long itemId);

    @RequestMapping(value="/delete/id/{id}")
    void deleteItemById(@PathVariable("id") Long id);
}