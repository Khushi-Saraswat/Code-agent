package com.example.ai_code_review_agent.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "educational_resources")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EducationalResource {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private ReviewSession session;

    // "Express.js Security Best Practices"
    private String topic;

    // "OWASP Node.js Security Cheat Sheet"
    private String title;

    // "https://..."
    @Column(columnDefinition = "TEXT")
    private String url;





}
