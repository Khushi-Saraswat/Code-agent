package com.example.ai_code_review_agent.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ai_code_review_agent.dto.Request.CodeReviewRequest;
import com.example.ai_code_review_agent.dto.Response.CodeReviewResponse;
import com.example.ai_code_review_agent.dto.Response.ReviewHistoryDTO;

@Service
public class CodeReviewService {
    
// 1. accept DTO 2.validate code 3.create submission 4.generate dummy findings 5.calculate score

      public CodeReviewResponse review(CodeReviewRequest codeReviewRequest){
        
     /*This method will perform 7 steps.

     Step 1 — Receive Request

     Input:

     code
     language
     filename
     notes

    First validate:

    code not null
    language not null
    Step 2 — Save CodeSubmission

    Create CodeSubmission entity:

    Set:

     code
     language
    filename
    userNotes
    submittedAt

    Save to DB.

    Now you get:
    submissionId

     You will need this later.

     Step 3 — Call AI / Dummy Analyzer

     For now do dummy logic.

      Example logic:

     if code contains "null" → add bug
     if code contains "System.out" → style issue
    else → no issue

     Create list of ReviewFinding (NOT DB entity yet)

      This simulates AI.

     Later:
     This step will call Python.

      Step 4 — Calculate Score

      Start score = 100

      Loop findings:

    CRITICAL → -20
       MAJOR → -10
     MINOR → -5

      Final score computed.

    Step 5 — Save ReviewSession

    Create ReviewSession entity:

     Set:

    submissionId
     score
    totalFindings
   summary
   reviewedAt

    Save it.

   Now you get:
   sessionId

     Step 6 — Save ReviewFindings

    Loop findings list

    For each finding:
    Create ReviewFinding entity

     Set:

     sessionId
     type
      severity
      message
     lineNumber
     suggestion

      Save each.

      Step 7 — Build Response DTO

      Create response:

      Set:

    submissionId
     score
      summary
     findings list
       createdAt

       Return response. */
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
