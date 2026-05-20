package com.example.ai_code_review_agent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.google.gson.Gson;
@SpringBootApplication
public class AiCodeReviewAgentApplication {

	public static void main(String[] args) {
		
		SpringApplication.run(AiCodeReviewAgentApplication.class, args);
		System.out.println("I am a code agent..");
	}

	@Bean
    public Gson gson() {
        return new com.google.gson.GsonBuilder()
                .setPrettyPrinting()
                .create();
    }

}
