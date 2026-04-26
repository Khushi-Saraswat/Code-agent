package com.example.ai_code_review_agent.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ai_code_review_agent.dto.Request.ReviewFindingDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewParserService {


   public final ObjectMapper objectMapper;

   public List<ReviewFindingDTO> parse(String aiResponse){

      try {
            String json = extractJson(aiResponse);
            return objectMapper.readValue(json,
                new TypeReference<List<ReviewFindingDTO>>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }



   }



     private String extractJson(String raw) {
        int start = raw.indexOf('[');
        int end   = raw.lastIndexOf(']');
        if (start == -1 || end == -1)
            throw new RuntimeException("No JSON array found");
        return raw.substring(start, end + 1);
    }
    
}
