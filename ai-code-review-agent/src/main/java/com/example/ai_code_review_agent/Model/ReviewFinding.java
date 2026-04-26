package com.example.ai_code_review_agent.Model;

import com.example.ai_code_review_agent.dto.Enum.Severity;
import com.example.ai_code_review_agent.dto.Enum.Type;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "review_findings")
public class ReviewFinding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private ReviewSession session;

    private Type category;   // Bug, Security, Style, Performance
    private Severity severity;   // Critical, Major, Minor, Info
    private Integer lineStart;
    private Integer lineEnd;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String suggestedFix;
}