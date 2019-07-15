package com.se.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.netflix.ribbon.RibbonClients;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
@EnableHystrix
@EnableCircuitBreaker
@RibbonClients(value = {
        @RibbonClient(name = "user", configuration = RibbonConfiguration.class),
        @RibbonClient(name = "image", configuration = RibbonConfiguration.class),
        @RibbonClient(name = "item", configuration = RibbonConfiguration.class),
	@RibbonClient(name = "rating", configuration = RibbonConfiguration.class),
	@RibbonClient(name = "comment", configuration = RibbonConfiguration.class),
	@RibbonClient(name = "activity", configuration = RibbonConfiguration.class),
	@RibbonClient(name = "friend", configuration = RibbonConfiguration.class),
	@RibbonClient(name = "message", configuration = RibbonConfiguration.class),
	@RibbonClient(name = "topic", configuration = RibbonConfiguration.class)
})
public class GatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
    @Bean
    @LoadBalanced
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
