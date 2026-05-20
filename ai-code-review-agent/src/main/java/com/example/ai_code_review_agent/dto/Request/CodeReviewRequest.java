package com.example.ai_code_review_agent.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


@Data
public class CodeReviewRequest {
    
    @NotBlank(message = "Code cannot be empty")
    private String code;


}
