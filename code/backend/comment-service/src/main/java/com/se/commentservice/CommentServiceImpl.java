package com.se.commentservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    private final
    CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment selectCommentByItemIdAndUserId(Long itemId, Long userId) {
        return commentRepository.findByItemIdAndUserId(itemId, userId).orElse(null);
    }
    public Iterable<Comment> selectCommentByItemId(Long itemId) {
        Iterable<Comment> it = commentRepository.findAllByItemId(itemId);
        return it.iterator().hasNext()? it: null;
    }
    public Iterable<Comment> selectCommentByUserId(Long userId) {
        Iterable<Comment> it = commentRepository.findAllByUserId(userId);
        return it.iterator().hasNext()? it: null;
    }
    public Comment insertComment(Comment comment) {
        return commentRepository.save(comment);
    }
    public void deleteCommentByItemIdAndUserId(Long itemId, Long userId) {
        commentRepository.deleteByItemIdAndUserId(itemId, userId);
    }
}
