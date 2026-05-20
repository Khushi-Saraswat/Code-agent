package com.example.ai_code_review_agent.dto.Request;

import lombok.Data;

@Data
public class FirebaseSignInRequest {

    private String email;
    private String password;
    private boolean returnSecureToken;

}
