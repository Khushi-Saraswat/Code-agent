package com.example.ai_code_review_agent.dto.Response;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ReviewHistoryDTO {
    private Long reviewId;

    private Long submissionId;

    private String language;

    private Integer score;

    private String summary;

    private LocalDateTime reviewedAt;

}
