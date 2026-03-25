package com.example.resume_analyzer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class ResumeAnalyzerApplication {

	public static void main(String[] args) {

		SpringApplication.run(ResumeAnalyzerApplication.class, args);
		System.out.println("Spring Boot started. PdfService ready.");

	}
	@Bean
	public WebClient.Builder webClientBuilder() {
		return WebClient.builder();
	}

}
