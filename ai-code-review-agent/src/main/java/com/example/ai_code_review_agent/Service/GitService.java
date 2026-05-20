package com.example.ai_code_review_agent.Service;



import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;



@Service
public class GitService {


   
   
   

    @Autowired
    private Gson gson;


    @Autowired
    private RestTemplate restTemplate;

    
    private static final String  GITHUB_API_URL="https://api.github.com";


    public List<Map<String, Object>> getRepositoryDetails(String owner, String repo, String token, String branch)
            throws IOException, URISyntaxException {

        System.out.println("📡 getRepositoryDetails called with: owner=" + owner + ", repo=" + repo + ", branch=" + branch + ", token=" + (token != null ? "***" : "null"));

        String url = GITHUB_API_URL + "/repos/" + owner + "/" + repo + "/branches/" + branch;
        System.out.println("🔗 GitHub API URL: " + url);
        
        Map<String, Object> jsonMap = makeRestCall(url, token);
        System.out.println("Branches API Response = \n<API RESPONSE START>\n " + gson.toJson(jsonMap)
                + "\n<API RESPONSE END>\n");

        String treeApiUrl = gson.toJsonTree(jsonMap).getAsJsonObject().get("commit").getAsJsonObject().get("commit")
                .getAsJsonObject().get("tree").getAsJsonObject().get("url").getAsString();
        System.out.println("TREE API URL = " + treeApiUrl + "\n");

        Map<String, Object> jsonTreeMap = makeRestCall(treeApiUrl + "?recursive=1", token);
        System.out.println("TREE API Response = \n<API RESPONSE START>\n " + gson.toJson(jsonTreeMap)
                + "\n<API RESPONSE END>\n");

        System.out.println("Directory & files list :");
        List<Map<String, Object>> treeList = (List<Map<String, Object>>) jsonTreeMap.get("tree");
        List<Map<String, Object>> responseList = new ArrayList<>();

        for (Object obj : treeList) {
            Map<String, Object> fileMetadata = (Map<String, Object>) obj;
            Map<String, Object> entry = new HashMap<>(fileMetadata);
            String type = (String) fileMetadata.get("type");

            if ("tree".equals(type)) {
                entry.put("entryType", "Directory");
                System.out.println("Directory = " + fileMetadata.get("path"));
            } else {
                entry.put("entryType", "File");
                System.out.println("File = " + fileMetadata.get("path") + " | Size = " + fileMetadata.get("size")
                        + " Bytes");
            }

            responseList.add(entry);
        }

        return responseList;

    }

    /**
	 * This method will make a REST GET call for this URL using Apache http client &
	 * fluent library.
	 * 
	 * Then parse response using GSON & return parsed Map.
	 */
    public Map<String, Object> makeRestCall(String restUrl, String token) throws ClientProtocolException, IOException {
        Request request = Request.Get(restUrl);
        if (token != null && !token.isBlank()) {
            String authHeader = token;
            if (!token.startsWith("Bearer ")) {
                authHeader = "Bearer " + token;
            }
            System.out.println("🔐 Adding Authorization header");
            request = request.addHeader("Authorization", authHeader);
        }
        System.out.println("📤 Executing request to: " + restUrl);
        Content content = request.execute().returnContent();
        String jsonString = content.asString();
        System.out.println("content = " + jsonString);
        Map<String, Object> jsonMap = gson.fromJson(jsonString, Map.class);
        return jsonMap;
    }


public String FileContent(String fileUrl, String token){
        if (fileUrl == null || fileUrl.isBlank()) {
            throw new IllegalArgumentException("fileUrl is required");
        }

        String normalizedUrl = fileUrl.trim();

        // Setup headers for authentication (required for private repos)
        HttpHeaders headers = new HttpHeaders();
        if (token != null && !token.isBlank()) {
            String authHeader = token.startsWith("Bearer ") ? token : "Bearer " + token;
            headers.set("Authorization", authHeader);
        }
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        if (normalizedUrl.contains("github.com") && normalizedUrl.contains("/blob/")) {
            normalizedUrl = normalizedUrl.replace("https://github.com/", "https://raw.githubusercontent.com/")
                    .replace("http://github.com/", "https://raw.githubusercontent.com/")
                    .replace("/blob/", "/");
        }

        if (normalizedUrl.contains("api.github.com/repos") && normalizedUrl.contains("/contents/")) {
            Map<String, Object> response = restTemplate.exchange(normalizedUrl, HttpMethod.GET, entity, Map.class).getBody();
            return decodeBase64Content(response);
        }

        return restTemplate.exchange(normalizedUrl, HttpMethod.GET, entity, String.class).getBody();
    }

    private String decodeBase64Content(Map<String, Object> response) {
        if (response == null || !response.containsKey("content")) {
            throw new IllegalArgumentException("Unable to read GitHub file content from API response");
        }

        String base64Content = (String) response.get("content");
        byte[] decodedBytes = Base64.getMimeDecoder().decode(base64Content.replace("\n", ""));
        return new String(decodedBytes, StandardCharsets.UTF_8);
    }


   

    




}
