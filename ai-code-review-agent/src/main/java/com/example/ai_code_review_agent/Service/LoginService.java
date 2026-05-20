package com.example.ai_code_review_agent.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.ai_code_review_agent.dto.Request.LoginFirebaseRequest;
import com.example.ai_code_review_agent.dto.Request.LoginRequest;
import com.example.ai_code_review_agent.Model.User;
import com.example.ai_code_review_agent.dto.Response.LoginResponse;
import com.example.ai_code_review_agent.repository.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class LoginService {
   
    
     @Value("${firebase.api.key}")
     private String firebaseApiKey;

     @Autowired
     private UserRepo userRepo;

     @Autowired
     private RestTemplate restTemplate;


     public LoginResponse login(LoginRequest loginrequest){

        //firebase kah offical signup url
       String loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + firebaseApiKey;

       // firebase koh bhejnai kai liyai map yah dto hai
       Map<String,Object>loginFirebaseRequest=new HashMap<>();
       loginFirebaseRequest.put("email",loginrequest.getEmail());
       loginFirebaseRequest.put("password",loginrequest.getPassword());
       loginFirebaseRequest.put("returnSecureToken",true); // यह idToken पाने के लिए ज़रूरी है

       LoginFirebaseRequest loginFirebaseDto=restTemplate.postForObject(loginUrl, loginFirebaseRequest, LoginFirebaseRequest.class);

       try {
           if (loginFirebaseDto == null) throw new RuntimeException("Login failed");

           LoginResponse loginResponse = new LoginResponse();
           loginResponse.setEmail(loginFirebaseDto.getEmail());
           loginResponse.setIdToken(loginFirebaseDto.getIdToken());
           return loginResponse;
       } catch (Exception e) {
           throw new RuntimeException("Invalid Credentials");
       }
    }
       
     @Transactional
     public LoginResponse signUp(LoginRequest signUpRequest) {
         // Firebase official Sign-Up URL
         String signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + firebaseApiKey;

         Map<String, Object> payload = new HashMap<>();
         payload.put("email", signUpRequest.getEmail());
         payload.put("password", signUpRequest.getPassword());
         payload.put("returnSecureToken", true);

         try {
             // 1. Create account in Firebase
             LoginFirebaseRequest firebaseDto = restTemplate.postForObject(signUpUrl, payload, LoginFirebaseRequest.class);

             if (firebaseDto != null) {
                 // 2. Sync with local DB (we don't store the password)
                 userRepo.findByGipUserId(firebaseDto.getLocalId()).orElseGet(() -> {
                     User newUser = new User();
                     newUser.setGipUserId(firebaseDto.getLocalId());
                     newUser.setEmail(firebaseDto.getEmail());
                     return userRepo.save(newUser);
                 });

                 LoginResponse response = new LoginResponse();
                 response.setEmail(firebaseDto.getEmail());
                 response.setIdToken(firebaseDto.getIdToken());
                 return response;
             }
         } catch (Exception e) {
             throw new RuntimeException("Registration failed: " + e.getMessage());
         }
         return null;
     }
}
