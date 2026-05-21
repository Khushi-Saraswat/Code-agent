package com.example.ai_code_review_agent.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai_code_review_agent.Model.CodeSubmission;
import com.example.ai_code_review_agent.Model.EducationalResource;
import com.example.ai_code_review_agent.Model.ReviewFinding;
import com.example.ai_code_review_agent.Model.ReviewSession;
import com.example.ai_code_review_agent.Model.User;
import com.example.ai_code_review_agent.dto.Request.AIReviewResponseDTO;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Request.ReviewFindingDTO;

import com.example.ai_code_review_agent.dto.Response.ReviewHistoryDTO;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;
import com.example.ai_code_review_agent.repository.CodeSubmissionRepository;
import com.example.ai_code_review_agent.repository.EducationalResourceRepository;
import com.example.ai_code_review_agent.repository.ReviewFindingRepository;
import com.example.ai_code_review_agent.repository.ReviewSessionRepository;

@Service
public class CodeReviewService {

  private final CodeSubmissionRepository codeSubmissionRepository;
  private final AIIntegrationService aiIntegrationService;
  private final ReviewParserService reviewParserService;
  private final ReviewSessionRepository reviewSessionRepository;
  private final ReviewFindingRepository reviewFindingRepository;
  private final EducationalResourceRepository educationalResourceRepo;

  @Autowired
  public CodeReviewService(
      CodeSubmissionRepository codeSubmissionRepository,
      AIIntegrationService aiIntegrationService,
      ReviewParserService reviewParserService,
      ReviewSessionRepository reviewSessionRepository,
      ReviewFindingRepository reviewFindingRepository,
      EducationalResourceRepository educationalResourceRepo) {
    this.codeSubmissionRepository = codeSubmissionRepository;
    this.aiIntegrationService = aiIntegrationService;
    this.reviewParserService = reviewParserService;
    this.reviewSessionRepository = reviewSessionRepository;
    this.reviewFindingRepository = reviewFindingRepository;
    this.educationalResourceRepo = educationalResourceRepo;
  }
    
      
          

      public String review(CodeReviewRequest codeReviewRequest,User user) {


        String code = codeReviewRequest.getCode();
        if (code == null || code.trim().isEmpty()) {
            throw new IllegalArgumentException("Code cannot be null or empty");
        }

        // 1. Call AI
        String aiResponse = aiIntegrationService.getReview(codeReviewRequest.getCode());

        // 2. Parse Response
        AIReviewResponseDTO parsed = reviewParserService.parse(aiResponse);

        // 3. Save Code Submission
        var codesubmission = codeSubmissionRepository.save(
            CodeSubmission.builder()
                .user(user) // Link the submission to the authenticated user
                .codeContent(codeReviewRequest.getCode())
                // Language ab report.getLanguage() se mil raha hai
                .language(parsed != null && parsed.getReviewReport() != null ? 
                    parsed.getReviewReport().getLanguage() : "Unknown")
                .tokenCount(code.split("\\s+").length)
                .submittedAt(LocalDateTime.now())
                .build()
        );

        if (parsed == null || parsed.getReviewReport() == null) {
            reviewSessionRepository.save(ReviewSession.builder()
                .submission(codesubmission).status("FAILED")
                .qualityScore(0).totalFindings(0)
                .reviewedAt(LocalDateTime.now()).build());
            return aiResponse;
        }

        var report = parsed.getReviewReport();

        // 4. Create and Save Review Session
        ReviewSession session = reviewSessionRepository.save(
            ReviewSession.builder()
                .user(user) // Link the session to the authenticated user
                .submission(codesubmission)
                .status("COMPLETED")
                .summary(report.getSummary())
                .qualityScore(report.getQualityScore() != null ? report.getQualityScore().getScore() : 0)
                .qualityRating(report.getQualityScore() != null ? report.getQualityScore().getRating() : "Unknown")
                // fixedCode ab suggestedFix object ke andar hai
                .fixedCode(report.getSuggestedFix() != null ? report.getSuggestedFix().getFixedCode() : null)
                .totalFindings(report.getIssues() != null ? report.getIssues().size() : 0)
                .reviewedAt(LocalDateTime.now())
                .build()
        );

        // 5. Save Findings (Issues) - Getters Updated to 'description' and 'line'
        if (report.getIssues() != null) {
            List<ReviewFinding> findings = report.getIssues().stream().map(dto ->
                ReviewFinding.builder()
                    .session(session)
                    .type(dto.getType())
                    .description(dto.getDescription()) // DTO key change: description
                    .lineStart(dto.getLine())          // DTO key change: line
                    .lineEnd(dto.getLine())
                    .build()
            ).toList();
            reviewFindingRepository.saveAll(findings);
            session.setFindings(findings);
        }

        // 6. Save Educational Resources
        if (report.getEducationalResources() != null && report.getEducationalResources().getResources() != null) {
            List<EducationalResource> resources = report.getEducationalResources().getResources().stream().map(resDto ->
                EducationalResource.builder()
                    .session(session)
                    // EducationalResource entity ke topic aur title ko yahan map karein
                    .topic(report.getEducationalResources().getTopic()) 
                    .title(resDto.getTitle()) 
                    .url(resDto.getUrl())
                    .build()
            ).toList();
            educationalResourceRepo.saveAll(resources);
            session.setEducationalResources(resources);
        }

        return aiResponse;
    }
   
    /**
     * Retrieves global statistics for a given user, including total reviews, average quality score, and total findings.
     *
     * @param user The user for whom to retrieve the statistics.
     * @return A map containing "totalReviews", "averageScore", and "totalFindings".
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getGlobalStats(User user) {
        Map<String, Object> stats = new HashMap<>();
        Long totalReviews = reviewSessionRepository.countByUser(user);
        Double averageScore = reviewSessionRepository.findAverageQualityScoreByUser(user);
        Integer totalFindings = reviewSessionRepository.sumTotalFindingsByUser(user);

        stats.put("totalReviews", totalReviews);
        stats.put("averageScore", averageScore != null ? Math.round(averageScore) : 0); // Round to nearest integer
        stats.put("totalFindings", totalFindings != null ? totalFindings : 0);
        return stats;
    }

    /**
     * Retrieves the language distribution of code reviews for a given user.
     *
     * @param user The user for whom to retrieve the language distribution.
     * @return A map where keys are language names and values are the count of reviews in that language.
     */
    @Transactional(readOnly = true)
    public Map<String, Long> getLanguageDistribution(User user) {
        List<Object[]> languageCounts = reviewSessionRepository.countReviewSessionsByLanguageByUser(user);
        return languageCounts.stream()
                .collect(Collectors.toMap(
                    obj -> obj[0] != null ? (String) obj[0] : "Unknown", 
                    obj -> (Long) obj[1],
                    Long::sum // Merge counts if "Unknown" or a language appears multiple times
                ));
    }
    @Transactional(readOnly = true)
      public CodeReviewResponse getReviewDetails(Long reviewId){
        return getReviewReport(reviewId);
      }

    @Transactional(readOnly = true)
      public ReviewSession getReviewSession(Long sessionId) {
        return reviewSessionRepository.findById(sessionId)
            .orElseThrow(() -> new IllegalArgumentException("Review session not found for id: " + sessionId));
      }

      public CodeReviewResponse getReviewReport(Long sessionId) {
        ReviewSession session = getReviewSession(sessionId);
        CodeReviewResponse response = new CodeReviewResponse();
        response.setSubmissionId(session.getSubmission() != null ? session.getSubmission().getId() : null);
        response.setScore(session.getQualityScore());
        response.setSummary(session.getSummary());
        response.setCreatedAt(session.getReviewedAt());
        response.setFindings(session.getFindings().stream().map(finding -> {
            ReviewFindingDTO dto = new ReviewFindingDTO();
            dto.setType(finding.getType());
            dto.setSeverity(finding.getSeverity());
            dto.setLineStart(finding.getLineStart());
            dto.setLineEnd(finding.getLineEnd());
            dto.setDescription(finding.getDescription());
            dto.setSuggestedFix(finding.getSuggestedFix());
            return dto;
        }).toList());
        return response;
      }

    /**
     * Retrieves a list of recent code review history for a given user.
     *
     * @param user The user for whom to retrieve the recent history.
     * @return A list of ReviewHistoryDTO objects, ordered by reviewedAt in descending order.
     */
    @Transactional(readOnly = true)
    public List<ReviewHistoryDTO> getRecentHistory(User user) {
        List<ReviewSession> recentSessions = reviewSessionRepository.findByUserOrderByReviewedAtDesc(user);
        return recentSessions.stream()
                .map(session -> ReviewHistoryDTO.builder()
                        .reviewId(session.getId())
                        .submissionId(session.getSubmission() != null ? session.getSubmission().getId() : null)
                        .language(session.getSubmission() != null ? session.getSubmission().getLanguage() : "Unknown")
                        .score(session.getQualityScore())
                        .summary(session.getSummary())
                        .reviewedAt(session.getReviewedAt())
                        .build())
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
      public List<ReviewSession> getSessionsByLanguage(String language) {
        return reviewSessionRepository.findBySubmissionLanguageIgnoreCase(language);
      }


    @Transactional
      public void deleteReviewSession(Long sessionId) {
        if (!reviewSessionRepository.existsById(sessionId)) {
          throw new IllegalArgumentException("Review session not found for id: " + sessionId);
        }
        reviewSessionRepository.deleteById(sessionId);
      }
      
    

      
}
