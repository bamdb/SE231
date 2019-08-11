package com.se.itemservice.entity.graph;

public class Node {
    private Long id;
    private String image;
    private String name;
    private String name_cn;
    private Long subject_id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName_cn() {
        return name_cn;
    }

    public void setName_cn(String name_cn) {
        this.name_cn = name_cn;
    }

    public Long getSubject_id() {
        return subject_id;
    }

    public void setSubject_id(Long subject_id) {
        this.subject_id = subject_id;
    }

    public Node(Long id, String image, String name, String name_cn, Long subject_id) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.name_cn = name_cn;
        this.subject_id = subject_id;
    }
}
