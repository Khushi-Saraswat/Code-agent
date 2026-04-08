package com.example.ai_code_review_agent.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_code_review_agent.Service.CodeReviewService;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;

@RestController
@RequestMapping("/api/review")
public class CodeReviewController {

     
    @Autowired
    private CodeReviewService codeReviewService;

    public ResponseEntity<CodeReviewResponse> reviewCode(@RequestBody CodeReviewRequest request) {
        CodeReviewResponse response = codeReviewService.review(request);
        return ResponseEntity.ok(response);
    }
}
