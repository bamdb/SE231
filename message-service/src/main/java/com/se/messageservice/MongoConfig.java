package com.se.messageservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Configuration
public class MongoConfig {

    @Bean
    public MongoCustomConversions customConversions(){
        List<Converter<?,?>> converters = new ArrayList<>();
        converters.add(TimeConverter.INSTANCE);
        return new MongoCustomConversions(converters);
    }

    @WritingConverter
    public enum TimeConverter implements Converter<Date, Timestamp> {
        INSTANCE;
        @Override
        public Timestamp convert(Date date) {
            return new Timestamp(date.getTime());
        }
    }
}