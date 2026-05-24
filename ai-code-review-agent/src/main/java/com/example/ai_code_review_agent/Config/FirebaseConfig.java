package com.example.ai_code_review_agent.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class FirebaseConfig {
    
    @Value("${firebase.service-account.key}")
    private String serviceAccountKey;

    @Bean
    public FirebaseAuth firebaseAuth() throws Exception {
         
        // Render ke absolute disk path se file uthane ke liye File aur FileInputStream use karein
        File file = new File(serviceAccountKey);
        
        try (InputStream credentialsStream = new FileInputStream(file)) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(credentialsStream))
                    .build();

            boolean defaultAppExists = FirebaseApp.getApps().stream()
                    .anyMatch(app -> app.getName().equals(FirebaseApp.DEFAULT_APP_NAME));

            if (!defaultAppExists) {
                FirebaseApp.initializeApp(options);
            }
            
            return FirebaseAuth.getInstance();
        }
    }
}
