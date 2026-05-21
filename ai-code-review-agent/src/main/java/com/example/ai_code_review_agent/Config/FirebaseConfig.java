package com.example.ai_code_review_agent.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

import java.io.InputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;



@Configuration
public class FirebaseConfig {
    
    @Value("${firebase.service-account.key}")
    private String serviceAccountKey;

    @Autowired
    private ResourceLoader resourceLoader;



    @Bean
    public FirebaseAuth firebaseAuth() throws Exception{
         
        // सीधे resources फ़ोल्डर से JSON फ़ाइल लोड करें
        Resource resource = resourceLoader.getResource(serviceAccountKey);
        
        try (InputStream credentialsStream = resource.getInputStream()) {
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
