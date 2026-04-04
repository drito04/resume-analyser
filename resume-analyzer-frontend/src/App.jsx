import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useState } from 'react'
import { Box, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Alert} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import './App.css'
import UploadForm from './components/UploadForm';
import AnalysisResult from './components/AnalysisResult';
import Header from './components/Header';

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const handleAnalyze = async (file, jobDescription) => {
    setError(null);
    setResults(null);
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jobDescription);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error');
      }

      const data = await response.json();
      setResults(data);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, gap: 3}}>
        <CircularProgress />
        <Typography variant="h6" color="text.secondary">
          Analyzing your resume...
          </Typography>
      </Box>
    );
  }

  if(error) {
    return (
      <Box sx={{maxWidth: 600, mx: 'auto', mt: 8, px: 3}}>
        <Alert severity="error" sx={{mb: 2}}>{error}</Alert>
        <Button variant="outlined" onClick={() => setError(null)}>
          Try Again
        </Button>
      </Box>
    );
  }

  if (results) {
    return (
      <AnalysisResult
            results={results} 
            onReset={() => setResults(null)} 
        />
    );
  }

  return (
    <>
      <Header />
      <UploadForm onSubmit={handleAnalyze} />
    </>
  );
}
export default App
