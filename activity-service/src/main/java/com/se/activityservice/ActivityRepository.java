package com.se.activityservice;

import com.se.activityservice.entity.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ActivityRepository extends CrudRepository<Activity, Long> {
    Optional<Activity> findByUserId(Long userId);
    Optional<Activity> findByItemId(Long itemId);
}
