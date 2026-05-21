package com.example.ai_code_review_agent.dto.Request;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReviewFindingDTO {
    
   // AI "type" bhejta hai
    @JsonAlias({"type", "category"})
    private String type;

    private String severity;
    private Integer lineStart;
    private Integer lineEnd;
    private String description;
    private String suggestedFix;

}
