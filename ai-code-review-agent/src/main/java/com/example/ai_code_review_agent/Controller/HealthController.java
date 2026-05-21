package com.example.ai_code_review_agent.Controller;

import java.util.List;
import java.util.Map;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_code_review_agent.Service.GitService;



@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private GitService gitService;

    @GetMapping
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/repo-details/{owner}/{repo}/{branch}")
    public ResponseEntity<?> getRepositoryDetails(
        @PathVariable String owner, @PathVariable String repo,
        @RequestHeader(value = "X-GitHub-Token", required = false) String githubToken,
        @PathVariable String branch) {

        System.out.println("🔍 Incoming Request: GET /api/health/repo-details");
        System.out.println("📍 Path: " + owner + "/" + repo + " [" + branch + "]");
        System.out.println("🔑 GitHub Token Present: " + (githubToken != null && !githubToken.isBlank()));
        System.out.println("🌐 Header Info: " + (githubToken != null ? "Request contains X-GitHub-Token" : "No GitHub Token"));

        try {
            List<Map<String, Object>> treeList = gitService.getRepositoryDetails(owner, repo, githubToken, branch);
            return ResponseEntity.ok(treeList);
        } catch (Exception e) {
            System.err.println("❌ Error fetching repository details: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }


    @GetMapping("/github/file-content")
    public ResponseEntity<?> getGithubFileContent(
            @RequestParam String fileUrl,
            @RequestHeader(value = "X-GitHub-Token", required = false) String githubToken){
        try {
            String content = gitService.FileContent(fileUrl, githubToken);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

}
