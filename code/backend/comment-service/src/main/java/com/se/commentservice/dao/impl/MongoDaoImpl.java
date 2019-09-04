package com.se.commentservice.dao.impl;

import com.se.commentservice.dao.MongoDao;
import com.se.commentservice.entity.Comment;
import com.se.commentservice.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MongoDaoImpl implements MongoDao {
    private final
    CommentRepository commentRepository;

    @Autowired
    public MongoDaoImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public void deleteByItemIdAndUserId(Long itemId, Long userId) {
        commentRepository.deleteByItemIdAndUserId(itemId, userId);
    }

    @Override
    public Comment findByItemIdAndUserId(Long itemId, Long userId) {
        return commentRepository.findByItemIdAndUserId(itemId, userId).orElse(null);
    }

    @Override
    public Iterable<Comment> findAllByItemId(Long itemId) {
        return commentRepository.findAllByItemId(itemId);
    }

    @Override
    public Iterable<Comment> findAllByUserId(Long userId) {
        return commentRepository.findAllByUserId(userId);
    }

    @Override
    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

}
