import { Box, Typography, LinearProgress } from "@mui/material";

export default function ScoreCard({ score }) {

    const scoreColor = score >= 75 ? '#4caf50' : score >= 50 ? '#ff9800' : '#f44336';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, gap: 2 }}>
            <Typography variant="h5" fontWeight={600}>
                Your Resume Score
            </Typography>
            <Typography sx={{ fontSize: '4rem', fontWeight: 700, color: scoreColor, lineHeight: 1 }}>
                {score}
            </Typography>
            <Box sx={{ width: '100%', mt: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={score}
                    sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: scoreColor,
                            borderRadius: 6,
                        }
                    }}
                />
            </Box>
        </Box>
    );
}