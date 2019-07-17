package com.se.topicservice.config.ds;

public class DynamicDataSourceHolder {

    private static final ThreadLocal<String> holder = new ThreadLocal<>();

    public static void putDataSource(String dataSourceType) {
        holder.set(dataSourceType);
    }

    public static String getDataSource() {
        return holder.get();
    }
}
