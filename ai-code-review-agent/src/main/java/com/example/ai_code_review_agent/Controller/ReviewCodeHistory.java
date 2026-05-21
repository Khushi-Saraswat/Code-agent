package com.example.ai_code_review_agent.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_code_review_agent.Model.ReviewSession;
import com.example.ai_code_review_agent.Model.User;
import com.example.ai_code_review_agent.Service.CodeReviewService;
import com.example.ai_code_review_agent.dto.Response.ReviewHistoryDTO;

@RestController
@RequestMapping("/api/review/history")
public class ReviewCodeHistory {

    @Autowired
    private CodeReviewService codeReviewService;

    


    @GetMapping("/all")
    public ResponseEntity<List<ReviewHistoryDTO>> getReviewHistory(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(codeReviewService.getRecentHistory(user));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats(@AuthenticationPrincipal User user) {
        Map<String, Object> stats = codeReviewService.getGlobalStats(user);
        stats.put("languageDistribution", codeReviewService.getLanguageDistribution(user));
        return ResponseEntity.ok(stats);
    }

    
    @GetMapping("/language/{language}")
    public ResponseEntity<List<ReviewSession>> getByLanguage(@PathVariable String language) {
        return ResponseEntity.ok(codeReviewService.getSessionsByLanguage(language));
    }



}
