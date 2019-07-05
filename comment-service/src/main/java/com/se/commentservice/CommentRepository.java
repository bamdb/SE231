package com.se.commentservice;

import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface CommentRepository extends CrudRepository<Comment, String> {
    Optional<Comment> findByItemIdAndUserId(Long itemId, Long userId);
    @Transactional
    void deleteByItemIdAndUserId(Long itemId, Long userId);
    Iterable<Comment> findAllByItemId(Long itemId);
    Iterable<Comment> findAllByUserId(Long userId);
}
