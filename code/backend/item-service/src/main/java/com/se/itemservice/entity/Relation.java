package com.se.itemservice.entity;

import javax.persistence.*;

@Entity
@Table(name = "Relation")
public class Relation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "prior", nullable = false)
    private Long itemId1;
    @Column(name = "subsequent", nullable = false)
    private Long itemId2;
    @Column(name = "relate_type", nullable = false)
    private boolean relateType;

    public Long getId() {
        return id;
    }

    public Long getItemId1() {
        return itemId1;
    }

    public void setItemId1(Long itemId1) {
        this.itemId1 = itemId1;
    }

    public Long getItemId2() {
        return itemId2;
    }

    public void setItemId2(Long itemId2) {
        this.itemId2 = itemId2;
    }

    public boolean isRelateType() {
        return relateType;
    }

    public void setRelateType(boolean relateType) {
        this.relateType = relateType;
    }
}
