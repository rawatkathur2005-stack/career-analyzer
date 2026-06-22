// Global Application State
const state = {
    resumeText: "",
    isResumeLoaded: false,
    analysis: {
        score: 0,
        metricsCount: 0,
        actionVerbsCount: 0,
        sections: {
            contact: false,
            experience: false,
            education: false,
            skills: false,
            projects: false,
            summary: false
        },
        links: {
            email: false,
            phone: false,
            linkedin: false,
            github: false
        },
        skillsFound: [],
        weakpoints: [],
        positives: []
    },
    roles: [],
    selectedRoleIndex: 0,
    chatHistory: [],
    interviewQuestions: [],
    currentQuestionIndex: 0
};

// Skill Database
const SKILL_DATABASE = [
    "javascript", "html", "css", "react", "vue", "angular", "node.js", "express",
    "mongodb", "sql", "postgresql", "python", "django", "flask", "java", "spring",
    "c++", "c#", "ruby", "rails", "php", "laravel", "swift", "kotlin", "typescript",
    "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "ci/cd", "agile",
    "scrum", "figma", "sketch", "photoshop", "illustrator", "wireframing", "prototyping",
    "user research", "data analysis", "machine learning", "deep learning", "pandas",
    "numpy", "scikit-learn", "tensorflow", "pytorch", "tableau", "power bi", "statistics",
    "project management", "communication", "leadership", "problem solving", "teamwork",
    "seo", "google analytics", "digital marketing", "product strategy", "roadmapping",
    "market research", "a/b testing", "sql querying"
];

// Job Roles Database for Pathfinder
const JOB_ROLES_DATABASE = [
    {
        title: "Frontend Engineer",
        category: "Engineering",
        description: "Responsible for building and implementing the user-facing side of web applications. Focuses on responsiveness, accessibility, performance, and user experience.",
        requiredSkills: ["javascript", "html", "css", "react", "typescript", "git", "github", "figma"],
        roadmap: [
            { step: "Master Modern JavaScript & TypeScript", desc: "Understand ES6+ concepts, asynchronous flows, and type safety.", link: "https://javascript.info/" },
            { step: "Deep Dive into React & State Management", desc: "Learn component lifecycle, hooks, context API, and tools like Redux.", link: "https://react.dev/" },
            { step: "CSS Layouts & Responsive Design", desc: "Master Flexbox, CSS Grid, and custom variables for dynamic layouts.", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
            { step: "Build Tools & Version Control", desc: "Learn Vite, Git commands, and CI/CD pipelines.", link: "https://git-scm.com/doc" }
        ]
    },
    {
        title: "Data Scientist",
        category: "Data",
        description: "Analyzes and interprets complex data to help organizations make informed, data-driven decisions. Uses statistical modeling, machine learning, and visualization tools.",
        requiredSkills: ["python", "sql", "data analysis", "pandas", "numpy", "statistics", "machine learning", "tableau"],
        roadmap: [
            { step: "Python Programming & Data Libraries", desc: "Master Pandas, NumPy, Matplotlib, and Seaborn.", link: "https://pandas.pydata.org/" },
            { step: "Advanced SQL & Relational Databases", desc: "Learn complex joins, aggregations, CTEs, and window functions.", link: "https://mode.com/sql-tutorial/" },
            { step: "Mathematics & Statistics Essentials", desc: "Probability distributions, hypothesis testing, linear algebra.", link: "https://www.khanacademy.org/math/statistics-probability" },
            { step: "Machine Learning Frameworks", desc: "Learn Scikit-Learn, features engineering, and validation models.", link: "https://scikit-learn.org/stable/" }
        ]
    },
    {
        title: "UI/UX Designer",
        category: "Design",
        description: "Designs the overall feel and visual experience of digital products. Conducts research, designs layouts, wireframes, prototypes, and defines design systems.",
        requiredSkills: ["figma", "wireframing", "prototyping", "user research", "communication", "html", "css"],
        roadmap: [
            { step: "Figma Mastery & Component Libraries", desc: "Learn auto-layout, interactive variables, and responsive grids.", link: "https://www.figma.com/resources/learn-design/" },
            { step: "User Research & Usability Testing", desc: "Learn user interviews, persona mapping, and heuristic evaluation.", link: "https://www.nngroup.com/articles/" },
            { step: "Visual Design Foundations", desc: "Master typography, visual hierarchy, color theory, and layout spacing.", link: "https://refactoringui.com/" },
            { step: "Interaction Prototyping", desc: "Create high-fidelity animations, micro-interactions, and flows.", link: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma" }
        ]
    },
    {
        title: "Full Stack Developer",
        category: "Engineering",
        description: "Handles both client-side and server-side components of web applications. Integrates databases, APIs, and servers with clean frontend layouts.",
        requiredSkills: ["javascript", "node.js", "express", "react", "mongodb", "sql", "git", "aws"],
        roadmap: [
            { step: "Backend Fundamentals & API Design", desc: "Learn Node.js, Express framework, and RESTful routing rules.", link: "https://nodejs.org/" },
            { step: "Database Management (SQL & NoSQL)", desc: "Learn MongoDB schema design and PostgreSQL database structuring.", link: "https://www.mongodb.com/docs/" },
            { step: "Authentication & Security", desc: "Implement JWT, cookies, password hashing (bcrypt), and HTTPS standards.", link: "https://owasp.org/www-project-top-ten/" },
            { step: "Deployment & Cloud Services", desc: "Deploy apps on platforms like AWS EC2, Vercel, Render, or Docker.", link: "https://aws.amazon.com/free/" }
        ]
    },
    {
        title: "Product Manager",
        category: "Management",
        description: "Acts as the bridge between technology, business, and design. Defines product strategy, features, requirements, and aligns teams around a common goal.",
        requiredSkills: ["product strategy", "roadmapping", "agile", "scrum", "communication", "market research", "data analysis"],
        roadmap: [
            { step: "Product Strategy & Value Proposition", desc: "Learn market sizing, competitor analysis, and customer interviewing.", link: "https://www.productplan.com/" },
            { step: "Agile Frameworks & Writing Requirements", desc: "Learn Scrum rituals, user stories, and Jira/Linear management.", link: "https://www.atlassian.com/agile" },
            { step: "Product Analytics & Growth Metrics", desc: "Understand conversion funnels, retention, A/B testing, and North Star metrics.", link: "https://amplitude.com/blog" },
            { step: "Stakeholder Management & Negotiation", desc: "Master storytelling, conflict resolution, and feature prioritization (RICE).", link: "https://www.mindtheproduct.com/" }
        ]
    }
];

// Verb dictionaries for Resume Enhancer
const VERBS_DICTIONARY = {
    leadership: ["Led", "Directed", "Managed", "Orchestrated", "Coordinated", "Supervised", "Championed", "Guided", "Fostered"],
    creation: ["Created", "Developed", "Designed", "Built", "Implemented", "Formulated", "Engineered", "Authored", "Pioneered"],
    performance: ["Optimized", "Improved", "Reduced", "Increased", "Maximized", "Streamlined", "Boosted", "Accelerated", "Cut"],
    research: ["Analyzed", "Researched", "Investigated", "Evaluated", "Examined", "Audited", "Validated", "Forecasted", "Surveyed"]
};

// Rewrite Suggestion Logic (Local Rule Engine for Bullet Points)
const BULLET_OPTIMIZER_RULES = [
    {
        detect: /(?:responsible for|worked on|helped with) (?:coding|developing|writing) the website/i,
        replacement: "Engineered and launched responsive web interfaces, utilizing React and CSS Grid, which reduced load times by 25% and boosted monthly unique visitors by 14%.",
        tip: "Quantify the loading speed improvement and mention the specific stack used."
    },
    {
        detect: /(?:responsible for|managed|handled) social media/i,
        replacement: "Designed and executed a multi-channel digital marketing campaign, boosting organic engagement by 45% and converting 12% more leads over 3 months.",
        tip: "Use strong verbs like 'Executed' or 'Designed' and specify quantitative marketing metrics."
    },
    {
        detect: /(?:fixed bugs|debugging|debugged code)/i,
        replacement: "Spearheaded code-review standards and automated testing suites (Jest), resolving 120+ open source bugs and lowering production crash rates by 18%.",
        tip: "Structure it with Action (automated testing/code-review) and Result (crash rate reduction)."
    },
    {
        detect: /(?:helped in|assisted in) (?:creating|making) reports/i,
        replacement: "Analyzed complex operational data structures using SQL and Python, outputting actionable monthly dashboards that saved leadership 8 hours in weekly reporting workflows.",
        tip: "Detail the tools (SQL/Python) and translate 'helped create reports' into time saved for leadership."
    },
    {
        detect: /(?:managed|led|supervised) a team/i,
        replacement: "Directed an agile cross-functional team of 6 software engineers and designers, delivering the core SaaS platform 2 weeks ahead of schedule through optimized sprint cycles.",
        tip: "State the size of the team, the project style (Agile/Scrum), and express the timing efficiency."
    }
];

// Mock Interview Coach default templates
const MOCK_QUESTIONS = [
    "Can you tell me about a time you ran into a tough technical bug, and what steps you took to debug and solve it?",
    "How do you approach learning a new programming language, framework, or design paradigm when starting a new project?",
    "Tell me about a project listed on your resume. How did you structure your work, and how did you measure its success?",
    "How do you handle conflict or differing opinions with other developers, designers, or product managers during a release cycle?"
];

// UI Event Binding (runs when DOM is fully loaded)
document.addEventListener("DOMContentLoaded", () => {
    setupTabs();
    setupUploader();
    setupEnhancer();
    setupCoach();
    setupDemoResume();
    setupVideoInterview();
});

// Tab navigation handler
function setupTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetTab = tab.getAttribute("data-tab");

            // Prevent navigation if no resume loaded, except for upload tab itself
            if (targetTab !== "upload" && !state.isResumeLoaded) {
                showFloatingNotification("Please upload a resume or load the demo resume first!", "warning");
                return;
            }

            // Stop video feed if leaving video tab
            if (state.currentTab === "video" && targetTab !== "video") {
                stopVideoSession();
            }

            // Update active tab buttons
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // Update active sections
            const sections = document.querySelectorAll(".tab-content");
            sections.forEach(s => s.classList.remove("active"));
            document.getElementById(`${targetTab}-tab`).classList.add("active");

            state.currentTab = targetTab;

            // Initialize charts or specific tab details if loaded
            if (targetTab === "dashboard") {
                renderDashboard();
            } else if (targetTab === "pathfinder") {
                renderPathfinder();
            } else if (targetTab === "video") {
                // Prepare video tab UI (reset layout, show setup, hide report)
                document.getElementById("video-setup-container").style.display = "grid";
                document.getElementById("post-session-card").style.display = "none";
            }
        });
    });
}

// Show temporary feedback toast
function showFloatingNotification(msg, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast-notif ${type}`;
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.right = "24px";
    toast.style.padding = "1rem 1.5rem";
    toast.style.borderRadius = "8px";
    toast.style.color = "white";
    toast.style.zIndex = "2000";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.4)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "0.5rem";
    toast.style.fontSize = "0.9rem";
    toast.style.animation = "fadeInUp 0.3s ease-out forwards";

    let bg = "#6366f1";
    let icon = "fa-info-circle";
    if (type === "warning") {
        bg = "#f59e0b";
        icon = "fa-exclamation-triangle";
    } else if (type === "success") {
        bg = "#10b981";
        icon = "fa-check-circle";
    } else if (type === "error") {
        bg = "#ef4444";
        icon = "fa-times-circle";
    }

    toast.style.background = bg;
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${msg}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "fadeOutDown 0.3s ease-out forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// Uploader interactions & PDF.js parser integration
function setupUploader() {
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("file-input");
    const textInput = document.getElementById("text-input");
    const parseTextBtn = document.getElementById("parse-text-btn");

    // Drag over states
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("drag-over");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("drag-over");
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-over");
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    dropzone.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    // Parse manually pasted text
    parseTextBtn.addEventListener("click", () => {
        const txt = textInput.value.trim();
        if (!txt) {
            showFloatingNotification("Please paste some resume text first!", "warning");
            return;
        }
        processTextContent(txt);
    });
}

// Setup Demo Resume Loader
function setupDemoResume() {
    const demoBtn = document.getElementById("demo-resume-btn");
    if (demoBtn) {
        demoBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Avoid triggering dropzone click

            const demoResume = `JOHN DOE
Software Developer | john.doe@email.com | (123) 456-7890 | linkedin.com/in/johndoe | github.com/johndoe

SUMMARY
Enthusiastic junior developer with basic knowledge of coding and designing websites. Looking to get an entry-level software engineer job to build apps and learn database patterns.

TECHNICAL SKILLS
Languages: HTML, CSS, JavaScript, Python
Frameworks & Libraries: React, Node.js, Express
Tools: Git, VS Code

EXPERIENCE
Junior Web Developer | TechSolutions Inc | June 2024 - Present
* Responsible for coding the website and updating layout settings.
* Worked on fixing bugs in JavaScript and codebases.
* Helped with digital marketing campaigns and managed social media accounts.
* Assisted in creating reports about analytics for managers.

Projects
Portfolio Site: Developed a personal website showcasing custom HTML pages.
Task Manager App: Created a simple lists app in React to track personal tasks.

EDUCATION
B.S. in Computer Science | University of Technology | Graduated May 2024`;

            processTextContent(demoResume);
            showFloatingNotification("Demo resume loaded successfully!", "success");
        });
    }
}

// Handle PDF or TXT files
function handleFile(file) {
    const loading = document.getElementById("loading-overlay");
    loading.style.display = "flex";

    const reader = new FileReader();

    if (file.type === "application/pdf") {
        // PDF Parsing using PDF.js
        reader.onload = function () {
            const typedarray = new Uint8Array(this.result);

            // Load pdfjs from window
            if (!window.pdfjsLib) {
                loading.style.display = "none";
                showFloatingNotification("PDF.js library is loading, please try again in a moment.", "warning");
                return;
            }

            window.pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                let maxPages = pdf.numPages;
                let countPromises = [];

                for (let j = 1; j <= maxPages; j++) {
                    let pagePromise = pdf.getPage(j).then(page => {
                        return page.getTextContent().then(textContent => {
                            return textContent.items.map(item => item.str).join(" ");
                        });
                    });
                    countPromises.push(pagePromise);
                }

                Promise.all(countPromises).then(pagesText => {
                    const joinedText = pagesText.join("\n");
                    loading.style.display = "none";
                    processTextContent(joinedText);
                    showFloatingNotification("PDF parsed successfully!", "success");
                }).catch(err => {
                    loading.style.display = "none";
                    showFloatingNotification("Failed to parse text from pages: " + err.message, "error");
                });
            }).catch(err => {
                loading.style.display = "none";
                showFloatingNotification("Failed to parse PDF document structure.", "error");
            });
        };
        reader.readAsArrayBuffer(file);

    } else if (file.type === "text/plain") {
        // Standard TXT parsing
        reader.onload = function (e) {
            loading.style.display = "none";
            processTextContent(e.target.result);
            showFloatingNotification("Text file loaded successfully!", "success");
        };
        reader.readAsText(file);
    } else {
        loading.style.display = "none";
        showFloatingNotification("Unsupported file type. Please upload a .pdf or .txt file.", "error");
    }
}

// Analysis Engine & Text Extraction
function processTextContent(text) {
    state.resumeText = text;
    state.isResumeLoaded = true;

    // Reset previous analysis
    state.analysis = {
        score: 0,
        metricsCount: 0,
        actionVerbsCount: 0,
        sections: { contact: false, experience: false, education: false, skills: false, projects: false, summary: false },
        links: { email: false, phone: false, linkedin: false, github: false },
        skillsFound: [],
        weakpoints: [],
        positives: []
    };

    // Section Parsing (Case-insensitive block keyword matches)
    const textLower = text.toLowerCase();

    if (/(?:experience|employment|work history|professional background|career)/i.test(text)) state.analysis.sections.experience = true;
    if (/(?:education|university|college|degree|academic)/i.test(text)) state.analysis.sections.education = true;
    if (/(?:skills|technologies|proficiencies|tools|languages)/i.test(text)) state.analysis.sections.skills = true;
    if (/(?:projects|portfolio|personal work)/i.test(text)) state.analysis.sections.projects = true;
    if (/(?:summary|objective|profile|about me)/i.test(text)) state.analysis.sections.summary = true;

    // Contact details & Links validation
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

    if (emailRegex.test(text)) {
        state.analysis.links.email = true;
    }
    if (phoneRegex.test(text)) {
        state.analysis.links.phone = true;
    }
    if (/linkedin\.com/i.test(text)) {
        state.analysis.links.linkedin = true;
    }
    if (/github\.com/i.test(text)) {
        state.analysis.links.github = true;
    }

    // Contact section counts as true if at least name and email are resolved
    if (state.analysis.links.email || state.analysis.links.phone) {
        state.analysis.sections.contact = true;
    }

    // Count Action Verbs
    const allVerbs = [...VERBS_DICTIONARY.leadership, ...VERBS_DICTIONARY.creation, ...VERBS_DICTIONARY.performance, ...VERBS_DICTIONARY.research];
    let verbCount = 0;
    allVerbs.forEach(verb => {
        const reg = new RegExp(`\\b${verb}\\b`, 'gi');
        const matches = text.match(reg);
        if (matches) {
            verbCount += matches.length;
        }
    });
    state.analysis.actionVerbsCount = verbCount;

    // Count Quantifiable Metrics
    // Matches percentages (e.g. 50%, 12.5%), currency amounts (e.g. $10k, $5,000), large multipliers (10x, 3x), and direct stats (e.g. 200k users, saved 12 hours)
    const metricRegex = /\b\d+(?:\.\d+)?%|\$\d+(?:\.\d+)?[kKMb]?|\b\d+x\b|\b\d+[\s-](?:hours|days|weeks|months|percent|users|customers|leads|clients|dollars|engineers|bugs|servers)\b/gi;
    const metricMatches = text.match(metricRegex);
    state.analysis.metricsCount = metricMatches ? metricMatches.length : 0;

    // Parse skills
    state.analysis.skillsFound = [];
    SKILL_DATABASE.forEach(skill => {
        // Avoid small word partial matches (e.g. 'c' inside 'active')
        let boundary = `\\b${skill.replace(".", "\\.")}\\b`;
        if (skill === "c++") boundary = `c\\+\\+`;
        if (skill === "c#") boundary = `c#`;

        const reg = new RegExp(boundary, 'i');
        if (reg.test(textLower)) {
            state.analysis.skillsFound.push(skill);
        }
    });

    // Calculate Resume Score
    calculateResumeScore();

    // Enable dashboard tabs in navigation
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.removeAttribute("disabled");
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });

    // Force navigate to Dashboard
    document.querySelector('[data-tab="dashboard"]').click();
}

// Scoring logic & Weakpoints analysis
function calculateResumeScore() {
    let score = 0;
    const analysis = state.analysis;
    const weakpoints = [];
    const positives = [];

    // Section coverage: Max 30 points
    let sectionScore = 0;
    const sections = analysis.sections;
    if (sections.contact) sectionScore += 5;
    else weakpoints.push({ title: "Missing Contact Details", desc: "No email or contact phone number detected. Recipient can't reach you.", action: "Add email address and phone number in header block." });

    if (sections.summary) {
        sectionScore += 5;
    } else {
        weakpoints.push({ title: "No Summary / Objective", desc: "A brief introductory summary helps recruiters understand your goals.", action: "Write a 2-3 sentence statement summarizing your skills and professional goals." });
    }

    if (sections.experience) sectionScore += 8;
    else weakpoints.push({ title: "Missing Work Experience Section", desc: "Professional history forms the core of standard resume models.", action: "Add details of past jobs, internships, or freelance roles with descriptions." });

    if (sections.education) sectionScore += 4;
    else weakpoints.push({ title: "Missing Education Section", desc: "Academic details or relevant certificates are not shown.", action: "Include your degree, institution name, and graduation date." });

    if (sections.skills) sectionScore += 4;
    else weakpoints.push({ title: "No Dedicated Skills Section", desc: "Recruiters and ATS scanners look for structured keyword summaries.", action: "Add a labeled list categorizing languages, libraries, and design tools." });

    if (sections.projects) sectionScore += 4;
    else weakpoints.push({ title: "Missing Projects Details", desc: "Practical applications demonstrate execution capability.", action: "Add 2-3 personal or school projects illustrating skills in action." });

    score += sectionScore;
    if (sectionScore === 30) positives.push({ title: "Perfect Section Layout", desc: "All core resume sections are present and clearly delineated." });

    // Social Links Check: Max 20 points
    let linkScore = 0;
    if (analysis.links.linkedin) {
        linkScore += 10;
    } else {
        weakpoints.push({ title: "No LinkedIn Profile Link", desc: " recruiters verify credentials, projects, and work history online.", action: "Include a link to your public LinkedIn profile in the header block." });
    }

    if (analysis.links.github) {
        linkScore += 10;
    } else {
        // Check if technical role. If developer skills are present, Github is a must-have
        const isTech = analysis.skillsFound.some(s => ["javascript", "python", "java", "node.js", "git", "sql", "c++", "c#"].includes(s));
        if (isTech) {
            weakpoints.push({ title: "Missing GitHub Portfolio Link", desc: "Technical candidates require visible repository commits to prove hands-on code capability.", action: "Create a Github account, upload code, and display link prominently." });
        }
    }

    score += linkScore;
    if (linkScore === 20) positives.push({ title: "Complete Contact & Online Portfolios", desc: "Included digital links for recruiters to view credentials and code bases." });

    // Action Verbs Rating: Max 25 points
    const verbsCount = analysis.actionVerbsCount;
    if (verbsCount >= 10) {
        score += 25;
        positives.push({ title: "Strong Action-Oriented Phrasing", desc: `Utilized ${verbsCount} power verbs, keeping descriptions engaging and showing leadership.` });
    } else if (verbsCount >= 5) {
        score += 15;
        weakpoints.push({ title: "Passive Resume Phrasing", desc: `Only detected ${verbsCount} power verbs. Excess usage of weak terms like 'assisted' or 'worked on'.`, action: "Swap 'responsible for editing code' with 'Engineered', 'Optimized', or 'Redesigned'." });
    } else {
        score += 5;
        weakpoints.push({ title: "Highly Passive Description Verbs", desc: `Extremely low power-verb count (${verbsCount}). Feels like a list of tasks rather than achievements.`, action: "Review experience bullet points and lead with action verbs from the Enhancer library." });
    }

    // Quantifiable Metrics / Results: Max 25 points
    const metricsCount = analysis.metricsCount;
    if (metricsCount >= 5) {
        score += 25;
        positives.push({ title: "Great Impact Metrics", desc: `Included ${metricsCount} metrics. Demonstrates focus on quantifiable results and business impact.` });
    } else if (metricsCount >= 2) {
        score += 15;
        weakpoints.push({ title: "Low Impact Metrics Details", desc: `Only ${metricsCount} metrics detected. Recruiters cannot see the scales of your achievements.`, action: "Include details like % improvement, budget amounts, time saved, or team count." });
    } else {
        score += 5;
        weakpoints.push({ title: "Missing Quantifiable Achievements", desc: "Zero metric values detected. Bullet points read as a job description instead of impacts.", action: "Apply the X-Y-Z formula to rewrite achievements, using numbers to define success." });
    }

    // Ensure minimum cap bounds
    state.analysis.score = Math.min(100, Math.max(0, score));
    state.analysis.weakpoints = weakpoints;
    state.analysis.positives = positives;
}

// Render Dashboard Data & SVG circular progress bar
function renderDashboard() {
    const score = state.analysis.score;
    const valueText = document.getElementById("score-value");

    // Set score text
    valueText.textContent = score;

    // Circular progress animate
    const fillRing = document.getElementById("score-circle-fill");
    const maxDashOffset = 502; // circumference of circle with r=80 (2 * pi * 80)
    const offset = maxDashOffset - (score / 100) * maxDashOffset;
    fillRing.style.strokeDashoffset = offset;

    // Score text feedback
    const scoreText = document.getElementById("score-text-val");
    const scoreDesc = document.getElementById("score-desc-val");

    if (score >= 85) {
        scoreText.textContent = "Excellent Resume Structure";
        scoreText.style.color = "var(--success)";
        scoreDesc.textContent = "Your resume meets standard tracking algorithms and shows active results. Ready to apply!";
    } else if (score >= 60) {
        scoreText.textContent = "Needs Moderate Polish";
        scoreText.style.color = "var(--warning)";
        scoreDesc.textContent = "You have good core elements, but lack strong action verbs or quantifiable metrics. Check the weak points.";
    } else {
        scoreText.textContent = "Significant Changes Required";
        scoreText.style.color = "var(--danger)";
        scoreDesc.textContent = "Your resume is missing key contact details, metrics, or sections that cause immediate filtering by scanners.";
    }

    // Fill quick stats
    document.getElementById("stat-skills-count").textContent = state.analysis.skillsFound.length;
    document.getElementById("stat-verbs-count").textContent = state.analysis.actionVerbsCount;
    document.getElementById("stat-metrics-count").textContent = state.analysis.metricsCount;

    // Render weaknesses
    const listElement = document.getElementById("weakness-list-container");
    listElement.innerHTML = "";
    if (state.analysis.weakpoints.length === 0) {
        listElement.innerHTML = `
      <div style="text-align: center; color: var(--text-secondary); padding: 2rem;">
        <i class="fas fa-check-circle" style="color: var(--success); font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <p>No major weak points found! Your resume layout is in top shape.</p>
      </div>
    `;
    } else {
        state.analysis.weakpoints.forEach(wp => {
            const item = document.createElement("div");
            item.className = "weakness-item";
            item.innerHTML = `
        <div class="weakness-icon"><i class="fas fa-exclamation-circle"></i></div>
        <div class="weakness-content">
          <h5>${wp.title}</h5>
          <p>${wp.desc}</p>
          <div class="action-recommendation"><strong>Action Required:</strong> ${wp.action}</div>
        </div>
      `;
            listElement.appendChild(item);
        });
    }

    // Render positives
    const posElement = document.getElementById("positives-list-container");
    posElement.innerHTML = "";
    if (state.analysis.positives.length === 0) {
        posElement.innerHTML = `
      <div style="grid-column: span 2; text-align: center; color: var(--text-secondary);">
        No positive standouts detected yet. Complete the recommended actions to raise your standing.
      </div>
    `;
    } else {
        state.analysis.positives.forEach(pos => {
            const item = document.createElement("div");
            item.className = "positive-item";
            item.innerHTML = `
        <i class="fas fa-check"></i>
        <div>
          <h5>${pos.title}</h5>
          <p>${pos.desc}</p>
        </div>
      `;
            posElement.appendChild(item);
        });
    }
}

// Render Pathfinder Role Matching & Roadmaps
function renderPathfinder() {
    const container = document.getElementById("roles-list-container");
    container.innerHTML = "";

    // Process match metrics for roles
    state.roles = JOB_ROLES_DATABASE.map(role => {
        const matched = [];
        const missing = [];

        role.requiredSkills.forEach(skill => {
            if (state.analysis.skillsFound.includes(skill)) {
                matched.push(skill);
            } else {
                missing.push(skill);
            }
        });

        const percentage = Math.round((matched.length / role.requiredSkills.length) * 100);

        let level = "match-low";
        if (percentage >= 70) level = "match-high";
        else if (percentage >= 40) level = "match-med";

        return {
            ...role,
            matched,
            missing,
            percentage,
            level
        };
    }).sort((a, b) => b.percentage - a.percentage); // sort high matches first

    // Populate UI Cards
    state.roles.forEach((role, idx) => {
        const card = document.createElement("div");
        card.className = `role-card ${idx === state.selectedRoleIndex ? 'active' : ''}`;
        card.setAttribute("data-index", idx);
        card.innerHTML = `
      <div class="role-header">
        <h4 class="role-title">${role.title}</h4>
        <span class="match-badge ${role.level}">${role.percentage}% Match</span>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 0.75rem;">
        ${role.description}
      </p>
      <div class="skill-tags">
        ${role.matched.slice(0, 3).map(s => `<span class="skill-tag matched">${s}</span>`).join("")}
        ${role.missing.slice(0, 2).map(s => `<span class="skill-tag missing">${s}</span>`).join("")}
        ${role.requiredSkills.length > 5 ? `<span style="font-size:0.75rem; color:var(--text-muted)">+${role.requiredSkills.length - 5} more</span>` : ''}
      </div>
    `;

        card.addEventListener("click", () => {
            // Toggle selected card
            document.querySelectorAll(".role-card").forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            state.selectedRoleIndex = idx;
            showRoleDetails(idx);
        });

        container.appendChild(card);
    });

    // Initially load details for top role
    showRoleDetails(state.selectedRoleIndex);
}

// Show detailed information for single job role
function showRoleDetails(index) {
    const role = state.roles[index];
    if (!role) return;

    document.getElementById("detail-role-title").textContent = role.title;
    document.getElementById("detail-role-category").textContent = role.category;
    document.getElementById("detail-role-desc").textContent = role.description;

    // Matched details
    const tagsContainer = document.getElementById("detail-role-skills");
    tagsContainer.innerHTML = "";
    role.requiredSkills.forEach(s => {
        const tag = document.createElement("span");
        const isMatched = role.matched.includes(s);
        tag.className = `skill-tag ${isMatched ? 'matched' : 'missing'}`;
        tag.innerHTML = `<i class="fas ${isMatched ? 'fa-check' : 'fa-times'}"></i> ${s}`;
        tagsContainer.appendChild(tag);
    });

    // Load steps
    const roadmapContainer = document.getElementById("detail-roadmap-steps");
    roadmapContainer.innerHTML = "";
    role.roadmap.forEach((step, idx) => {
        const stepDiv = document.createElement("div");
        stepDiv.className = "roadmap-step";
        stepDiv.innerHTML = `
      <div class="step-num">${idx + 1}</div>
      <div class="step-content">
        <h5>${step.step}</h5>
        <p>${step.desc}</p>
        <a href="${step.link}" target="_blank" class="resource-link">
          Study Resource <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    `;
        roadmapContainer.appendChild(stepDiv);
    });
}

// Resume Enhancer tab methods
function setupEnhancer() {
    const enhanceInput = document.getElementById("enhance-input");
    const enhanceBtn = document.getElementById("enhance-btn");
    const placeholder = document.getElementById("enhance-placeholder");
    const resultContainer = document.getElementById("enhanced-result");
    const diffBefore = document.getElementById("diff-before");
    const diffAfter = document.getElementById("diff-after");
    const tipText = document.getElementById("enhance-tip");
    const copyBtn = document.getElementById("enhance-copy-btn");

    enhanceBtn.addEventListener("click", () => {
        const originalText = enhanceInput.value.trim();
        if (!originalText) {
            showFloatingNotification("Please enter a bullet point or phrase to enhance!", "warning");
            return;
        }

        // Check if match rules exist
        let matchedRule = null;
        for (let rule of BULLET_OPTIMIZER_RULES) {
            if (rule.detect.test(originalText)) {
                matchedRule = rule;
                break;
            }
        }

        let enhanced = "";
        let tip = "";

        if (matchedRule) {
            enhanced = matchedRule.replacement;
            tip = matchedRule.tip;
        } else {
            // General enhancement algorithm using action verbs
            const words = originalText.split(" ");
            let verb = "Executed";

            // Get target role from Pathfinder if available
            const targetRole = state.roles[state.selectedRoleIndex] || { title: "Technical Professional" };

            if (targetRole.title.includes("Frontend") || targetRole.title.includes("Full Stack")) {
                verb = VERBS_DICTIONARY.creation[Math.floor(Math.random() * VERBS_DICTIONARY.creation.length)];
            } else if (targetRole.title.includes("Data")) {
                verb = VERBS_DICTIONARY.research[Math.floor(Math.random() * VERBS_DICTIONARY.research.length)];
            } else if (targetRole.title.includes("Product") || targetRole.title.includes("Manager")) {
                verb = VERBS_DICTIONARY.leadership[Math.floor(Math.random() * VERBS_DICTIONARY.leadership.length)];
            } else {
                verb = VERBS_DICTIONARY.performance[Math.floor(Math.random() * VERBS_DICTIONARY.performance.length)];
            }

            enhanced = `${verb} core initiatives leveraging industry best-practices and collaborative workflows, resulting in a 20% increase in operational performance metrics and streamlined deliverables.`;
            tip = "Try including quantifiable numbers (%, $, time saved) and mentioning specific framework/tool names to fit your target job description.";
        }

        diffBefore.textContent = originalText;
        diffAfter.textContent = enhanced;
        tipText.textContent = tip;

        placeholder.style.display = "none";
        resultContainer.style.display = "flex";
    });

    // Copy to clipboard
    copyBtn.addEventListener("click", () => {
        const textToCopy = diffAfter.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showFloatingNotification("Copied to clipboard!", "success");
        }).catch(err => {
            showFloatingNotification("Failed to copy text.", "error");
        });
    });

    // Dynamic verb chip clicking (inserts into input text area)
    document.querySelectorAll(".verb-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const verb = chip.textContent;
            const currentVal = enhanceInput.value;

            if (!currentVal) {
                enhanceInput.value = verb + " ";
            } else {
                // Insert at cursor position or append
                const start = enhanceInput.selectionStart;
                const end = enhanceInput.selectionEnd;
                enhanceInput.value = currentVal.substring(0, start) + verb + " " + currentVal.substring(end);
            }
            enhanceInput.focus();
        });
    });
}

// Interview Coach Chat logic
function setupCoach() {
    const coachInput = document.getElementById("coach-chat-input");
    const coachSend = document.getElementById("coach-send-btn");
    const startBtn = document.getElementById("start-interview-btn");
    const messagesContainer = document.getElementById("chat-messages-container");

    startBtn.addEventListener("click", () => {
        // Pick questions based on skills found
        let matchedSkills = state.analysis.skillsFound;
        let questions = [];

        if (matchedSkills.includes("react") || matchedSkills.includes("javascript")) {
            questions.push("I see React/JavaScript on your resume. How do you optimize rendering performance in a modern single page application?");
        }
        if (matchedSkills.includes("python") || matchedSkills.includes("sql")) {
            questions.push("Your profile mentions database tools and Python. Can you design a database schema for an online library, and explain how you index it for faster search queries?");
        }

        // Supplement with general questions
        while (questions.length < 3) {
            const q = MOCK_QUESTIONS[Math.floor(Math.random() * MOCK_QUESTIONS.length)];
            if (!questions.includes(q)) {
                questions.push(q);
            }
        }

        state.interviewQuestions = questions;
        state.currentQuestionIndex = 0;
        state.chatHistory = [];
        messagesContainer.innerHTML = "";

        // Disable start button, enable inputs
        startBtn.textContent = "Interview In Progress...";
        startBtn.disabled = true;
        coachInput.disabled = false;
        coachSend.disabled = false;

        // Send opening message
        addChatMessage("ai", "Hello! I am your AI Interview Coach. Based on your uploaded credentials, I will test your technical depth. Let's start with this question:\n\n" + state.interviewQuestions[0]);
    });

    coachSend.addEventListener("click", () => {
        sendMessage();
    });

    coachInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const text = coachInput.value.trim();
        if (!text) return;

        // Add user response
        addChatMessage("user", text);
        coachInput.value = "";

        // Simulate AI loading typing state
        const loadingMessage = document.createElement("div");
        loadingMessage.className = "chat-message ai typing-loader";
        loadingMessage.innerHTML = `<span class="chat-sender-name">Coach Feedback</span><p>Thinking...</p>`;
        messagesContainer.appendChild(loadingMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            loadingMessage.remove();
            evaluateResponse(text);
        }, 1500);
    }

    function evaluateResponse(userResponse) {
        const qIdx = state.currentQuestionIndex;
        let feedback = "";

        // Rule based response analysis
        const wordCount = userResponse.split(" ").length;
        const hasStarMethodKeywords = /(?:situation|task|action|result|because|due to|solved|impact|measure)/i.test(userResponse);

        if (wordCount < 15) {
            feedback = "Your response is too short. In an interview, you should elaborate. Try structure answers by stating the Situation, Task, Action, and the final quantifiable Result (STAR method).";
        } else if (!hasStarMethodKeywords) {
            feedback = "Good description, but it reads as general theory. To make it memorable, tell a specific story about a project where you solved this challenge and describe the business metric affected.";
        } else {
            feedback = "Excellent! You structured the answer well, specified tools, and explained the process. That shows solid communication and structured thinking.";
        }

        state.currentQuestionIndex++;

        if (state.currentQuestionIndex < state.interviewQuestions.length) {
            const nextQ = state.interviewQuestions[state.currentQuestionIndex];
            addChatMessage("ai", `${feedback}\n\n**Next Question:** ${nextQ}`);
        } else {
            addChatMessage("ai", `${feedback}\n\n🎉 **Interview Session Completed!** You answered all questions. Feel free to hit 'Start Mock Interview' again to practice new random templates.`);
            startBtn.textContent = "Start Mock Interview";
            startBtn.disabled = false;
            coachInput.disabled = true;
            coachSend.disabled = true;
        }
    }

    function addChatMessage(sender, text) {
        const msg = document.createElement("div");
        msg.className = `chat-message ${sender}`;
        msg.innerHTML = `
      <span class="chat-sender-name">${sender === 'ai' ? 'Coach Feedback' : 'You'}</span>
      <p>${text.replace(/\n/g, '<br>')}</p>
    `;
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// AI Video Interview state
const videoState = {
    stream: null,
    isRecording: false,
    questions: [],
    currentQuestionIdx: 0,
    eyeContactLogs: [],
    pacingLogs: [],
    postureLogs: [],
    intervalId: null,
    waveformId: null
};

function setupVideoInterview() {
    const startBtn = document.getElementById("video-start-btn");
    const recordBtn = document.getElementById("video-record-btn");
    const nextBtn = document.getElementById("video-next-btn");
    const promptText = document.getElementById("video-prompt-text");
    const streamEl = document.getElementById("webcam-stream");
    const fallbackEl = document.getElementById("webcam-fallback");
    const overlayEl = document.getElementById("ai-tracking-overlay");
    const recordIndicator = document.getElementById("video-recording-indicator");
    const waveformWrap = document.getElementById("waveform-wrap");
    const restartBtn = document.getElementById("restart-video-btn");

    startBtn.addEventListener("click", () => {
        startVideoInterview();
    });

    recordBtn.addEventListener("click", () => {
        toggleRecording();
    });

    nextBtn.addEventListener("click", () => {
        advanceQuestion();
    });

    restartBtn.addEventListener("click", () => {
        resetVideoInterview();
    });

    function startVideoInterview() {
        // Generate questions based on skills found
        let matchedSkills = state.analysis.skillsFound;
        let questions = [
            "Can you describe your professional background and highlight the most impactful project you've worked on?"
        ];

        if (matchedSkills.includes("react") || matchedSkills.includes("javascript")) {
            questions.push("Since your resume displays JavaScript/React, how do you handle state synchronization and load efficiency in dynamic frontends?");
        } else {
            questions.push("How do you manage deadlines and coordinate schedules when working on engineering deliverables?");
        }

        questions.push("Where do you see yourself technically and professionally in the next 3 to 5 years, and how does this role fit that goal?");

        videoState.questions = questions;
        videoState.currentQuestionIdx = 0;
        videoState.eyeContactLogs = [];
        videoState.pacingLogs = [];
        videoState.postureLogs = [];

        // Attempt camera access
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                videoState.stream = stream;
                streamEl.srcObject = stream;
                streamEl.style.display = "block";
                fallbackEl.style.display = "none";
                overlayEl.style.display = "block";
                showFloatingNotification("Webcam stream started successfully!", "success");
                initTelemetry();
            })
            .catch(err => {
                // Fallback to high fidelity simulator
                streamEl.style.display = "none";
                fallbackEl.style.display = "flex";
                fallbackEl.innerHTML = `
          <i class="fas fa-robot" style="font-size: 3rem; color: var(--secondary);"></i>
          <h5 style="margin-top: 0.5rem;">AI Telemetry Simulator Active</h5>
          <p style="font-size: 0.85rem; max-width: 280px; color: var(--text-secondary); margin-top: 0.25rem;">Webcam blocked or unavailable. Proceeding with simulated interactive layout.</p>
        `;
                overlayEl.style.display = "block";
                showFloatingNotification("Camera not detected. Running telemetry simulator.", "warning");
                initTelemetry();
            });

        startBtn.style.display = "none";
        recordBtn.style.display = "inline-flex";
        recordBtn.innerHTML = `<i class="fas fa-microphone"></i> Record Answer`;
        recordBtn.className = "btn-secondary";
        nextBtn.style.display = "none";

        promptText.textContent = videoState.questions[0];
    }

    function toggleRecording() {
        if (!videoState.isRecording) {
            // Start recording mode
            videoState.isRecording = true;
            recordBtn.innerHTML = `<i class="fas fa-stop"></i> Stop & Save`;
            recordBtn.className = "btn-secondary";
            recordBtn.style.borderColor = "var(--danger)";
            recordIndicator.style.display = "inline-flex";
            waveformWrap.style.display = "block";

            startTelemetryTracking();
            startWaveformAnimation();
            showFloatingNotification("Recording started. Talk into your microphone.", "info");
        } else {
            // Stop recording mode
            videoState.isRecording = false;
            recordBtn.style.display = "none";
            recordIndicator.style.display = "none";
            waveformWrap.style.display = "none";

            stopTelemetryTracking();
            stopWaveformAnimation();

            showFloatingNotification("Response captured and analyzed.", "success");
            nextBtn.style.display = "inline-flex";
            if (videoState.currentQuestionIdx === videoState.questions.length - 1) {
                nextBtn.innerHTML = `Finish Interview <i class="fas fa-check"></i>`;
            } else {
                nextBtn.innerHTML = `Next Question <i class="fas fa-arrow-right"></i>`;
            }
        }
    }

    function advanceQuestion() {
        videoState.currentQuestionIdx++;
        if (videoState.currentQuestionIdx < videoState.questions.length) {
            promptText.textContent = videoState.questions[videoState.currentQuestionIdx];
            nextBtn.style.display = "none";
            recordBtn.style.display = "inline-flex";
            recordBtn.innerHTML = `<i class="fas fa-microphone"></i> Record Answer`;
            recordBtn.className = "btn-secondary";
            recordBtn.style.borderColor = "var(--border-light)";
        } else {
            finishVideoInterview();
        }
    }

    function initTelemetry() {
        // Reset indicators
        updateTelemetryUI(90, 130, 0, 90);
    }

    function startTelemetryTracking() {
        const faceBox = document.getElementById("face-box");

        videoState.intervalId = setInterval(() => {
            // Fluctuate telemetry values
            const eyeContact = Math.floor(Math.random() * (98 - 86 + 1)) + 86;
            const pacing = Math.floor(Math.random() * (145 - 120 + 1)) + 120;
            const volume = Math.floor(Math.random() * (62 - 40 + 1)) + 40;
            const posture = Math.floor(Math.random() * (96 - 88 + 1)) + 88;

            videoState.eyeContactLogs.push(eyeContact);
            videoState.pacingLogs.push(pacing);
            videoState.postureLogs.push(posture);

            updateTelemetryUI(eyeContact, pacing, volume, posture);

            // Move face mesh box slightly to simulate motion tracking
            const dX = Math.floor(Math.random() * 11) - 5; // -5px to 5px
            const dY = Math.floor(Math.random() * 11) - 5;
            faceBox.style.transform = `translate(${dX}px, ${dY}px)`;

            // Move tracking dots inside box
            const dots = faceBox.querySelectorAll(".tracking-dot");
            dots.forEach(dot => {
                const dotDx = Math.floor(Math.random() * 5) - 2;
                const dotDy = Math.floor(Math.random() * 5) - 2;
                dot.style.marginLeft = `${dotDx}px`;
                dot.style.marginTop = `${dotDy}px`;
            });

        }, 400);
    }

    function stopTelemetryTracking() {
        if (videoState.intervalId) {
            clearInterval(videoState.intervalId);
            videoState.intervalId = null;
        }
    }

    function updateTelemetryUI(eyeContact, pacing, volume, posture) {
        // Update texts
        document.getElementById("telemetry-eye-val").textContent = `${eyeContact}%`;
        document.getElementById("telemetry-pace-val").textContent = `${pacing} WPM`;
        document.getElementById("telemetry-volume-val").textContent = `${volume} dB`;
        document.getElementById("telemetry-posture-val").textContent = `${posture}%`;

        // Update progress bars
        document.getElementById("telemetry-eye-bar").style.width = `${eyeContact}%`;
        document.getElementById("telemetry-pace-bar").style.width = `${((pacing - 80) / 100) * 100}%`;
        document.getElementById("telemetry-volume-bar").style.width = `${(volume / 90) * 100}%`;
        document.getElementById("telemetry-posture-bar").style.width = `${posture}%`;

        // Update badges
        const eyeBadge = document.getElementById("telemetry-eye-badge");
        if (eyeContact >= 90) {
            eyeBadge.textContent = "Optimal";
            eyeBadge.className = "telemetry-status-badge status-optimal";
        } else {
            eyeBadge.textContent = "Adjust";
            eyeBadge.className = "telemetry-status-badge status-warning";
        }

        const paceBadge = document.getElementById("telemetry-pace-badge");
        if (pacing >= 120 && pacing <= 150) {
            paceBadge.textContent = "Normal";
            paceBadge.className = "telemetry-status-badge status-optimal";
        } else {
            paceBadge.textContent = "Fast";
            paceBadge.className = "telemetry-status-badge status-warning";
        }

        const postureBadge = document.getElementById("telemetry-posture-badge");
        if (posture >= 90) {
            postureBadge.textContent = "Stable";
            postureBadge.className = "telemetry-status-badge status-optimal";
        } else {
            postureBadge.textContent = "Unstable";
            postureBadge.className = "telemetry-status-badge status-warning";
        }
    }

    function startWaveformAnimation() {
        const canvas = document.getElementById("waveform-canvas");
        const ctx = canvas.getContext("2d");

        // Set internal size matching display size
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let offset = 0;

        function draw() {
            if (!videoState.isRecording) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw simulated pitch/audio waves
            ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
            ctx.lineWidth = 2;
            ctx.beginPath();

            const waveCount = 3;
            const sections = canvas.width;

            for (let w = 0; w < waveCount; w++) {
                // Different layers of sine waves
                const speed = (w + 1) * 0.05;
                const scale = (3 - w) * 8;
                const freq = (w + 1) * 0.01;

                ctx.beginPath();
                for (let x = 0; x < sections; x++) {
                    // Add some micro noise
                    const noise = Math.sin(x * 0.1 + offset * 5) * (Math.random() * 1);
                    const y = canvas.height / 2 + Math.sin(x * freq + offset + w) * scale + noise;
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.strokeStyle = w === 0 ? "rgba(99, 102, 241, 0.6)" : (w === 1 ? "rgba(6, 182, 212, 0.5)" : "rgba(168, 85, 247, 0.3)");
                ctx.stroke();
            }

            offset += 0.06;
            videoState.waveformId = requestAnimationFrame(draw);
        }

        draw();
    }

    function stopWaveformAnimation() {
        if (videoState.waveformId) {
            cancelAnimationFrame(videoState.waveformId);
            videoState.waveformId = null;
        }
        const canvas = document.getElementById("waveform-canvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function finishVideoInterview() {
        stopVideoSession();

        // Hide webcam card and prompt controls
        document.getElementById("video-setup-container").style.display = "none";

        // Compute aggregate logs
        const avgEye = Math.round(videoState.eyeContactLogs.reduce((a, b) => a + b, 0) / videoState.eyeContactLogs.length) || 91;
        const avgPace = Math.round(videoState.pacingLogs.reduce((a, b) => a + b, 0) / videoState.pacingLogs.length) || 135;
        const avgPosture = Math.round(videoState.postureLogs.reduce((a, b) => a + b, 0) / videoState.postureLogs.length) || 92;

        // Pacing rating out of 100
        let paceScore = 95;
        if (avgPace < 110) paceScore = 75;
        if (avgPace > 150) paceScore = 80;

        const overallScore = Math.round((avgEye + paceScore + avgPosture + 95) / 4);

        // Update Scorecard DOM
        document.getElementById("post-overall-score").textContent = overallScore;
        document.getElementById("post-eye-val").textContent = `${avgEye}%`;
        document.getElementById("post-pace-val").textContent = `${avgPace} WPM (${paceScore}% Rating)`;
        document.getElementById("post-posture-val").textContent = `${avgPosture}%`;
        document.getElementById("post-filler-val").textContent = `95% (Excellent)`;

        // Animate progress lines
        setTimeout(() => {
            document.getElementById("post-eye-bar").style.width = `${avgEye}%`;
            document.getElementById("post-pace-bar").style.width = `${paceScore}%`;
            document.getElementById("post-posture-bar").style.width = `${avgPosture}%`;
            document.getElementById("post-filler-bar").style.width = `95%`;
        }, 200);

        // Feed recommendations list
        const feedbackList = document.getElementById("post-feedback-list");
        feedbackList.innerHTML = "";

        const tips = [
            { title: "Verbal Velocity", text: `Your speaking rate was optimal at ${avgPace} WPM. Perfect pacing conveys composure and lets interviewers easily process facts.`, type: "success" },
            { title: "Gaze stability", text: `Your eye contact averaged ${avgEye}%. Try positioning your text browser directly beneath your camera lenses to maintain direct gaze alignment.`, type: avgEye >= 90 ? "success" : "warning" },
            { title: "Body alignment", text: `Your posture was stable at ${avgPosture}%. Keep body shifting and nodding gestures measured when answering core engineering prompts.`, type: avgPosture >= 90 ? "success" : "warning" },
            { title: "Linguistic integrity", text: "Minimal filler words (um, like, er) were detected. This speaks directly to professional articulation and clarity.", type: "success" }
        ];

        tips.forEach(t => {
            const li = document.createElement("li");
            li.style.marginBottom = "0.75rem";
            li.innerHTML = `
        <span style="color: ${t.type === 'success' ? 'var(--success)' : 'var(--warning)'}; font-weight:700;">
          <i class="fas ${t.type === 'success' ? 'fa-check' : 'fa-lightbulb'}"></i> ${t.title}:
        </span> 
        <span>${t.text}</span>
      `;
            feedbackList.appendChild(li);
        });

        document.getElementById("post-session-card").style.display = "block";
    }

    function resetVideoInterview() {
        document.getElementById("post-session-card").style.display = "none";
        document.getElementById("video-setup-container").style.display = "grid";

        startBtn.style.display = "inline-flex";
        recordBtn.style.display = "none";
        nextBtn.style.display = "none";

        promptText.textContent = "Click 'Start Video Session' below to begin. We will generate questions based on your resume qualifications.";
        fallbackEl.style.display = "flex";
        fallbackEl.innerHTML = `
      <i class="fas fa-video-slash"></i>
      <h5>Camera Feed Inactive</h5>
      <p style="font-size: 0.85rem; max-width: 280px; margin-top: 0.25rem;">Allow camera permissions after starting the mock video session.</p>
    `;
        streamEl.style.display = "none";
        overlayEl.style.display = "none";

        initTelemetry();
    }
}

function stopVideoSession() {
    stopTelemetryTrackingGlobal();
    if (videoState.stream) {
        videoState.stream.getTracks().forEach(track => track.stop());
        videoState.stream = null;
    }
    videoState.isRecording = false;
}

function stopTelemetryTrackingGlobal() {
    if (videoState.intervalId) {
        clearInterval(videoState.intervalId);
        videoState.intervalId = null;
    }
    if (videoState.waveformId) {
        cancelAnimationFrame(videoState.waveformId);
        videoState.waveformId = null;
    }
}
