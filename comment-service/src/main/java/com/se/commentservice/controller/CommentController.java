package com.se.commentservice.controller;

import com.se.commentservice.service.CommentService;
import com.se.commentservice.entity.Comment;
import com.se.commentservice.entity.CommentOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }


    @GetMapping(value="/", produces="application/json")
    public Comment getCommentById(@RequestParam("itemId") Long itemId,
                                  @RequestParam("userId") Long userId) {
        return commentService.selectCommentByItemIdAndUserId(itemId, userId);
    }

    @GetMapping(value="/userid/{userId}", produces="application/json")
    public Iterable<Comment> getCommentByUserId(@PathVariable("userId") Long userId) {
        return commentService.selectCommentByUserId(userId);
    }

    @GetMapping(value="/itemid/{itemId}", produces="application/json")
    public List<CommentOut> getCommentByItemId(@PathVariable("itemId") Long itemId) {
        return commentService.selectCommentByItemId(itemId);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCommentByID(@RequestParam("itemId") Long itemId,
                                               @RequestParam("userId") Long userId) {
        commentService.deleteCommentByItemIdAndUserId(itemId, userId);
        return ResponseEntity.ok().body("Delete item successfully!");
    }

    @PostMapping("/insert")
    public Comment insertComment(@RequestBody Comment comment) {
        return commentService.insertComment(comment);
    }

}
