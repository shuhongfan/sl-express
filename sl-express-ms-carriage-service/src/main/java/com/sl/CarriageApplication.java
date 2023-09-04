package com.sl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class CarriageApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarriageApplication.class, args);
    }

}
