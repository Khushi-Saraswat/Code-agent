package com.example.ai_code_review_agent.dto.Request;

import lombok.Data;
import com.example.ai_code_review_agent.dto.Enum.Severity;
import com.example.ai_code_review_agent.dto.Enum.Type;

@Data
public class ReviewFindingDTO {
    


    private Type type;

    private Severity severity;

    private String message;

    private Integer lineNumber;

    private String suggestion;

}
