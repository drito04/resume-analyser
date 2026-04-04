import { useState } from 'react'
import { Box, Container, TextField, Typography, Button, CircularProgress } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadForm({ onSubmit }) {

    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleSubmit = () => {
        onSubmit(file, jobDescription);
    };

    return (
        <Box sx={{
            minHeight: 'calc(100vh - 57px)',
            background: 'linear-gradient(160deg, #0a0f1e 0%, #0f172a 60%, #0a0f1e 100%)',
            display: 'flex',
            alignItems: 'center',
        }}>
            <Container maxWidth="sm">

                {/* Hero Text */}
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Typography sx={{
                        fontSize: '0.7rem',
                        letterSpacing: 4,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.25)',
                        mb: 2,
                    }}>
                        AI-Powered Resume Analysis
                    </Typography>
                    <Typography sx={{
                        fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
                        fontWeight: 800,
                        color: '#f1f5f9',
                        lineHeight: 1.1,
                        mb: 1.5,
                    }}>
                        Get Your Resume
                        <Box component="span" sx={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}> Scored.</Box>
                    </Typography>
                    <Typography sx={{
                        color: 'rgba(255,255,255,0.35)',
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                    }}>
                        Upload your resume and optionally paste a job description
                        to get an ATS score, keyword gaps, and actionable feedback.
                    </Typography>
                </Box>

                {/* Upload Card */}
                <Box sx={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    p: 4,
                }}>

                    {/* File Upload Area */}
                    <Button
                        component="label"
                        fullWidth
                        sx={{
                            border: '2px dashed rgba(99,102,241,0.35)',
                            borderRadius: 3,
                            py: 3,
                            mb: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            color: file ? '#818cf8' : 'rgba(255,255,255,0.25)',
                            background: file ? 'rgba(99,102,241,0.06)' : 'transparent',
                            textTransform: 'none',
                            transition: 'all 0.2s',
                            '&:hover': {
                                border: '2px dashed rgba(99,102,241,0.6)',
                                background: 'rgba(99,102,241,0.08)',
                                color: '#818cf8',
                            }
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: '2rem' }} />
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                            {file ? file.name : 'Click to upload your resume'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.75rem', opacity: 0.6 }}>
                            {file ? 'Click to change file' : 'PDF files only'}
                        </Typography>
                        <VisuallyHiddenInput
                            type="file"
                            accept=".pdf"
                            onChange={(event) => setFile(event.target.files[0])}
                        />
                    </Button>

                    {/* Job Description */}
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        variant="outlined"
                        placeholder="Paste job description here (Optional) — enables keyword gap analysis"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        sx={{
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                color: '#cbd5e1',
                                fontSize: '0.9rem',
                                '& fieldset': {
                                    borderColor: 'rgba(255,255,255,0.08)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(99,102,241,0.4)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6366f1',
                                },
                            },
                            '& .MuiInputBase-input::placeholder': {
                                color: 'rgba(255,255,255,0.2)',
                                opacity: 1,
                            },
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={!file || loading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            letterSpacing: 0.5,
                            textTransform: 'none',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                boxShadow: '0 4px 24px rgba(99,102,241,0.5)',
                            },
                            '&.Mui-disabled': {
                                background: 'rgba(255,255,255,0.06)',
                                color: 'rgba(255,255,255,0.2)',
                            }
                        }}
                    >
                        {loading
                            ? <CircularProgress size={22} sx={{ color: 'rgba(255,255,255,0.5)' }} />
                            : 'Analyze Resume →'
                        }
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}