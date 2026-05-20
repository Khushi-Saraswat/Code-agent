package com.example.ai_code_review_agent.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "review_sessions")
public class ReviewSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "submission_id")
    private CodeSubmission submission;

    private String status;

    // ← NAYA: AI ka summary
    @Column(columnDefinition = "TEXT")
    private String summary;

    private Integer totalFindings;
    private Integer qualityScore;

    // ← NAYA: Poor / Good / Excellent
    private String qualityRating;

    // ← NAYA: Fixed code jo AI ne diya
    @Column(columnDefinition = "TEXT")
    private String fixedCode;

    private LocalDateTime reviewedAt;

    @OneToMany(mappedBy = "session",
               cascade = CascadeType.ALL,
               fetch = FetchType.EAGER)
    @JsonIgnoreProperties("session")
    @Builder.Default
    private List<ReviewFinding> findings = new ArrayList<>();

    @OneToMany(mappedBy = "session",
               cascade = CascadeType.ALL,
               fetch = FetchType.EAGER)
    @JsonIgnoreProperties("session")
    @Builder.Default
    private List<EducationalResource> educationalResources 
        = new ArrayList<>();

    @ManyToOne
     @JoinColumn(name = "user_id") // This creates the foreign key column in DB
     private User user;


}
