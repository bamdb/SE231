package com.se.topicservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class TopicPage {
    @Id
    private String id;

    private String topicContent;

    private List<Reply> replyList;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTopicContent() {
        return topicContent;
    }

    public void setTopicContent(String topicContent) {
        this.topicContent = topicContent;
    }

    public List<Reply> getReplyList() {
        return replyList;
    }

    public void setReplyList(List<Reply> replyList) {
        this.replyList = replyList;
    }

}
