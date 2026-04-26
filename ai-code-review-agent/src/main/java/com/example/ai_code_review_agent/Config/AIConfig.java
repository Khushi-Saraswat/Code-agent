package com.example.ai_code_review_agent.Config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {
    
     
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder){
        return builder
               .defaultSystem(
                """
                You are an expert senior software engineer
                performing code reviews. Always respond
                with valid JSON only. No extra text.    

                 """
               ).build();
    }



}
