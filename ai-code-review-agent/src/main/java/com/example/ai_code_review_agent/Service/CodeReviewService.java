package com.example.ai_code_review_agent.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ai_code_review_agent.Model.CodeSubmission;
import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;
import com.example.ai_code_review_agent.dto.Response.ReviewHistoryDTO;
import com.example.ai_code_review_agent.repository.CodeSubmissionRepository;

@Service
public class CodeReviewService {

  @Autowired
  private CodeSubmissionRepository codeSubmissionRepository;

    
// 1. accept DTO 2.validate code 3.create submission 4.generate dummy findings 5.calculate score

      public CodeReviewResponse review(CodeReviewRequest codeReviewRequest){

        //validate code
        if(codeReviewRequest.getCode() == null || codeReviewRequest.getCode().isEmpty()) {
            // Handle invalid code input
            throw new IllegalArgumentException("Code cannot be null or empty");
        }
        //create submission
        CodeSubmission submission = new CodeSubmission();
        submission.setCode(codeReviewRequest.getCode());
        submission.setLanguage(codeReviewRequest.getLanguage());
        submission.setUserNotes(codeReviewRequest.getUserNotes());
        submission.setSubmittedAt(LocalDateTime.now());

        CodeSubmission savedSubmission = codeSubmissionRepository.save(submission);
        
        //generate dummy findings-score summary findings etc... using python script or any other logic
         
      
          


        return null;
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
