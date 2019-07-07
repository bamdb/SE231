package com.se.commentservice;

public interface CommentService {
    Comment selectCommentByItemIdAndUserId(Long itemId, Long userId);
    Iterable<Comment> selectCommentByItemId(Long itemId);
    Iterable<Comment> selectCommentByUserId(Long userId);
    Comment insertComment(Comment comment);
    void deleteCommentByItemIdAndUserId(Long itemId, Long userId);
}
