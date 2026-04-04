package com.example.resume_analyzer.service;

import com.example.resume_analyzer.model.ResumeAnalysis;
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

    public ResumeAnalysis generateAnalysis(String resumeText, String jobDescription) {
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
                        .path("/v1beta/models/gemini-2.5-flash:generateContent")
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

    private ResumeAnalysis extractResponseContent(String response) {
        try {
            // Pull the text field out of Gemini's response envelope
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            String jsonText = root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // Strip markdown code fences if the model added them despite instructions
            jsonText = jsonText.trim();
            if (jsonText.startsWith("```json")) {
                jsonText = jsonText.substring(7);
            } else if (jsonText.startsWith("```")) {
                jsonText = jsonText.substring(3);
            }
            if (jsonText.endsWith("```")) {
                jsonText = jsonText.substring(0, jsonText.length() - 3);
            }
            jsonText = jsonText.trim();

            // Deserialize the clean JSON string into a ResumeAnalysis object
            return mapper.readValue(jsonText, ResumeAnalysis.class);

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage(), e);
        }
    }

    private String buildPrompt(String resumeText, String jobDescription) {
        return String.format("""
                You are an expert ATS (Applicant Tracking System) resume coach with 10 years of \
                experience evaluating resumes for top tech companies.
                
                You will be given a resume and optionally a job description. Your job is to \
                evaluate the resume and return a structured analysis.
                
                RESUME:
                %s
                
                JOB DESCRIPTION:
                %s
                
                Instructions:
                - Evaluate the resume's ATS compatibility and give a score from 0 to 100
                - If a job description is provided, identify keywords from it that are missing \
                in the resume. If no job description is provided, return an empty array.
                - Evaluate the tone, clarity, and language quality of the resume
                - Provide specific, actionable suggestions to improve the resume
                - Identify existing strengths of the resume
                
                Critical output rules:
                - Return ONLY a raw JSON object
                - No markdown, no code fences, no explanation, no text before or after the JSON
                - Every field is required, no field may be omitted or null
                - Strictly follow this schema:
                
                {
                  "atsScore": <integer 0-100>,
                  "keywordGaps": <array of strings>,
                  "toneFeedback": <string>,
                  "suggestions": <array of strings>,
                  "strengths": <array of strings>
                }
                """, resumeText, jobDescription == null || jobDescription.isBlank()
                ? "No job description provided." : jobDescription);
    }
}
