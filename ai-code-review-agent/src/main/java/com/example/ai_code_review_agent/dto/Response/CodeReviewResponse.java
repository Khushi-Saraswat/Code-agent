package com.example.ai_code_review_agent.dto.Response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.example.ai_code_review_agent.dto.Enum.Severity;
import com.example.ai_code_review_agent.dto.Enum.Type;
import com.example.ai_code_review_agent.dto.Request.ReviewFindingDTO;

import lombok.Data;

@Data
public class CodeReviewResponse {
    private Long submissionId;

    private Integer score;

    private String summary;

    private List<ReviewFindingDTO> findings;

    private LocalDateTime createdAt;

}
