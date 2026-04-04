import { Box, Typography, Button, Container } from "@mui/material";
import ScoreCard from "./ScoreCard";
import ToneFeedback from "./ToneFeedback";
import FeedbackSection from "./FeedbackSection";

export default function AnalysisResult({ results, onReset }) {
    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 60%, #0a0f1e 100%)',
            py: 6,
        }}>
            <Container maxWidth="md">

                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{
                        fontSize: '0.7rem',
                        letterSpacing: 4,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.25)',
                        mb: 1,
                    }}>
                        Analysis Complete
                    </Typography>
                    <Typography sx={{
                        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                        fontWeight: 800,
                        color: '#f1f5f9',
                        lineHeight: 1.1,
                    }}>
                        Resume Report
                    </Typography>
                </Box>

                {/* Score Card */}
                <Box sx={{ mb: 3 }}>
                    <ScoreCard score={results.atsScore} />
                </Box>

                {/* Tone Feedback */}
                <Box sx={{ mb: 3 }}>
                    <ToneFeedback toneFeedback={results.toneFeedback} />
                </Box>

                {/* Feedback Sections */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
                    <FeedbackSection title="Strengths" items={results.strengths} />
                    <FeedbackSection title="Suggestions" items={results.suggestions} />
                    <FeedbackSection title="Keyword Gaps" items={results.keywordGaps} />
                </Box>

                {/* Reset Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={onReset}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.12)',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: '0.85rem',
                            letterSpacing: 1,
                            textTransform: 'none',
                            '&:hover': {
                                background: 'rgba(255,255,255,0.05)',
                                borderColor: 'rgba(255,255,255,0.25)',
                                color: '#f1f5f9',
                            }
                        }}
                    >
                        ← Analyze Another Resume
                    </Button>
                </Box>

            </Container>
        </Box>
    );
}