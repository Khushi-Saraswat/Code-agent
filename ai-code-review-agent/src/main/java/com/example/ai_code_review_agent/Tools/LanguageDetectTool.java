package com.example.ai_code_review_agent.Tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Component
public class LanguageDetectTool {



    @Autowired
    private RestTemplate restTemplate; // final और new RestTemplate() हटा दिया

    
    @Value("${apihub.api.key}")
    private String apihub;

    @Tool(description = "Detect the programming language of the given code snippet.")
    public String detectLanguage(String codeSnippet) {
        // Correct ApyHub API Endpoint for Language Detection
        String url = "https://apyhub.com/api/v1/lang/detect";

        // 1. Correct Spring HttpHeaders (NOT java.net.http)
        HttpHeaders headers = new HttpHeaders();
        headers.set("apy-token", apihub); // Apna Token yahan daalein
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 2. Body setup
        Map<String, String> body = new HashMap<>();
        body.put("content", codeSnippet);

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        try {
            // 3. Using ResponseEntity from org.springframework.http
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                // ApyHub response format handle karein
                Map<String, Object> data = (Map<String, Object>) response.getBody().get("data");
                if (data != null && data.containsKey("language")) {
                    return (String) data.get("language");
                }
            }
        } catch (Exception e) {
            System.err.println("ApyHub API Error: " + e.getMessage());
            return "Unknown";
        }
        return "Unknown";
    }
}
