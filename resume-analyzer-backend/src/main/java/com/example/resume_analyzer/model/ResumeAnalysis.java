package com.example.resume_analyzer.model;

import lombok.Data;

import java.util.List;

@Data

public class ResumeAnalysis {

    private int atsScore;
    private List<String> keywordGaps;
    private String toneFeedback;
    private List<String> suggestions;
    private List<String> strengths;

}
