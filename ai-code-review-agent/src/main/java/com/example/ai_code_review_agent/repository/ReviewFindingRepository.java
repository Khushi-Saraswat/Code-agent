package com.example.ai_code_review_agent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ai_code_review_agent.Model.ReviewFinding;

public interface ReviewFindingRepository extends JpaRepository<ReviewFinding, Long> {
    
}
