import { Box, Typography } from '@mui/material';

const sectionConfig = {
    'Strengths':     { emoji: '💪', accent: '#22c55e' },
    'Suggestions':   { emoji: '💡', accent: '#f59e0b' },
    'Keyword Gaps':  { emoji: '🔑', accent: '#ef4444' },
};

export default function FeedbackSection({ title, items }) {
    const config = sectionConfig[title] || { emoji: '📌', accent: '#6366f1' };

    return (
        <Box sx={{
            width: '100%',
            borderRadius: 3,
            border: `1px solid ${config.accent}22`,
            background: '#0f172a',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <Box sx={{
                px: 3,
                py: 2,
                borderBottom: `1px solid ${config.accent}18`,
                background: `${config.accent}0a`,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
            }}>
                <Typography sx={{ fontSize: '1.1rem' }}>{config.emoji}</Typography>
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: config.accent,
                }}>
                    {title}
                </Typography>
                {items && items.length > 0 && (
                    <Box sx={{
                        ml: 'auto',
                        px: 1.5,
                        py: 0.3,
                        borderRadius: 10,
                        background: `${config.accent}18`,
                        border: `1px solid ${config.accent}33`,
                    }}>
                        <Typography sx={{ fontSize: '0.7rem', color: config.accent, fontWeight: 600 }}>
                            {items.length}
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Items */}
            <Box sx={{ px: 3, py: 1 }}>
                {items && items.length > 0 ? (
                    items.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 2,
                                py: 1.5,
                                borderBottom: index < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            }}
                        >
                            <Box sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: config.accent,
                                flexShrink: 0,
                                mt: '8px',
                                opacity: 0.7,
                            }} />
                            <Typography sx={{
                                color: '#94a3b8',
                                fontSize: '0.9rem',
                                lineHeight: 1.75,
                            }}>
                                {item}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{
                        color: 'rgba(255,255,255,0.2)',
                        fontStyle: 'italic',
                        fontSize: '0.85rem',
                        py: 2,
                    }}>
                        None identified.
                    </Typography>
                )}
            </Box>
        </Box>
    );
}