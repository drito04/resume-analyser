package com.example.resume_analyzer.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PDFService {
    public String extractText(MultipartFile file) throws Exception  {

//      Guard clause: Reject if file is empty
        if(file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }

//      Guard clause: Reject if file is not a PDF
        String originalFilename = file.getOriginalFilename();
        if(originalFilename == null || !originalFilename.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF files supported!");
        }

//       Loading PDF from uploaded file's input stream
        try(PDDocument document = Loader.loadPDF(file.getBytes())) {

            PDFTextStripper stripper = new PDFTextStripper();
            String extractedText = stripper.getText(document);

            if (extractedText == null || extractedText.trim().isEmpty()) {
                throw new IllegalArgumentException("Could not extract text from this PDF.");
            }

            return extractedText.trim();
        }
    }
}
