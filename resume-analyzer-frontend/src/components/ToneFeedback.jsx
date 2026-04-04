import { Box, Typography } from '@mui/material';

export default function ToneFeedback({ toneFeedback }) {
    return (
        <Box sx={{
            width: '100%',
            borderRadius: 3,
            border: '1px solid rgba(99,102,241,0.25)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)',
            p: 3,
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative accent */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 4,
                height: '100%',
                background: 'linear-gradient(180deg, #6366f1, #8b5cf6)',
                borderRadius: '3px 0 0 3px',
            }} />

            <Box sx={{ pl: 2 }}>
                <Typography sx={{
                    fontSize: '0.7rem',
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: '#818cf8',
                    mb: 1,
                    fontWeight: 600,
                }}>
                    🎯 Tone & Language
                </Typography>
                <Typography sx={{
                    color: '#94a3b8',
                    lineHeight: 1.8,
                    fontSize: '0.95rem',
                }}>
                    {toneFeedback}
                </Typography>
            </Box>
        </Box>
    );
}