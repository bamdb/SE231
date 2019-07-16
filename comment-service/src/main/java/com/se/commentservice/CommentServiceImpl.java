package com.se.commentservice;

import com.se.commentservice.entity.Comment;
import com.se.commentservice.entity.CommentOut;
import com.se.commentservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private final
    CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Autowired
    UserClient userClient;

    public Comment selectCommentByItemIdAndUserId(Long itemId, Long userId) {
        return commentRepository.findByItemIdAndUserId(itemId, userId).orElse(null);
    }

    public List<CommentOut> selectCommentByItemId(Long itemId) {
        Iterable<Comment> it = commentRepository.findAllByItemId(itemId);
        Iterator<Comment> commentIterator = it.iterator();
        List<CommentOut> commentOuts = new ArrayList<>();
        while (commentIterator.hasNext()) {
            Comment comment = commentIterator.next();
            User user = userClient.getUserById(comment.getUserId());
            CommentOut commentOut = new CommentOut();
            commentOut.setComment(comment);
            commentOut.setUser(user);
            commentOuts.add(commentOut);
        }
        return commentOuts;
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
