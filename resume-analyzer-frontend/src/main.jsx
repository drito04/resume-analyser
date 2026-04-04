import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

const themeOptions ={
  "palette": {
    "mode": "dark"
  }
}
const myTheme = createTheme(themeOptions);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />          {/* resets browser default styles */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
