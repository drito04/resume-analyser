import { Typography, Paper } from '@mui/material';

export default function ToneFeedback({ toneFeedback }) {
    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
                Tone & Language
            </Typography>
            <Typography variant="h6" fontWeight={100} gutterBottom>
                {toneFeedback}
            </Typography>
        </Paper>
    );
}