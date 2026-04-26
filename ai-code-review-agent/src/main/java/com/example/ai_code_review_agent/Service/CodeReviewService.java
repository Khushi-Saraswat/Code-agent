package com.example.ai_code_review_agent.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.ai.observation.conventions.AiObservationAttributes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai_code_review_agent.Model.CodeSubmission;
import com.example.ai_code_review_agent.Model.ReviewFinding;
import com.example.ai_code_review_agent.Model.ReviewSession;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Request.ReviewFindingDTO;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;
import com.example.ai_code_review_agent.dto.Response.ReviewHistoryDTO;
import com.example.ai_code_review_agent.repository.CodeSubmissionRepository;
import com.example.ai_code_review_agent.repository.ReviewFindingRepository;
import com.example.ai_code_review_agent.repository.ReviewSessionRepository;

@Service
public class CodeReviewService {

  @Autowired
  private CodeSubmissionRepository codeSubmissionRepository;

  @Autowired
  private AIIntegrationService aiIntegrationService;

  @Autowired
  private ReviewParserService reviewParserService;

   @Autowired
  private ReviewSessionRepository reviewSessionRepository;

  @Autowired
  private ReviewFindingRepository reviewFindingRepository;
    
      // 1. accept DTO 2.validate code 3.create submission 4.generate dummy findings 5.calculate score

      public ReviewSession review(CodeReviewRequest codeReviewRequest){

        //validate code
        if(codeReviewRequest.getCode() == null || codeReviewRequest.getCode().isEmpty()) {
            // Handle invalid code input
            throw new IllegalArgumentException("Code cannot be null or empty");
        }
        if(codeReviewRequest.getCode().length() > 20000){
            throw new IllegalArgumentException("Code too long(max 20000 chars)");
        }

        //code submission
        CodeSubmission submission=codeSubmissionRepository.save(
          CodeSubmission.builder().
          language(codeReviewRequest.getLanguage()).
          codeContent(codeReviewRequest.getCode()).
          tokenCount(codeReviewRequest.getCode().split("\\s+").length).
          submittedAt(LocalDateTime.now()).build()
        );

        // call ai
        String aiResponse=aiIntegrationService.getReview(codeReviewRequest.getCode(), codeReviewRequest.getLanguage());

        List<ReviewFindingDTO>dtos=reviewParserService.parse(aiResponse);

        //save session
        ReviewSession session=reviewSessionRepository.save(
          ReviewSession.builder()
          .submission(submission)
          .status("COMPLETED")
          .totalFindings(dtos.size())
         // .qualityScore(calculateScore(dtos))
          .reviewedAt(LocalDateTime.now())
          .build()
        );

       //Save findings 
       List<ReviewFinding> findings=dtos.stream().<ReviewFinding>map(dto->
                 ReviewFinding.builder()
                .session(session)
                .category(dto.getCategory())
                .severity(dto.getSeverity())
                .lineStart(dto.getLineStart())
                .lineEnd(dto.getLineEnd())
                .description(dto.getDescription())
                .suggestedFix(dto.getSuggestedFix())
                .build()

       ).toList();

        
        reviewFindingRepository.saveAll(findings);
        session.setFindings(findings);
        return session;
     
      }








      public List<ReviewHistoryDTO> getHistory(){
        // 1. find review session by submission id
        // 2. if not found return null or throw exception
        // 3. if found get findings
        // 4. build response DTO and return
        return null;
      }


      public CodeReviewResponse getReviewDetails(Long reviewId){
        // 1. find review session by review id
        // 2. if not found return null or throw exception
        // 3. if found get findings
        // 4. build response DTO and return
        return null;
      }


}
