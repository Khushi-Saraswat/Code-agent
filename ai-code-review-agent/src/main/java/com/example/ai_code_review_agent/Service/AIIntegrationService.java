package com.example.ai_code_review_agent.Service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
@RequiredArgsConstructor
public class AIIntegrationService {
    
    @Autowired
    private final ChatClient chatClient;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public String getReview(String code){
      try {
        return chatClient.prompt()
          .user("Extract the code from this input and review it as well find the lineStart and lineEnd: " + code)
          .call()
          .content();
      } catch (Exception e) {
        System.err.println("AI Service error: " + e.getMessage());
        // Return a fallback structured response
        return getFallbackReview(code);
      }
    }

    private String getFallbackReview(String code) {
      try {
        return objectMapper.writeValueAsString(
          objectMapper.readTree(
            """
            {
              "reviewReport": {
                "summary": "AI service temporarily unavailable. Basic analysis: Code snippet received and stored for later review.",
                "language": "unknown",
                "qualityScore": {
                  "score": 50,
                  "rating": "Pending",
                  "criticalIssues": 0,
                  "majorIssues": 0,
                  "minorIssues": 0
                },
                "issues": [
                  {
                    "type": "Warning",
                    "description": "AI service capacity exceeded. Please try again in a few moments.",
                    "line": 1
                  }
                ],
                "educationalResources": {
                  "topic": "General",
                  "resources": []
                },
                "suggestedFix": {
                  "fixedCode": "Service unavailable",
                  "notes": ["Please retry when service is available"]
                }
              }
            }
            """
          )
        );
      } catch (Exception ex) {
        return "{\"error\":\"Service unavailable\"}";
      }
    }
}








