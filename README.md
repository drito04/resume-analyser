# 📄 Smart Resume Analyser

An AI-powered full-stack web application that analyses resumes against job descriptions, providing ATS compatibility scores, keyword gap analysis, tone feedback, and actionable improvement suggestions — powered by Google Gemini.

---

## 🖥️ Live Demo

> **Frontend:** [your-app.vercel.app](https://your-app.vercel.app)  
> **Backend API:** [your-api.railway.app](https://your-api.railway.app)

---

## ✨ Features

- **ATS Score** — Calculates an ATS compatibility score out of 100 based on resume quality and job description alignment
- **Keyword Gap Analysis** — Identifies keywords present in the job description but missing from the resume
- **Tone & Language Feedback** — Evaluates the clarity, tone, and language quality of the resume
- **Actionable Suggestions** — Provides specific, prioritised recommendations to improve the resume
- **Strengths Identification** — Highlights what the resume already does well
- **Optional Job Description** — Works with or without a job description; keyword analysis is skipped gracefully when none is provided

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework and build tool |
| Material UI (MUI v7) | Component library and theming |

### Backend
| Technology | Purpose |
|---|---|
| Java 24 | Core language |
| Spring Boot 3.x | REST API framework |
| Spring WebFlux (WebClient) | HTTP client for Gemini API calls |
| Apache PDFBox 3.x | PDF text extraction |
| Jackson | JSON serialisation / deserialisation |
| Lombok | Boilerplate reduction |

### AI
| Technology | Purpose |
|---|---|
| Google Gemini 3 Flash | Resume analysis and feedback generation |

---

## 📁 Project Structure

```
smart-resume-analyser/
│
├── resume-analyzer-backend/          # Spring Boot backend
│   └── src/main/java/com/example/
│       ├── controller/
│       │   └── AnalysisController.java
│       ├── service/
│       │   ├── PdfService.java
│       │   └── AIService.java
│       ├── model/
│       │   ├── ResumeAnalysis.java
│       │   └── ErrorResponse.java
│       └── exception/
│           └── GlobalExceptionHandler.java
│
└── resume-analyzer-frontend/         # React frontend
    └── src/
        ├── components/
        │   ├── Header.jsx
        │   ├── UploadForm.jsx
        │   ├── AnalysisResult.jsx
        │   ├── ScoreCard.jsx
        │   ├── ToneFeedback.jsx
        │   └── FeedbackSection.jsx
        └── App.jsx
```

---

## 🚀 Running Locally

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Maven
- A Google Gemini API key ([get one free at aistudio.google.com](https://aistudio.google.com))

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/smart-resume-analyser.git
cd smart-resume-analyser
```

---

### 2. Run the Backend

```bash
cd resume-analyzer-backend
```

Create an `application.properties` file at `src/main/resources/` with the following:

```properties
gemini.api.key=your_gemini_api_key_here
gemini.api.url=https://generativelanguage.googleapis.com
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

Then run:

```bash
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

---

### 3. Run the Frontend

```bash
cd resume-analyzer-frontend
```

Create a `.env.development` file:

```
VITE_API_BASE_URL=http://localhost:8080
```

Then run:

```bash
npm install
npm run dev
```

The frontend will start on **http://localhost:5173**

---

## 🔌 API Reference

### `POST /api/analyze`

Analyses a resume PDF against an optional job description.

**Request** — `multipart/form-data`

| Field | Type | Required | Description |
|---|---|---|---|
| `file` | File (.pdf) | ✅ Yes | The resume PDF to analyse |
| `jobDescription` | String | ❌ No | Job description text for keyword matching |

**Success Response** — `200 OK`

```json
{
  "atsScore": 74,
  "keywordGaps": ["Docker", "Agile", "CI/CD"],
  "toneFeedback": "The resume uses professional language but relies on passive voice in several project descriptions.",
  "suggestions": [
    "Replace 'helped develop' with strong action verbs like 'Engineered' or 'Built'",
    "Quantify impact in project descriptions — add metrics where possible"
  ],
  "strengths": [
    "Strong technical keyword density",
    "Clear educational background with relevant specialisation"
  ]
}
```

**Error Response** — `400 / 503 / 500`

```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Only PDF files are supported.",
  "timestamp": "2026-03-25 01:03:15"
}
```

---

## ⚙️ Environment Variables

### Backend (`application.properties`)

| Variable | Description |
|---|---|
| `gemini.api.key` | Your Google Gemini API key |
| `gemini.api.url` | Gemini base URL (`https://generativelanguage.googleapis.com`) |

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend base URL (`http://localhost:8080` for local) |

---

## 🚢 Deployment

| Service | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Railway](https://railway.app) |

Set `VITE_API_BASE_URL` in Vercel's environment variables to point to your Railway backend URL before deploying.

---

## 📸 Screenshots

> _Add screenshots here after deployment_

| Upload Screen | Results Screen |
|---|---|
| ![Upload](screenshots/upload.png) | ![Results](screenshots/results.png) |

---

## 🔮 Planned Features

- [ ] Resume comparison mode — compare two resumes against the same JD
- [ ] History — save and revisit past analyses
- [ ] Export results as PDF report
- [ ] Support for DOCX resume format

---

## 👨‍💻 Author

**Ritobrata** — B.Tech CSE (AI & ML), Techno Main Saltlake  
[GitHub](https://github.com/yourusername) · [LinkedIn](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
