package com.se.messageservice;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;


import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Timestamp;

@Document
@CompoundIndexes({
        @CompoundIndex(name = "index", def = "{'senderId' : 1, 'receiverId': 1, 'sendTime': 1}", unique = true)
})
public class Message {
    @Id
    private String id;
    private Long senderId;
    private Long receiverId;
//    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp sendTime;
    private String content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public Timestamp getSendTime() {
        return sendTime;
    }

    public void setSendTime(Timestamp sendTime) {
        this.sendTime = sendTime;
    }

    public String getContent() {
        return content;
    }

    public Message(String id, Long senderId, Long receiverId, Timestamp sendTime, String content) {
        setId(id);
        setContent(content);
        setReceiverId(receiverId);
        setSenderId(senderId);
        setSendTime(sendTime);
    }

    public Message(Long senderId, Long receiverId, Timestamp sendTime, String content) {
        setContent(content);
        setReceiverId(receiverId);
        setSenderId(senderId);
        setSendTime(sendTime);
    }
    public Message() {
    }

    public void setContent(String content) {
        this.content = content;
    }
}
