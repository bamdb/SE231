package com.se.activityservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@CompoundIndexes({
        //name：索引名称 def：字段(1正序 -1倒序) unique：是否唯一索引
        //直接加到字段上面没用
        @CompoundIndex(name = "uq_itemid_userid", def = "{itemId:1, userId:1}", unique = true)
})
public class Progress {
    @Id
    private String id;

    private Long itemId;
    private Long userId;

    private List<Innerprogress> chapters;


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

    public List<Innerprogress> getChapters() {
        return chapters;
    }

    public void setChapters(List<Innerprogress> chapters) {
        this.chapters = chapters;
    }

    public Progress() {
    }
}
