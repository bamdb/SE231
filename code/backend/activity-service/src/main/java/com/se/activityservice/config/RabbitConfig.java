package com.se.activityservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
public class RabbitConfig{
    @Bean
    public Queue newQueue() {
        return new Queue("activity");
    }

    @Bean
    DirectExchange exchange() {
        return new DirectExchange("bamdb");
    }

    @Bean
    Binding binding(Queue queue, DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with("activity");
    }

}
