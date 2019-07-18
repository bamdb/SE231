package com.se.activityservice.repository;

import com.se.activityservice.entity.Activity;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface ActivityRepository extends CrudRepository<Activity, Long> {
    Iterable<Activity> findAllByUserId(Long userId);

    Iterable<Activity> findAllByItemId(Long itemId);

    @Query("select * from activity where item_id=?2 and user_id=?1 and act_time = (select max(act_time) from activity where item_id=?2 and user_id=?1)")
    Optional<Activity> findCollectByUserIdAndItemId(Long userId, Long itemId);

    @Transactional
    void deleteAllByUserId(Long userId);

    @Transactional
    void deleteAllByItemId(Long itemId);
}
