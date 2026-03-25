package com.example.resume_analyzer.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AIService {

    private final WebClient webClient;
    private final String apiKey;

    public AIService(WebClient.Builder webClientBuilder,
                     @Value("${gemini.api.url}") String baseUrl,
                     @Value("${gemini.api.key}") String apiKey) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build() ;
        this.apiKey = apiKey;
    }

    public String generateAnalysis(String resumeText, String jobDescription) {
        String prompt = buildPrompt(resumeText, jobDescription);

        String safeContent = prompt
                .replace("\"", "\\\"")
                .replace("\n", "\\n");

        String requestBody = String.format("""
                {
                    "contents": [{
                        "parts": [{
                            "text": "%s"
                        }]
                    }]
                }""", safeContent);

        // Send Request
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-3-flash-preview:generateContent")
                        .build())
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // Extract Response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String buildPrompt(String resumeText, String jobDescription) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Say hello in one word in a random language");
        return prompt.toString();
    }
}
