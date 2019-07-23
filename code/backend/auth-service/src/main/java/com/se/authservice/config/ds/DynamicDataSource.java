package com.se.authservice.config.ds;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class DynamicDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        if (DynamicDataSourceHolder.getDataSource() != null) {
            return DynamicDataSourceHolder.getDataSource();
        }
        return "master";
    }
}
