package com.se.commentservice;

import org.springframework.data.annotation.Id;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import java.sql.Timestamp;

@Document
@CompoundIndexes({
        @CompoundIndex(name = "index", def = "{'itemId' : 1, 'userId': 1}", unique = true)
})
public class Comment {
    @Id
    private String id;
    private Long itemId;
    private Long userId;
    private Timestamp pubTime;
    private String content;
    public Comment() {
    }

    public Comment(Long itemId, Long userId, Timestamp pubTime, String content) {
        setItemId(itemId);
        setContent(content);
        setPubTime(pubTime);
        setUserId(userId);
    }

    public Comment(String id, Long itemId, Long userId, Timestamp pubTime, String content) {
        setItemId(itemId);
        setContent(content);
        setPubTime(pubTime);
        setId(id);
        setUserId(userId);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Timestamp getPubTime() {
        return pubTime;
    }

    public void setPubTime(Timestamp pubTime) {
        this.pubTime = pubTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
