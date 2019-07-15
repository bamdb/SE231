package com.se.activityservice.entity;

import java.util.List;

public class Innerprogress {
    private Boolean finish;
    private List<Boolean> sections;

    public Boolean getFinish() {
        return finish;
    }

    public void setFinish(Boolean finish) {
        this.finish = finish;
    }

    public List<Boolean> getSections() {
        return sections;
    }

    public void setSections(List<Boolean> sections) {
        this.sections = sections;
    }

}
