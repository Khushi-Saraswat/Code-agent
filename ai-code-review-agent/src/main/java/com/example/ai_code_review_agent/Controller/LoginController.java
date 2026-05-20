package com.example.ai_code_review_agent.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ai_code_review_agent.Service.LoginService;
import com.example.ai_code_review_agent.dto.Request.LoginRequest;
import com.example.ai_code_review_agent.dto.Response.LoginResponse;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api")
public class LoginController {
    
   @Autowired
   private LoginService loginService;

   @PostMapping("/login")
   public LoginResponse login(@RequestBody LoginRequest loginRequest){
     return loginService.login(loginRequest);
   }

   @PostMapping("/register")
   public LoginResponse register(@RequestBody LoginRequest loginRequest) {
       return loginService.signUp(loginRequest);
   }
}
