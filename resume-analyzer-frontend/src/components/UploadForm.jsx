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

    // ✅ Moved inside the component so it can access file and jobDescription from state
    const handleSubmit = () => {
        onSubmit(file, jobDescription);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            

            {/* Upload button — centered with dotted border */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 3,
            }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        border: '2px dashed',
                        borderColor: 'primary.main',
                        px: 4,
                        py: 2,
                        '&:hover': {
                            border: '2px dashed',
                            borderColor: 'primary.dark',
                            backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        }
                    }}
                >
                    {file ? file.name : 'Upload Resume'}
                    <VisuallyHiddenInput
                        type="file"
                        accept=".pdf"
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                </Button>
            </Box>

            <Box sx={{ mx: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    label="Paste job description here (Optional)"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    sx={{ mb: 4 }}
                />

                <Button
                    sx={{ mb: 4 }}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!file || loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Analyze Resume"}
                </Button>
            </Box>
        </Container>    
    );
}