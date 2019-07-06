package com.se.ratingservice;

import com.se.ratingservice.entity.Item;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Component
@FeignClient(name = "item-service")
public interface ItemClient {
    @RequestMapping(value="/id/{id}", method= RequestMethod.GET)
    Item getItemById(@PathVariable("id") Long itemId);

    @RequestMapping(value="/all", method= RequestMethod.GET)
    Iterable<Item> getAllUsers();
}
