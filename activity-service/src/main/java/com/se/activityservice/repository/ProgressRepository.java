package com.se.activityservice.repository;

import com.se.activityservice.entity.Progress;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface ProgressRepository extends CrudRepository<Progress, String> {
    Optional<Progress> findByItemIdAndUserId(Long itemId, Long userId);
}
