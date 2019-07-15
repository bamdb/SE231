package com.se.activityservice.repository;

import com.se.activityservice.entity.Progress;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProgressRepository extends CrudRepository<Progress, String> {
    Optional<Progress> findByItemIdAndUserId(Long itemId, Long userId);
}
