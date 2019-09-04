package com.se.itemservice.entity.graph;

public class Edge {
    private String id;
    private String relation;
    private boolean removed;
    private Long source;
    private Long target;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public boolean isRemoved() {
        return removed;
    }

    public void setRemoved(boolean removed) {
        this.removed = removed;
    }

    public Long getSource() {
        return source;
    }

    public void setSource(Long source) {
        this.source = source;
    }

    public Long getTarget() {
        return target;
    }

    public void setTarget(Long target) {
        this.target = target;
    }

    public Edge(String id, String relation, boolean removed, Long source, Long target) {
        this.id = id;
        this.relation = relation;
        this.removed = removed;
        this.source = source;
        this.target = target;
    }

    public Edge() {}
}
