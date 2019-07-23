package com.se.friendservice.config.ds;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
@Inherited
public @interface DataSource {
    /**
     * 数据库路由
     */
    String value() default "master";
}