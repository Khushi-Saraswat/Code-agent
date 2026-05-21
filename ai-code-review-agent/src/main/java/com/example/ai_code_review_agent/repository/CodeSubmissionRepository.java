package com.example.ai_code_review_agent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ai_code_review_agent.Model.CodeSubmission;


public interface CodeSubmissionRepository extends JpaRepository<CodeSubmission, Long> {
    
}
