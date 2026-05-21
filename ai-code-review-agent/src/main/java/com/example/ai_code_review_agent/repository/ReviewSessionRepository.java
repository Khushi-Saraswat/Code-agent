package com.example.ai_code_review_agent.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.ai_code_review_agent.Model.ReviewSession;
import com.example.ai_code_review_agent.Model.User;

public interface ReviewSessionRepository extends JpaRepository<ReviewSession,Long> {
    List<ReviewSession> findBySubmissionLanguageIgnoreCase(String language);

    @Query("SELECT AVG(r.qualityScore) FROM ReviewSession r")
    Double findAverageQualityScore();
    
    // New methods for dashboard stats
    Long countByUser(User user);

    @Query("SELECT AVG(r.qualityScore) FROM ReviewSession r WHERE r.user = :user")
    Double findAverageQualityScoreByUser(User user);

    @Query("SELECT SUM(r.totalFindings) FROM ReviewSession r WHERE r.user = :user")
    Integer sumTotalFindingsByUser(User user);

    List<ReviewSession> findByUserOrderByReviewedAtDesc(User user);
    
    @Query("SELECT s.language, COUNT(rs) FROM ReviewSession rs JOIN rs.submission s WHERE rs.user = :user GROUP BY s.language")
    List<Object[]> countReviewSessionsByLanguageByUser(User user);
}
