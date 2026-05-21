package com.example.ai_code_review_agent.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review_findings")
public class ReviewFinding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    @JsonIgnore
    private ReviewSession session;

    // ← AI "type" bhejta hai
    // "Syntax Error","Logical Error","Security Vulnerability" etc
    private String type;

    private String severity; // Critical, Major, Minor
    private Integer lineStart;
    private Integer lineEnd;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String suggestedFix;


}