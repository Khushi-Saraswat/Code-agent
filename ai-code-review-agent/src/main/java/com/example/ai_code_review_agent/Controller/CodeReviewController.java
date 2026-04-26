package com.example.ai_code_review_agent.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_code_review_agent.Model.ReviewSession;
import com.example.ai_code_review_agent.Service.CodeReviewService;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;


import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/review")
public class CodeReviewController {

     
    @Autowired
    private CodeReviewService codeReviewService;

     @PostMapping("/submit")
    public ResponseEntity<ReviewSession> submit(

            @RequestBody @Valid CodeReviewRequest req) {
        ReviewSession session = codeReviewService.review(
            req);
        System.out.println(session+"session output");
        return ResponseEntity.ok(session);
    }
}
