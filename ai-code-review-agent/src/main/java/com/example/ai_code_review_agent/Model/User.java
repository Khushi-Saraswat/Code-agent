package com.example.ai_code_review_agent.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gip_user_id",unique = true ,nullable = false)
    private String gipUserId;

    @Column(nullable = false)
    private String email;
   
    @OneToMany(mappedBy = "user")
    @ToString.Exclude 
    @EqualsAndHashCode.Exclude 
    private List<ReviewSession> reviewSessions;


}
