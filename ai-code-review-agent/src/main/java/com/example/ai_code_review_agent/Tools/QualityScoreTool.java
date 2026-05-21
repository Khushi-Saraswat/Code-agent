package com.example.ai_code_review_agent.Tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

@Component
public class QualityScoreTool {
    
    @Tool(name = "QualityScoreTool", description = "Evaluate the quality of the given code snippet and return a score between 0 and 100.")
    public String calculateQualityScore(int critical,int major,int minor) {
        // Here you would implement the logic to evaluate the code quality
        // For demonstration purposes, we will return a dummy response
       // return "85"; // Replace with actual quality evaluation logic

        int baseScore = 100;
        int deductions = (critical * 25) + (major * 10) + (minor * 5);
        int finalScore = Math.max(0, baseScore - deductions);

        String rating = (finalScore >= 80) ? "Excellent" : (finalScore >= 50) ? "Average" : "Poor";

        System.out.println("quality score tool called with critical: " + critical + ", major: " + major + ", minor: " + minor + " resulting in score: " + finalScore + " and rating: " + rating);
        
        // Result format for AI to read
        return String.format("Score: %d/100, Rating: %s", finalScore, rating);

    }
}
