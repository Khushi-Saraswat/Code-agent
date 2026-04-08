package com.example.ai_code_review_agent.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_code_review_agent.Service.CodeReviewService;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;
import com.example.ai_code_review_agent.dto.Response.ReviewHistoryDTO;

@RestController
@RequestMapping("/api/review/history")
public class ReviewCodeHistory {


    @Autowired
    private CodeReviewService codeReviewService;

    
    @GetMapping("/")
     public ResponseEntity<List<ReviewHistoryDTO>> reviewCode() {
        List<ReviewHistoryDTO> response = codeReviewService.getHistory();
        return ResponseEntity.ok(response);
    }


    @GetMapping("/review/id")
    public ResponseEntity<CodeReviewResponse>reviewById(@RequestBody Long reviewId) {
        CodeReviewResponse response = codeReviewService.getReviewDetails(reviewId);
        return ResponseEntity.ok(response);
    }



}
