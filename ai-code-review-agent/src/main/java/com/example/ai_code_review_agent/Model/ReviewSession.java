package com.example.ai_code_review_agent.Model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class ReviewSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private Integer score;

    private Integer totalFindings;

    @Column(length = 2000)
    private String summary;

    private LocalDateTime reviewedAt;


    @OneToOne
    @JoinColumn(name = "submission_id")
    private CodeSubmission submission;


    @OneToMany(mappedBy = "reviewSession", cascade = CascadeType.ALL)
     private List<ReviewFinding> findings;

}
