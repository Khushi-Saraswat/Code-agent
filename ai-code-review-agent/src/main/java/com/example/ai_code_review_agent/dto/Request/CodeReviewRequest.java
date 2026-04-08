package com.example.ai_code_review_agent.dto.Request;

import lombok.Data;

@Data
public class CodeReviewRequest {
    private String code;

    private String language;

    private String filename;

    private String userNotes;


}
