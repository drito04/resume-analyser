package com.example.resume_analyzer.controller;

import com.example.resume_analyzer.service.AIService;
import com.example.resume_analyzer.service.PDFService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AnalysisController {

    private final PDFService pdfService;
    private final AIService aiService;


    @PostMapping("/extract")
    public ResponseEntity<String> extractText(@RequestPart("file") MultipartFile file ) throws Exception {
        String response =pdfService.extractText(file);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/analyze")
    public ResponseEntity<String> getAnalysis(@RequestBody String rText, String jobD) throws Exception {
        String response = aiService.generateAnalysis(rText,jobD);
        return ResponseEntity.ok(response);
    }
}
