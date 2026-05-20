package com.example.ai_code_review_agent.Service;

import com.example.ai_code_review_agent.dto.Request.AIReviewResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewParserService {

    public final ObjectMapper objectMapper;

    public AIReviewResponseDTO parse(String aiResponse) {
        try {
            // 1. Clean the response (Removing markdown backticks)
            String cleanJson = aiResponse.replaceAll("(?s)```json(.*?)```", "$1")
                                         .replaceAll("```", "")
                                         .trim();

            log.info("Cleaning JSON for parsing...");

            // 2. Pre-process to fix the "Summary is Object" error
            JsonNode rootNode = objectMapper.readTree(cleanJson);
            JsonNode reportNode = rootNode.get("reviewReport");

            if (reportNode != null && reportNode.has("summary")) {
                JsonNode summaryNode = reportNode.get("summary");
                
                // Agar summary ek object hai (jo error de raha hai), use String bana do
                if (summaryNode.isObject()) {
                    log.warn("AI sent summary as an object. Converting to string to prevent crash.");
                    ((ObjectNode) reportNode).put("summary", summaryNode.toString());
                }
            }

            // 3. Now safely convert to DTO
            return objectMapper.treeToValue(rootNode, AIReviewResponseDTO.class);

        } catch (Exception e) {
            log.error("CRITICAL: Parse failed! Raw response was: {}", aiResponse);
            log.error("Error Detail: {}", e.getMessage());
            return null;
        }
    }
}
