package com.se.commentservice.dao;

import com.se.commentservice.entity.Comment;

public interface MongoDao {

    Comment findByItemIdAndUserId(Long itemId, Long userId);

    Iterable<Comment> findAllByItemId(Long itemId);

    Iterable<Comment> findAllByUserId(Long userId);

    Comment save(Comment comment);

    void deleteByItemIdAndUserId(Long itemId, Long userId);
}
