package com.se.activityservice.config;

import com.se.activityservice.config.ds.DynamicDataSource;
import com.se.activityservice.config.ds.DynamicDataSourceHolder;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

public class DynamicDataSourceHolderTest {
    @Test
    public void testUserInfoTokenServices() {
        DynamicDataSourceHolder dynamicDataSourceHolder = new DynamicDataSourceHolder();
        DynamicDataSourceHolder.putDataSource("master");
        DynamicDataSourceHolder.getDataSource();
        DynamicDataSourceHolder.clearDataSource();
    }
}
