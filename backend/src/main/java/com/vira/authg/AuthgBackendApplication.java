package com.vira.authg;

import com.vira.authg.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class AuthgBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthgBackendApplication.class, args);
	}
	
}
