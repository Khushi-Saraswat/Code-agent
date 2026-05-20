package com.example.ai_code_review_agent.dto.Request;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AIReviewResponseDTO {
    private ReviewReportDTO reviewReport;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ReviewReportDTO {
        private String language;
        private String summary;
        private Integer lineStart;
        private Integer lineEnd;
        private QualityScoreDTO qualityScore;
        private List<ReviewFindingDTO> issues;
        private EducationalResourcesWrapper educationalResources;
        
        @JsonProperty("suggestedFix") // JSON ke 'suggestedFix' se map karne ke liye
        private SuggestedFixDTO suggestedFix;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class QualityScoreDTO {
        private Integer score;
        private String rating;
        private Integer criticalIssues;
        private Integer majorIssues;
        private Integer minorIssues;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ReviewFindingDTO {
        private String type;
        private Integer line;         // 'lineStart' ki jagah 'line'
        private String description;   // 'issue' ki jagah 'description'
        private String severity;      // Naya field severity
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class EducationalResourcesWrapper {
        private String topic;         // Naya field topic
        private List<EducationalResourceDTO> resources;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class EducationalResourceDTO {
        private String title;
        private String url;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SuggestedFixDTO {
        private String fixedCode;
        private List<String> notes;   // Notes ab List<String> hai
    }
}
