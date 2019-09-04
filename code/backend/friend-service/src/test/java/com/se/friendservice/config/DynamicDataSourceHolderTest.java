package com.se.friendservice.config;

import com.se.friendservice.config.ds.DynamicDataSourceHolder;
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
