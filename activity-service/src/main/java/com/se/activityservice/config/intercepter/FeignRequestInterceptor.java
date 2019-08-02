package com.se.activityservice.config.intercepter;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import javax.servlet.http.HttpServletRequest;

@Configuration
public class FeignRequestInterceptor implements RequestInterceptor {
    @Autowired
    HttpServletRequest httpServletRequest;

    public static String accessToken;

    public FeignRequestInterceptor() {
    }
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header("Authorization", accessToken);
        accessToken = "";
    }
}