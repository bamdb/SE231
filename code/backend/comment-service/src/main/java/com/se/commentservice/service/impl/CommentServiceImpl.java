package com.se.commentservice.service.impl;

import com.se.commentservice.dao.MongoDao;
import com.se.commentservice.repository.CommentRepository;
import com.se.commentservice.client.UserClient;
import com.se.commentservice.entity.Comment;
import com.se.commentservice.entity.CommentOut;
import com.se.commentservice.entity.User;
import com.se.commentservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Resource(name="mongoDaoImpl")
    private MongoDao mongoDao;

    @Autowired
    UserClient userClient;

    public Comment selectCommentByItemIdAndUserId(Long itemId, Long userId) {
        return mongoDao.findByItemIdAndUserId(itemId, userId);
    }

    public List<CommentOut> selectCommentByItemId(Long itemId) {
        Iterable<Comment> it = mongoDao.findAllByItemId(itemId);
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
        Iterable<Comment> it = mongoDao.findAllByUserId(userId);
        return it.iterator().hasNext()? it: null;
    }

    public Comment insertComment(Comment comment) {
        return mongoDao.save(comment);
    }

    public void deleteCommentByItemIdAndUserId(Long itemId, Long userId) {
        mongoDao.deleteByItemIdAndUserId(itemId, userId);
    }
}
