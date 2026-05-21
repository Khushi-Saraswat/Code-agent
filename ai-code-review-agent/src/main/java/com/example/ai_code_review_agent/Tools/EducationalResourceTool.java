package com.example.ai_code_review_agent.Tools;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class EducationalResourceTool {

    @Autowired
    private RestTemplate restTemplate; // final और new RestTemplate() हटा दिया


    @Value("${tavily.api.key}")
    private String tavilyApiKey;

    @Tool(name="educationalResourceTool",description ="Search for official documentation and learning resources for code vulnerabilities.")
    public String fetchEducationalResource(String topic){

        String url ="https://api.tavily.com/search";

        Map<String,Object>requestBody=new HashMap<>();
        requestBody.put("api_key", tavilyApiKey);
        requestBody.put("query", topic + " prevention official documentation owasp");
        requestBody.put("search_depth", "basic");
        requestBody.put("max_results", 1);


        System.out.println("educational resource tool called for topic: ");
        try {
            Map<String,Object>response=restTemplate.postForObject(url, requestBody, Map.class);
            if(response != null && response.containsKey("results")){
                List<Map<String, Object>> results = (List<Map<String, Object>>) response.get("results");
                if (!results.isEmpty()) {
                    String title = (String) results.get(0).get("title");
                    String urlLink = (String) results.get(0).get("url");
                    System.out.println("Educational resource found: " + title + " - " + urlLink);
                    return "Recommended Resource: " + title + " - " + urlLink;
                }

            }
        } catch (Exception e) {
             e.printStackTrace();
             return "Could not fetch online resources for " + topic;
        }

        return "No relevant educational resources found for " + topic;
    }

}
