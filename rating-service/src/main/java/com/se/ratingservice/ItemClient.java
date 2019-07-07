package com.se.ratingservice;

import com.se.ratingservice.entity.Item;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name = "item-service",
        fallback = ItemClientFallback.class,
        qualifier = "itemClient")
public interface ItemClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    Item getItemById(@PathVariable("id") Long itemId);

    @RequestMapping(value="/delete/id/{id}")
    void deleteItemById(@PathVariable("id") Long itemId);

    @RequestMapping(value = "/add")
    Item postItem(@RequestBody Item item);
}
