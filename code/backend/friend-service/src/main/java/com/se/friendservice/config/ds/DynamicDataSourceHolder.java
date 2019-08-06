package com.se.friendservice.config.ds;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DynamicDataSourceHolder {
    public static final Logger log = LoggerFactory.getLogger(DynamicDataSourceHolder.class);

    private static final ThreadLocal<String> holder = new ThreadLocal<>();

    public static void putDataSource(String dataSourceType) {
        System.out.println("change data source to");
        System.out.println(dataSourceType);
        holder.set(dataSourceType);
    }

    public static String getDataSource() {
        return holder.get();
    }

    public static void clearDataSource() {
        log.info("recover datasource");
        holder.remove();
        log.info("after recover datasource change to");
        System.out.println(holder.get());
    }
}
