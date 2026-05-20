package com.example.ai_code_review_agent.dto.Request;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class EducationalResourceDTO {
        private String topic;
    private List<ResourceDetail> resources;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ResourceDetail {
        private String title;
        private String url;
    }

}
