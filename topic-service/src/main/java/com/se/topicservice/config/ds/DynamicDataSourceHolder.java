package com.se.topicservice.config.ds;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DynamicDataSourceHolder {
    public static final Logger log = LoggerFactory.getLogger(DynamicDataSourceHolder.class);

    public static final String DEFAULT_DS = "master";

    private static final ThreadLocal<String> holder = new ThreadLocal<>();

    public static void putDataSource(String dataSourceType) {
        log.info("change data source to {}", dataSourceType);
        holder.set(dataSourceType);
    }

    public static String getDataSource() {
        return holder.get();
    }

    public static void clearDataSource() {
        log.info("recover datasource");
        holder.remove();
        log.info("after recover datasource change to {}", holder.get());
    }
}
