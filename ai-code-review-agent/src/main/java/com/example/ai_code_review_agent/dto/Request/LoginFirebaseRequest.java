package com.example.ai_code_review_agent.dto.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LoginFirebaseRequest {

    private String email;
    
    @JsonProperty("idToken")
    private String idToken; // Renamed for clarity and consistency with Firebase response

    @JsonProperty("refreshToken")
    private String refreshToken; // Firebase returns a refresh token

    @JsonProperty("localId")
    private String localId; // This is the Firebase UID

}