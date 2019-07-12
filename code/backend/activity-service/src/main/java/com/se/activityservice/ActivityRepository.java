package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ActivityRepository extends CrudRepository<Activity, Long> {
    Iterable<Activity> findAllByUserId(Long userId);
    Iterable<Activity> findAllByItemId(Long itemId);
    @Transactional
    void deleteAllByUserId(Long userId);
    @Transactional
    void deleteAllByItemId(Long itemId);
}
