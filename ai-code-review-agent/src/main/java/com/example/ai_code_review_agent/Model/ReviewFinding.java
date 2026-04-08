package com.example.ai_code_review_agent.Model;

import jakarta.persistence.*;
import lombok.*;
import com.example.ai_code_review_agent.dto.Enum.Severity;
import com.example.ai_code_review_agent.dto.Enum.Type;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewFinding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The redundant sessionId field has been removed 

    @Enumerated(EnumType.STRING) // Recommended to ensure Enums are stored as Strings in DB
    private Type type;       

    @Enumerated(EnumType.STRING)
    private Severity severity;   

    @Column(length = 2000)
    private String message;

    private Integer lineNumber;

    @Column(length = 2000)
    private String suggestion;

    @ManyToOne
    @JoinColumn(name = "session_id") // This now safely creates/uses the session_id column
    private ReviewSession reviewSession;
}