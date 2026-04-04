package com.example.resume_analyzer.controller;

import com.example.resume_analyzer.model.ResumeAnalysis;
import com.example.resume_analyzer.service.AIService;
import com.example.resume_analyzer.service.PDFService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
@CrossOrigin("*")
public class AnalysisController {

    private final PDFService pdfService;
    private final AIService aiService;


    @PostMapping("/extract")
    public ResponseEntity<String> extractText(@RequestPart("file") MultipartFile file ) throws Exception {
        String response =pdfService.extractText(file);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/analyze")
    public ResponseEntity<ResumeAnalysis> getAnalysis(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "jobDescription", required = false) String jobDescription) throws Exception {

        String resumeText = pdfService.extractText(file);
        ResumeAnalysis response = aiService.generateAnalysis(resumeText,jobDescription);
        return ResponseEntity.ok(response);
    }
}
