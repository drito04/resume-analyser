import { Box, Typography } from "@mui/material";

export default function ScoreCard({ score }) {
    const scoreColor = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
    const label = score >= 75 ? 'Excellent' : score >= 50 ? 'Needs Work' : 'Poor';

    const radius = 70;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <Box sx={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: 4,
            p: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            width: '100%',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            border: '1px solid rgba(255,255,255,0.06)',
        }}>
            {/* Circular Score Ring */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background ring */}
                    <circle
                        stroke="rgba(255,255,255,0.08)"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* Score ring */}
                    <circle
                        stroke={scoreColor}
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                    />
                </svg>
                {/* Score number in center */}
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}>
                    <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
                        {score}
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>
                        / 100
                    </Typography>
                </Box>
            </Box>

            {/* Right side text */}
            <Box>
                <Typography sx={{
                    fontSize: '0.7rem',
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    mb: 0.5,
                }}>
                    ATS Compatibility Score
                </Typography>
                <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.1 }}>
                    {label}
                </Typography>
                <Box sx={{
                    display: 'inline-block',
                    mt: 1.5,
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 2,
                    background: `${scoreColor}22`,
                    border: `1px solid ${scoreColor}44`,
                }}>
                    <Typography sx={{ fontSize: '0.75rem', color: scoreColor, fontWeight: 600 }}>
                        {score >= 75 ? 'Ready to submit' : score >= 50 ? 'Some improvements needed' : 'Significant revision required'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}