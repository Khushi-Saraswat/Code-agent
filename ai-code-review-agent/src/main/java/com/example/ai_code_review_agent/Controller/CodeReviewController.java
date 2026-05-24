package com.example.ai_code_review_agent.Controller;

import java.util.Map;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.example.ai_code_review_agent.Model.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.ai_code_review_agent.Service.CodeReviewService;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/review")
public class CodeReviewController {
    
    private final CodeReviewService codeReviewService;

    @Autowired
    public CodeReviewController(CodeReviewService codeReviewService) {
        this.codeReviewService = codeReviewService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submit(
    @RequestBody @Valid CodeReviewRequest req,
    @AuthenticationPrincipal User user
    ) {
        // You now have access to the authenticated user from your Postgres DB
        log.info("User {} is submitting a code review", user.getEmail());
        
        // Pass the 'user' object to your service so the review can be saved to their account
        String review = codeReviewService.review(req, user);
        log.debug("Review session output: {}", review);
        
        // 3. Return JSON structure matching frontend requirements
        return ResponseEntity.ok(review);
        
    
     }


    @GetMapping("/{sessionId}/report")
    public ResponseEntity<CodeReviewResponse> getSessionReport(
        @PathVariable Long sessionId) {
        return ResponseEntity.ok(codeReviewService.getReviewReport(sessionId));
    }

    @DeleteMapping("/{sessionId}")
    public ResponseEntity<Void> deleteSession(
        @PathVariable Long sessionId) {
        codeReviewService.deleteReviewSession(sessionId);
        return ResponseEntity.noContent().build();
    }
}
