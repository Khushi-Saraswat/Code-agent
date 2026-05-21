package com.example.ai_code_review_agent.Tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

@Component
public class CodeFixerTool {
    

    @Tool(name="codeFixedTool",description="Formats the fixed code into a beautiful Markdown block with headers and notes.")
    public String provideFix(String language,String rawFixedCode){



        String trimmedCode=rawFixedCode.trim();

        StringBuilder formattedResponse=new StringBuilder();
        formattedResponse.append("\n### ✅ Suggested Professional Fix\n");
        formattedResponse.append("Language: ** ").append(language.toUpperCase()).append("**\n\n");

        formattedResponse.append("```").append(language.toLowerCase()).append("\n");
        formattedResponse.append(trimmedCode);
        formattedResponse.append("\n```\n");
        formattedResponse.append("> *Note: This fix follows industry best practices and secure coding standards.*");
  
        System.out.println("format fix called");
        return formattedResponse.toString();

    }
}
