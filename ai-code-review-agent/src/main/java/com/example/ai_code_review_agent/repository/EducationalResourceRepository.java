package com.example.ai_code_review_agent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ai_code_review_agent.Model.EducationalResource;

public interface EducationalResourceRepository extends JpaRepository<EducationalResource,Long> {
    
}
