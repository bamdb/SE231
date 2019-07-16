package com.se.activityservice.entity;

import java.sql.Timestamp;

public class ActivityOut {
    private Activity activity;
    private Item item;

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

}
