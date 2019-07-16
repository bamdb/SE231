package com.oauth2.authservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.stereotype.Component;

/* A necessity if you want expression #oauth2.hasScope to work!
 * And also some endpoints depend on the config, e.g usrinfo.
 **/
@EnableResourceServer
@Configuration
public class ResourceServer extends ResourceServerConfigurerAdapter {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        http    .authorizeRequests()
                .antMatchers("/user").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/exit/**").access("#oauth2.hasScope('server')")
                .anyRequest().authenticated();
    }
}

