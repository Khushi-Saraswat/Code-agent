package com.example.ai_code_review_agent.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ai_code_review_agent.Model.User;

public interface UserRepo extends JpaRepository<User,Long>{
    

    // Your firebaseAuthenticationFilter uses this exact method
    Optional<User> findByGipUserId(String gipUserId);

    
    // Useful fallback check during initial manual creation/login flows
    Optional<User> findByEmail(String email);


    
}
