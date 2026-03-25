package com.example.resume_analyzer;

import com.example.resume_analyzer.service.PDFService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertFalse;

@SpringBootTest
class PDFServiceTest {

    @Autowired
    private PDFService pdfService;

    @Test
    void testExtractText() throws Exception {
        // Load a real PDF from your computer — update this path
        byte[] pdfBytes = Files.readAllBytes(Path.of("D:/Java/Projects/resume-analyser/test_pdf.pdf"));

        MockMultipartFile mockFile = new MockMultipartFile(
                "file",            // field name
                "sample.pdf",      // original filename
                "application/pdf", // content type
                pdfBytes           // actual file bytes
        );

        String extractedText = pdfService.extractText(mockFile);

        System.out.println("--- EXTRACTED TEXT ---");
        System.out.println(extractedText);
        System.out.println("--- END ---");

        assertFalse(extractedText.isEmpty());
    }
}