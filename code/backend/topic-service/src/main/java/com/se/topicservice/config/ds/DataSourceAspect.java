package com.se.topicservice.config.ds;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
public class DataSourceAspect {
    @Before("@annotation(com.se.topicservice.config.ds.DataSource)")
    public void beforeSwitchDS(JoinPoint point) throws Exception{

        Class<?> className = point.getTarget().getClass();

        String methodName = point.getSignature().getName();
        Class[] argClass = ((MethodSignature)point.getSignature()).getParameterTypes();

        Method method = className.getMethod(methodName, argClass);

        DataSource annotation = method.getAnnotation(DataSource.class);
        String dataSource = annotation.value();

        DynamicDataSourceHolder.putDataSource(dataSource);
    }


    @After("@annotation(com.se.topicservice.config.ds.DataSource)")
    public void afterSwitchDS(JoinPoint point){
        DynamicDataSourceHolder.clearDataSource();
    }
}
