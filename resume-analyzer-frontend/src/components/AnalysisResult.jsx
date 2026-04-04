import { Box, Button } from "@mui/material";
import ScoreCard from "./ScoreCard";
import ToneFeedback from "./ToneFeedback";
import FeedbackSection from "./FeedbackSection";

export default function AnalysisResult({ results, onReset }) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, gap: 3}}>
            <ScoreCard score={results.atsScore} />
            <ToneFeedback toneFeedback={results.toneFeedback} />
            {results.keywordGaps.length > 0 && <FeedbackSection title="Keyword Gaps" items={results.keywordGaps} />}
            <FeedbackSection title="Suggestions" items={results.suggestions} />
            <FeedbackSection title="Strengths" items={results.strengths} />
            <Button variant="outlined" onClick={ onReset } sx={{mt: 3, mb: 5}}>    
                Analyze Another Resume    
            </Button>
        </Box>
    );
}