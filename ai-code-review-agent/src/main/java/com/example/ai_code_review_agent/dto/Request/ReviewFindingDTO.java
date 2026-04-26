package com.example.ai_code_review_agent.dto.Request;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import com.example.ai_code_review_agent.dto.Enum.Type;
import com.example.ai_code_review_agent.dto.Enum.Severity;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewFindingDTO {
    
    private Type category; 
    private Severity severity;
    private Integer lineStart;
    private Integer lineEnd;
    private String description;
    private String suggestedFix;

}
