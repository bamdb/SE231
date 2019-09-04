package com.se.commentservice.service;

import com.se.commentservice.entity.Comment;
import com.se.commentservice.entity.CommentOut;

import java.util.List;

public interface CommentService {
    Comment selectCommentByItemIdAndUserId(Long itemId, Long userId);
    List<CommentOut> selectCommentByItemId(Long itemId);
    Iterable<Comment> selectCommentByUserId(Long userId);
    Comment insertComment(Comment comment);
    void deleteCommentByItemIdAndUserId(Long itemId, Long userId);
}
