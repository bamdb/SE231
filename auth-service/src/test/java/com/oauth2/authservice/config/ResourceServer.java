package com.oauth2.authservice.config;

import org.junit.Test;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.test.context.ActiveProfiles;

@EnableResourceServer
@TestConfiguration
public class ResourceServer extends ResourceServerConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http    .authorizeRequests()
                .anyRequest().permitAll();
    }
    @Override
    public void configure(ResourceServerSecurityConfigurer security) throws Exception {
        security.stateless(false);
    }
}
