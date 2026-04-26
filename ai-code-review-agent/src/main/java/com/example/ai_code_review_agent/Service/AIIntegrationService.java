package com.example.ai_code_review_agent.Service;

import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AIIntegrationService {
    

    private final ChatClient chatClient;


    


    public String getReview(String code,String language){

     


      String prompt = """
        You are a senior software engineer performing a code review.

        Analyze the following %s code and return findings ONLY as
        a valid JSON array. No text outside the JSON.

        Each finding must have exactly these fields:
        - category: Bug | Security | Style | Performance
        - severity: Critical | Major | Minor | Info
        - lineStart: integer
        - lineEnd: integer
        - description: clear explanation
        - suggestedFix: corrected code or guidance

        Code to review:
        %s

        Return ONLY JSON array. Empty array [] if no issues.
        """.formatted(language, code);


        return chatClient.prompt(prompt)
               .call()
               .content();



    }







}
