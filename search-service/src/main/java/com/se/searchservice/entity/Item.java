package com.se.searchservice.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;

@Document(indexName = "item", type = "doc")
public class Item {
    @Id
    private Long  id;
    @Field(type = FieldType.Text, analyzer = "ik_max_word")
    private String itemname;
    @Field(type = FieldType.Text, analyzer = "ik_max_word")
    private String main_author;
    public Item(Long id, String itemname, String main_author) {
        this.id = id;
        this.main_author = main_author;
        this.itemname = itemname;
    }

    public Item() {

    }

    public void setMain_author(String main_author) {
        this.main_author = main_author;
    }

    public String getMain_author() {
        return main_author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemname() {
        return itemname;
    }

    public void setItemname(String itemname) {
        this.itemname = itemname;
    }
}
