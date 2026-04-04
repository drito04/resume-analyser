import { Box, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{
      width: '100%',
      px: 4,
      py: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(10, 15, 30, 0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo + Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{
          width: 32,
          height: 32,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
        }}>
          <img 
            src="/gemini-svg (1).svg" 
            alt="Logo" 
            style={{ width: '100%', height: '100%' }} 
          />
        </Box>
        <Typography sx={{
          fontWeight: 700,
          fontSize: '1rem',
          color: '#f1f5f9',
          letterSpacing: 0.3,
        }}>
          Smart Resume Analyser
        </Typography>
      </Box>

      {/* Subtle badge */}
      <Box sx={{
        px: 1.5,
        py: 0.4,
        borderRadius: 10,
        border: '1px solid rgba(99,102,241,0.3)',
        background: 'rgba(99,102,241,0.08)',
      }}>
        <Typography sx={{
          fontSize: '0.7rem',
          color: '#818cf8',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          AI Powered
        </Typography>
      </Box>
    </Box>
  );
}