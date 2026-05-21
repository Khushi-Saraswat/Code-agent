package com.example.ai_code_review_agent.Config;

import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.ai_code_review_agent.Model.User;
import com.example.ai_code_review_agent.repository.UserRepo;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {


  @Autowired
  private UserRepo userRepo;


  @Override  
  protected void doFilterInternal(  
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)  
      throws ServletException, IOException {  
    String header = request.getHeader("Authorization");  
  
    if (header == null || !header.startsWith("Bearer ")) {  
      filterChain.doFilter(request, response);  
      return;  
    }  
  
    String token = header.substring(7);  
    
  
    try {  
      FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);  
      String uid = decodedToken.getUid();  
   
      // 2. Sync user with local DB
      User user = userRepo.findByGipUserId(uid)
          .orElseGet(() -> {
              String email = decodedToken.getEmail();
              log.info("New Firebase user detected. Auto-creating in local DB: {}", email);
              User newUser = new User();
              newUser.setGipUserId(uid);
              newUser.setEmail(email != null ? email : "no-email@firebase.com");
              return userRepo.save(newUser);
          });
      
      // 3. Bina roles ke, Spring Security ke liye ek default placeholder grant karein
      List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
      
      // 4. Authentication object banayein (Principal mein pura user object pass kiya hai)
       UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
       org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(authentication);

    } catch (Exception e) {  
        log.error("Firebase authentication failed: {}", e.getMessage());
        // Do not return 401 or stop the chain here. 
        // Let the request proceed; SecurityConfig will block it if the endpoint is not public.
    }  

    filterChain.doFilter(request, response);  
  }  
    
}
