package com.se.itemservice.config;

import com.se.itemservice.config.ds.DynamicDataSourceHolder;
import org.junit.Test;

public class DynamicDataSourceHolderTest {
    @Test
    public void testUserInfoTokenServices() {
        DynamicDataSourceHolder dynamicDataSourceHolder = new DynamicDataSourceHolder();
        DynamicDataSourceHolder.putDataSource("master");
        DynamicDataSourceHolder.getDataSource();
        DynamicDataSourceHolder.clearDataSource();
    }
}
