# 📂 Career Analyzer

Career Analyzer is a premium, interactive client-side web application designed to help students optimize their resumes, map their skills to modern industry roles, and practice mock behavioral and video interviews with simulated real-time AI telemetry feed feedback.

Built entirely with standard client-side technologies, the application operates with absolute privacy—your resume text and video streams never leave your web browser.

---

## 🚀 Live Demo & Key Features

### 1. 📊 Resume Grading Dashboard
* **Dynamic ATS Grader**: Scores your resume out of 100 based on formatting, required sections, social portfolio link presence, and action verb ratios.
* **Weak Point Detection**: Highlights actionable suggestions to quickly increase resume readability and grading rank.
* **Impact Metric Scan**: Detects percentage figures, dollar amounts, and numeric data to ensure achievements are quantifiable.

### 2. 🗺️ Career Pathfinder
* **Skill Gap Analysis**: Compares parsed resume keywords against modern job profiles (Frontend, Data Science, Full Stack, UX/UI, Product Management).
* **Personalized Roadmap**: Generates structured step-by-step guides with direct learning resources for missing skills.

### 3. ✨ Resume Bullet Point Enhancer
* **X-Y-Z Optimizer**: Translates passive phrases (e.g., "was responsible for website layout") into metrics-focused, high-impact statements.
* **Power Verb Dictionary**: Interactive categories (Leadership, Creation, Improvement, Research) to insert terms at the cursor.

### 4. 💬 Conversational Interview Coach
* **Structured Q&A**: Simulates a live chat window asking tech-specific behavioral questions tailored to your parsed skills.
* **STAR Method Assessment**: Evaluates the length, detail, and structure of your replies.

### 5. 🎥 AI Video Mock Interview (Webcam Telemetry Simulator)
* **Webcam & Audio Overlay**: Accesses the webcam and overlays visual facial mesh bounding shapes and audio waveform oscillations.
* **Telemetry Diagnostics**: Fluctuates metrics in real-time for Eye Contact Stability %, speech Pace (WPM), speech decibels (dB), and Posture Stabilizer %.
* **Diagnostic Report Cards**: Outputs visual feedback bars and actionable bullet suggestions after a 3-question mock session.

---

## 🛠️ Technology Stack

* **Structure**: HTML5
* **Styling**: Vanilla CSS3 (Custom Glassmorphism UI tokens, glowing state variables, and slide-up transition animations)
* **Logic**: Vanilla JavaScript ES6+ (No bulky framework builds, ensuring instant page-load speeds)
* **Libraries (CDN)**: 
  * [PDF.js by Mozilla](https://mozilla.github.io/pdf.js/) (Client-side PDF text block extractor)
  * [FontAwesome Icons](https://fontawesome.com/) (Vector iconography)

---

## 💻 Quick Start (Run Locally)

Since the app has no backend dependencies, you can run it directly:

### Method A: Single-click Launch
1. Download the files to your computer.
2. Locate `index.html` and double-click to open it in Chrome, Edge, Safari, or Firefox.

### Method B: Local Server (Recommended for camera testing)
For camera APIs to load reliably in secure contexts, serving the file is recommended:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx http-server -p 8080
```
Open **`http://localhost:8080`** in your browser.

---

## 🔒 Absolute Privacy Model

Unlike online tools that store resume text on remote clouds, Career Analyzer runs **100% inside your local sandbox**. All text parsing, visual analytics, audio waves, and webcam coordinates are processed on your local machine and deleted immediately when you reload the browser tab.
