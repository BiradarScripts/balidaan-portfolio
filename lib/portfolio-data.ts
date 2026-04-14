export type ColumnId = "about" | "experience" | "projects" | "achievements";
export type Palette = "emerald" | "cyan" | "violet" | "amber" | "magenta";
export type SurfaceStyle = "matrix" | "rings" | "beam" | "stack" | "pulse" | "mesh";

export type LinkAction = {
  label: string;
  href: string;
};

export type PortfolioCard = {
  id: string;
  section: ColumnId;
  eyebrow: string;
  title: string;
  meta: string;
  summary: string;
  tags: string[];
  accent: string;
  detailIntro: string;
  bullets: string[];
  links: LinkAction[];
  year?: string;
  metric?: string;
  palette?: Palette;
  surface?: SurfaceStyle;
  previewLabels?: string[];
};

export const identity = {
  name: "Shreyas Biradar",
  role: "AI Engineer / Multimodal Builder",
  location: "IIIT Bangalore · Bengaluru, India",
  email: "pei2004shreyas@gmail.com",
  phone: "+91 7416689570",
  github: "https://github.com/BiradarScripts",
  linkedin: "https://www.linkedin.com/in/shreyas-biradar/",
  resume: "/Shreyas_Biradar_Resume.pdf",
  intro:
    "I design and build ambitious AI-heavy products, backend systems, and research-backed prototypes that feel sharp, modern, and real.",
  bio: "I am drawn to hard technical problems with a product edge: multimodal pipelines, inference systems, developer tooling, intelligent interfaces, and everything required to ship them cleanly.",
};

export const columnMeta: Record<
  ColumnId,
  { label: string; title: string; description: string }
> = {
  about: {
    label: "About Me",
    title: "Profile / Contact",
    description:
      "The personal column: portrait, quick context, contact hooks, and the core signals behind how I work.",
  },
  experience: {
    label: "Career Journey",
    title: "Experience",
    description:
      "Internships, open-source work, and the timeline that shaped how I build production systems.",
  },
  projects: {
    label: "Highlighted Work",
    title: "Projects",
    description:
      "Selected builds across forecasting, accessibility, multimodal AI, and recent public experiments.",
  },
  achievements: {
    label: "Momentum",
    title: "Achievements",
    description:
      "Competitive wins, challenge outcomes, and proof of consistency under pressure.",
  },
};

export const quickStats = [
  { label: "Hackathon wins", value: "5x" },
  { label: "Public repos", value: "47" },
  { label: "Amazon ML rank", value: "156" },
  { label: "GenAI finish", value: "Top 5" },
];

export const aboutCards: PortfolioCard[] = [
  {
    id: "role",
    section: "about",
    eyebrow: "Role",
    title: "Design-minded engineer",
    meta: "From model experimentation to backend delivery",
    summary:
      "I like owning the full shape of a build: concept, interface, APIs, systems behavior, and the polish that makes it feel expensive.",
    tags: ["Product Taste", "Execution", "Systems"],
    accent: "01",
    detailIntro:
      "My best work happens where visual clarity, backend rigor, and applied intelligence all meet.",
    bullets: [
      "Comfortable across product design thinking, frontend execution, and model-backed systems.",
      "Most excited by software that has both technical depth and a clear user-facing payoff.",
      "I care a lot about software feeling precise, not merely functional.",
    ],
    links: [{ label: "GitHub", href: identity.github }],
  },
  {
    id: "education",
    section: "about",
    eyebrow: "Education",
    title: "IIIT Bangalore",
    meta: "IMTech in Electronics and Communication Engineering · 2022 – 2027",
    summary:
      "Integrated Master of Technology with a foundation that combines systems thinking, engineering discipline, and room to go deep on AI.",
    tags: ["ECE", "IIITB", "Research"],
    accent: "02",
    detailIntro:
      "The degree gives me a systems lens, but most of my energy goes into building software that feels current and ambitious.",
    bullets: [
      "Pursuing an integrated MTech in Electronics and Communication Engineering.",
      "Using the academic base to push into production AI, backend work, and competitive project-building.",
      "The curriculum and project culture both reinforce a build-first mindset.",
    ],
    links: [{ label: "LinkedIn", href: identity.linkedin }],
  },
  {
    id: "toolkit",
    section: "about",
    eyebrow: "Toolkit",
    title: "Stack signature",
    meta: "Python, TypeScript, FastAPI, React, Docker, AWS, PostgreSQL",
    summary:
      "I work comfortably across model development, app layers, APIs, deployment pipelines, and the surrounding product surface.",
    tags: ["Python", "Next.js", "AWS", "Docker"],
    accent: "03",
    detailIntro:
      "I do not think about frontend, backend, and AI as separate silos. The interesting builds need all three to work together.",
    bullets: [
      "Languages: Java, C, C++, Python, JavaScript, TypeScript.",
      "Frameworks: React, Next.js, Node.js, Express.js, Flask, Django, Spring Boot, LangChain, Hugging Face.",
      "Cloud and delivery: Docker, Kubernetes, AWS, GitHub, Vercel, Render.",
      "Databases: MongoDB, MySQL, PostgreSQL.",
    ],
    links: [{ label: "Repositories", href: `${identity.github}?tab=repositories` }],
  },
];

export const timelineYears = ["2026", "2025", "2024", "2023", "2022"];

export const experienceCards: PortfolioCard[] = [
  {
    id: "krutrim",
    section: "experience",
    eyebrow: "Summer Research Intern",
    title: "Krutrim AI (OLA)",
    meta: "May 2025 – Jul 2025 · Bengaluru",
    summary:
      "Built AI infrastructure pieces spanning multilingual ETL, FastAPI model services, and scalable inference integration on AWS EKS.",
    tags: ["FastAPI", "PostgreSQL", "AWS EKS", "ETL"],
    accent: "KA",
    year: "2025",
    detailIntro:
      "This work pushed me closer to the production edge of applied AI, where throughput, infrastructure, and reliability start to matter as much as the model itself.",
    bullets: [
      "Engineered a Dockerized SQL ETL pipeline that asynchronously ingested around 20,000 multilingual records into PostgreSQL.",
      "Deployed machine-learning models as high-throughput FastAPI microservices for real-time automated data tagging.",
      "Worked with AWS EKS to serve a fine-tuned Krutrim 2.1 model through scalable inference endpoints.",
    ],
    links: [{ label: "GitHub Profile", href: identity.github }],
  },
  {
    id: "think-logitech",
    section: "experience",
    eyebrow: "Software Developer Engineer Intern",
    title: "Think LogiTech Solutions",
    meta: "Jun 2024 – Sep 2024 · Bengaluru",
    summary:
      "Contributed to a PG management platform used across 100+ properties, with payment flows and shipped features reaching 1.2K+ users.",
    tags: ["Payments", "Product", "Cross-functional"],
    accent: "TL",
    year: "2024",
    detailIntro:
      "This was a product-shipping environment, which meant learning how to work inside practical constraints and still move with speed.",
    bullets: [
      "Built and maintained payment-related capabilities inside a property management platform.",
      "Contributed to a system used across more than 100 properties.",
      "Collaborated with four-plus cross-functional teams to ship production features to over 1.2K users.",
    ],
    links: [{ label: "LinkedIn", href: identity.linkedin }],
  },
  {
    id: "asyncapi",
    section: "experience",
    eyebrow: "Open Source Contributor",
    title: "ASyncAPI",
    meta: "Dec 2024 – Jan 2025 · Remote",
    summary:
      "Used the Factory Pattern to unify routing across message, call, and mail services inside an existing open-source codebase.",
    tags: ["Open Source", "Factory Pattern", "Architecture"],
    accent: "OA",
    year: "2024",
    detailIntro:
      "Open source sharpened my ability to contribute within a live architecture instead of shaping everything from scratch.",
    bullets: [
      "Worked on a unified routing system spanning message, call, and mail services.",
      "Used the Factory Pattern to improve extensibility and maintainability.",
      "Built experience contributing cleanly to a shared codebase with architectural constraints.",
    ],
    links: [{ label: "GitHub", href: identity.github }],
  },
];

export const timelineMilestones = [
  "2024 · Won multiple national hackathons across AI, product, and fintech problem spaces.",
  "2023 · Built full-stack community products and developed a stronger product-engineering base.",
  "2022 · Started at IIIT Bangalore and began compounding on software and systems foundations.",
];

export const projectCards: PortfolioCard[] = [
  {
    id: "quant-gambit",
    section: "projects",
    eyebrow: "Forecasting System",
    title: "Quant-Gambit",
    meta: "Python · PyTorch · Docker · Sep 2025 – Oct 2025",
    summary:
      "A market-state forecasting build exploring LSTM, Transformer, and Mamba models with reproducible offline evaluation.",
    tags: ["Mamba", "Transformers", "Time Series"],
    accent: "QG",
    palette: "cyan",
    surface: "rings",
    previewLabels: ["Mamba", "Eval", "Signals", "Docker"],
    detailIntro:
      "I treated this as a serious systems-and-model-design problem rather than a single-architecture experiment.",
    bullets: [
      "Built and trained LSTM, Transformer, and Mamba-based models for market-state forecasting.",
      "Improved R-squared from 0.2695 to 0.3648 by iterating on architecture and feature selection.",
      "Containerized the pipeline for reproducible CPU-only offline evaluation.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Quant-Gambit" }],
  },
  {
    id: "braille",
    section: "projects",
    eyebrow: "Accessibility Product",
    title: "Braille / Brailey",
    meta: "Next.js · FastAPI · LangChain · Firebase · Aug 2024 – Present",
    summary:
      "A handwritten-note workflow for visually impaired students, combining local transfer, parsing, and real-time summarization.",
    tags: ["Accessibility", "Gemini", "Realtime"],
    accent: "BR",
    palette: "emerald",
    surface: "mesh",
    previewLabels: ["Notes", "Parse", "Summaries", "Voice"],
    detailIntro:
      "This project matters because it is both technically interesting and meaningfully human-centered.",
    bullets: [
      "Built a local Wi-Fi flow for sending handwritten notes using iinkJS and custom parsing logic.",
      "Integrated Gemini with FastAPI for real-time summarization and natural-language support.",
      "Collaborated with the University of Zurich on a patented accessibility-focused solution.",
    ],
    links: [{ label: "GitHub Profile", href: identity.github }],
  },
  {
    id: "vaani-x",
    section: "projects",
    eyebrow: "Voice Intelligence",
    title: "Vaani X",
    meta: "Whisper · LLaMA · RAG · AWS Kinesis · Jul 2024 – Aug 2024",
    summary:
      "A system for converting Kannada speech into insight through transcription, retrieval, and fluid text-plus-voice interaction.",
    tags: ["Whisper", "Kannada", "RAG"],
    accent: "VX",
    palette: "amber",
    surface: "beam",
    previewLabels: ["Audio", "RAG", "Voice", "Realtime"],
    detailIntro:
      "I wanted the interaction to feel live and useful, not just like stitched-together model demos.",
    bullets: [
      "Transcribed Kannada audio using Whisper and a fine-tuned LLaMA model for insight generation.",
      "Built smooth real-time interaction through both text and voice layers.",
      "Upgraded the system with RAG and AWS Kinesis for multi-source real-time ingestion.",
    ],
    links: [{ label: "LinkedIn", href: identity.linkedin }],
  },
  {
    id: "multimodal-vqa",
    section: "projects",
    eyebrow: "Research Build",
    title: "Multimodal VQA",
    meta: "PyTorch · BLIP · LoRA · Hugging Face · Jan 2025 – Present",
    summary:
      "A visual question-answering system trained on a large curated image set with custom diagnostics beyond exact match.",
    tags: ["BLIP", "LoRA", "Diagnostics"],
    accent: "VQ",
    palette: "violet",
    surface: "stack",
    previewLabels: ["BLIP", "LoRA", "Eval", "Dataset"],
    detailIntro:
      "The interesting part here was not only training, but building better ways to understand what the model was actually doing.",
    bullets: [
      "Curated 169,659 images across 559 categories and corrected imbalance with proportional tiered sampling.",
      "Built 13 LoRA variants and improved exact match from 13.28% to 20.53%, with ROUGE-L rising from 0.142 to 0.214.",
      "Added VCCS and token-level overlap diagnostics for more useful answer-image consistency analysis.",
    ],
    links: [{ label: "GitHub Profile", href: identity.github }],
  },
  {
    id: "ledgershield",
    section: "projects",
    eyebrow: "Recent GitHub Build",
    title: "Meta's LedgerShield",
    meta: "Python · Updated Apr 2026",
    summary:
      "A multimodal accounts-payable audit environment and one of the strongest recent signals in the current GitHub portfolio.",
    tags: ["Document AI", "Audit", "Recent"],
    accent: "LS",
    palette: "cyan",
    surface: "rings",
    previewLabels: ["Audit", "OCR", "Docs", "AI"],
    detailIntro:
      "This repo points toward a serious applied-AI direction: document understanding, workflow automation, and trust-sensitive business systems.",
    bullets: [
      "Public GitHub repository described as a multimodal accounts payable audit environment.",
      "Represents a newer layer of the portfolio beyond the resume snapshot.",
      "A strong fit for the highlighted-work column because it feels current and product-facing.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Meta-s-LedgerShield" }],
  },
  {
    id: "redactor",
    section: "projects",
    eyebrow: "Privacy Workflow",
    title: "Redactor",
    meta: "HTML · Updated Apr 2026",
    summary:
      "A legal-document privacy build focused on masking personal information inside sensitive paperwork.",
    tags: ["Privacy", "Legal Tech", "Recent"],
    accent: "RD",
    palette: "magenta",
    surface: "beam",
    previewLabels: ["Privacy", "Mask", "Docs", "Legal"],
    detailIntro:
      "This is a clean example of applied software aimed at a sensitive domain where clarity and trust matter.",
    bullets: [
      "Public GitHub repository described as masking personal information in legal documents.",
      "Extends the portfolio into privacy-preserving and legal-tech-oriented workflows.",
      "Useful as a portfolio piece because it shows a problem with obvious real-world value.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Redactor" }],
  },
  {
    id: "visionyard-pro",
    section: "projects",
    eyebrow: "Vision Product",
    title: "VisionYard Pro",
    meta: "TypeScript · Updated Apr 2026",
    summary:
      "A recent TypeScript-based vision product experiment from the current GitHub account, positioned as a polished product-style build.",
    tags: ["TypeScript", "Vision", "Recent"],
    accent: "VY",
    palette: "violet",
    surface: "stack",
    previewLabels: ["Vision", "UI", "TS", "Product"],
    detailIntro:
      "This entry is based on the public GitHub repository metadata and belongs here because it reinforces the newer product-facing direction of the account.",
    bullets: [
      "Recent GitHub project implemented in TypeScript.",
      "Included as a non-redundant current project from the public repository list.",
      "A good candidate for future screenshots once richer repo media or README content is added.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/VisionYard-Pro" }],
  },
  {
    id: "icdm",
    section: "projects",
    eyebrow: "Clinical Intelligence",
    title: "Intelligent Clinical Data Mesh",
    meta: "Python · Updated Jan 2026",
    summary:
      "A healthcare-flavored Python build from the current GitHub portfolio, grouped here as a distinct data-and-intelligence project.",
    tags: ["Healthcare", "Python", "Data"],
    accent: "IC",
    palette: "emerald",
    surface: "mesh",
    previewLabels: ["Clinical", "Data", "Mesh", "Python"],
    detailIntro:
      "This is another current-account project that broadens the portfolio beyond one domain and hints at healthcare-data applications.",
    bullets: [
      "Recent Python repository in the public GitHub account.",
      "Kept as part of the portfolio because it is clearly distinct from the finance, accessibility, and document-workflow projects.",
      "Well suited for future enrichment once deeper repo documentation is surfaced.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Intelligent-Clinical-Data-Mesh-ICDM-" }],
  },
  {
    id: "nanocredit",
    section: "projects",
    eyebrow: "Fintech Experiment",
    title: "NanoCredit.AI",
    meta: "Jupyter Notebook · Updated Nov 2025",
    summary:
      "A finance-oriented AI repository from the GitHub account that adds another applied problem space to the portfolio.",
    tags: ["Fintech", "AI", "Credit"],
    accent: "NC",
    palette: "amber",
    surface: "pulse",
    previewLabels: ["Credit", "Risk", "ML", "Finance"],
    detailIntro:
      "Even without a long public description, the repo is worth keeping because it gives the portfolio more breadth across applied AI domains.",
    bullets: [
      "Public repository name strongly suggests a credit-focused AI build.",
      "Included as a non-duplicate project from the current GitHub account.",
      "Adds useful domain range to the portfolio narrative.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/NanoCredit.AI" }],
  },
  {
    id: "seva-ai",
    section: "projects",
    eyebrow: "Healthcare Product",
    title: "Seva.ai",
    meta: "TypeScript · Updated Dec 2024",
    summary:
      "Described on GitHub as 'Friend of a Doctor', this is a healthcare-adjacent product concept with a modern TypeScript stack.",
    tags: ["Healthcare", "TypeScript", "Product"],
    accent: "SV",
    palette: "emerald",
    surface: "beam",
    previewLabels: ["Doctor", "Care", "TS", "UX"],
    detailIntro:
      "This repo helps the portfolio feel more multidimensional by adding a health-product direction alongside the heavier AI systems.",
    bullets: [
      "Public GitHub description: 'Friend of a Doctor'.",
      "Implemented in TypeScript according to the repo metadata.",
      "Strong candidate for a richer project story if screenshots or a fuller README are added later.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Seva.ai" }],
  },
  {
    id: "prompt-flow",
    section: "projects",
    eyebrow: "Developer Workflow",
    title: "Prompt-flow",
    meta: "Python · Updated Sep 2024",
    summary:
      "A workflow automation project for SDLC and low-code/no-code acceleration, pulled directly from the public GitHub account.",
    tags: ["Automation", "SDLC", "Python"],
    accent: "PF",
    palette: "magenta",
    surface: "stack",
    previewLabels: ["Flow", "Prompt", "SDLC", "LCNC"],
    detailIntro:
      "This project lines up well with the portfolio's product-engineering story because it sits at the intersection of AI and developer workflows.",
    bullets: [
      "GitHub description references automating SDLC to achieve LCNC workflows.",
      "Implemented in Python according to the public repository metadata.",
      "Kept as a non-redundant project because it brings in tooling and automation themes.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Prompt-flow" }],
  },
  {
    id: "econexus",
    section: "projects",
    eyebrow: "Full-Stack Product",
    title: "EconeXus",
    meta: "JavaScript · Updated Sep 2024",
    summary:
      "A full-stack social platform for interest-based networking and community discovery, retained as the single representative EconeXus project.",
    tags: ["MERN", "Social Product", "Full Stack"],
    accent: "EX",
    palette: "violet",
    surface: "mesh",
    previewLabels: ["Profiles", "Feeds", "Community", "MERN"],
    detailIntro:
      "This stays in the portfolio because it is a cleaner representative of the EconeXus product than the split frontend/backend repos.",
    bullets: [
      "Built as a social platform for networking and community discovery.",
      "Used as the canonical EconeXus portfolio entry while redundant split repos are omitted.",
      "Useful for showing product-building range beyond pure AI systems.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Econexus" }],
  },
  {
    id: "apna-doctor",
    section: "projects",
    eyebrow: "Healthcare Platform",
    title: "Apna Doctor",
    meta: "JavaScript · Updated Apr 2024",
    summary:
      "A healthcare-themed application from the public GitHub account that complements the broader product-engineering portfolio.",
    tags: ["Healthcare", "JavaScript", "Platform"],
    accent: "AD",
    palette: "cyan",
    surface: "beam",
    previewLabels: ["Doctors", "Patients", "Web", "Care"],
    detailIntro:
      "This project stays because it adds a practical application layer and broadens the site beyond one genre of software.",
    bullets: [
      "Distinct healthcare-oriented repository from the public GitHub list.",
      "Kept as a unique product entry rather than a duplicate or coursework repo.",
      "Adds more application variety to the portfolio.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Apna-Doctor" }],
  },
  {
    id: "bayesian-coin-toss",
    section: "projects",
    eyebrow: "Interactive ML Concept",
    title: "Bayesian Coin Toss Experiment",
    meta: "Updated Apr 2025",
    summary:
      "A Bayesian inference visualization project that shows belief updates through an interactive coin-toss experiment.",
    tags: ["Bayesian", "Visualization", "Inference"],
    accent: "BC",
    palette: "amber",
    surface: "rings",
    previewLabels: ["Bayes", "Belief", "Viz", "Stats"],
    detailIntro:
      "This one gives the portfolio a lighter, more exploratory edge and shows comfort with explanatory visual tooling.",
    bullets: [
      "Public GitHub description references Bayesian inference visualization.",
      "Useful as a distinct concept project rather than a heavy production system.",
      "Adds intellectual range and not just product or competition work.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Bayesian-Coin-Toss-Experiment" }],
  },
  {
    id: "summarize-ai",
    section: "projects",
    eyebrow: "NLP Project",
    title: "Summarize.ai",
    meta: "Python · Updated Jul 2024",
    summary:
      "A text summarization project based on fine-tuning pre-trained transformers, retained as a distinct NLP build from the GitHub account.",
    tags: ["NLP", "Transformers", "Summarization"],
    accent: "SA",
    palette: "magenta",
    surface: "pulse",
    previewLabels: ["NLP", "Summary", "Transformer", "Tune"],
    detailIntro:
      "This helps round out the portfolio with a more direct NLP line alongside the multimodal and product work.",
    bullets: [
      "GitHub description references text summarization through fine-tuned pre-trained transformers.",
      "A useful earlier NLP project to preserve in the portfolio.",
      "Kept because it is meaningfully different from the other listed builds.",
    ],
    links: [{ label: "Open Repository", href: "https://github.com/BiradarScripts/Summarize.ai" }],
  },
];

export const achievementCards: PortfolioCard[] = [
  {
    id: "hackathon-wins",
    section: "achievements",
    eyebrow: "National Recognition",
    title: "5x National-Level Hackathon Winner",
    meta: "Aug 2024 – Present",
    summary:
      "Repeated wins across startup tooling, multimodal ML, and financial inclusion challenges.",
    tags: ["Execution", "Competitive Edge", "Product Thinking"],
    accent: "HW",
    metric: "5x",
    palette: "emerald",
    surface: "pulse",
    previewLabels: ["Accenture", "RBIH", "Canara", "GenAI"],
    detailIntro:
      "Competitive environments fit me well because they reward sharp thinking, coherent storytelling, and the ability to finish under pressure.",
    bullets: [
      "Won the Accenture Innovation Challenge with an AI tool that helped startups launch sites, ads, and CI/CD workflows.",
      "Won the RBIH and Canara Bank Codeathon with an AI-driven MSME identity creation system.",
      "Reached finalist and top placements across multiple high-pressure national competitions.",
    ],
    links: [{ label: "GitHub", href: identity.github }],
  },
  {
    id: "accenture-winner",
    section: "achievements",
    eyebrow: "Hackathon Winner",
    title: "Accenture Innovation Challenge",
    meta: "Winner",
    summary:
      "Won with an AI product that helped startups automatically generate websites, ads, and CI/CD flows.",
    tags: ["Winner", "Startup Tooling", "Automation"],
    accent: "AC",
    metric: "01",
    palette: "magenta",
    surface: "beam",
    previewLabels: ["Sites", "Ads", "CI/CD", "AI"],
    detailIntro:
      "This is one of the best standalone wins in the portfolio because it combines generative tooling, product thinking, and strong demo value.",
    bullets: [
      "Built an AI tool to help startups auto-launch websites, ads, and CI/CD workflows.",
      "Finished as the winner in the Accenture Innovation Challenge according to the resume record.",
      "A great proof point for both product imagination and execution speed.",
    ],
    links: [{ label: "LinkedIn", href: identity.linkedin }],
  },
  {
    id: "codeathon-winner",
    section: "achievements",
    eyebrow: "Hackathon Winner",
    title: "Codeathon (RBIH & Canara Bank)",
    meta: "Winner",
    summary:
      "Won with an AI-driven MSME identity creation system built for a financial-inclusion problem space.",
    tags: ["Winner", "Fintech", "MSME"],
    accent: "CB",
    metric: "01",
    palette: "amber",
    surface: "stack",
    previewLabels: ["MSME", "Identity", "Banking", "AI"],
    detailIntro:
      "This win matters because it ties technical execution to a concrete systems problem with business and public-value implications.",
    bullets: [
      "Built an AI-driven MSME identity creation system.",
      "Won the Codeathon run by RBIH and Canara Bank according to the resume record.",
      "Adds a strong fintech and problem-solving signal to the portfolio.",
    ],
    links: [{ label: "GitHub", href: identity.github }],
  },
  {
    id: "amazon-ml",
    section: "achievements",
    eyebrow: "Challenge Result",
    title: "Amazon ML Challenge",
    meta: "AIR 156 · Best 15 quality finish",
    summary:
      "Built a multimodal price predictor using image and text signals in a competitive applied-ML setting.",
    tags: ["Multimodal", "ML Competition", "Ranking"],
    accent: "AM",
    metric: "156",
    palette: "cyan",
    surface: "rings",
    previewLabels: ["Text", "Image", "Fusion", "Rank"],
    detailIntro:
      "This was a strong signal that I can move quickly on applied multimodal problems and still stay organized enough to compete well.",
    bullets: [
      "Placed AIR 156 according to the resume record, with a best-15 quality finish mentioned there.",
      "Used both image and text inputs to predict pricing outcomes.",
      "Strengthened experimentation, fusion strategy, and leaderboard-driven iteration skills.",
    ],
    links: [{ label: "Repository", href: "https://github.com/BiradarScripts/AMAZON-ML-CHALLENGE-2025" }],
  },
  {
    id: "flipkart-grid",
    section: "achievements",
    eyebrow: "Computer Vision",
    title: "Flipkart Grid 6.0",
    meta: "2nd Runner-up",
    summary:
      "Built models for food freshness estimation, MRP reading, and expiry detection inside a robotics-oriented challenge.",
    tags: ["Vision", "Retail AI", "Runner-up"],
    accent: "FG",
    metric: "02",
    palette: "violet",
    surface: "stack",
    previewLabels: ["Freshness", "MRP", "Expiry", "Vision"],
    detailIntro:
      "I like challenge problems that force the work to be legible, demo-ready, and technically real all at once.",
    bullets: [
      "Created models for food freshness analysis, MRP extraction, and expiry detection.",
      "Finished as 2nd Runner-up in Flipkart Grid 6.0.",
      "Connected the CV system to a clearly useful retail and automation use case.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/BiradarScripts/Smart-Vision-Technology-Quality-Control-",
      },
    ],
  },
  {
    id: "google-genai",
    section: "achievements",
    eyebrow: "GenAI Build",
    title: "Google GenAI Exchange",
    meta: "Finalist · Top 5",
    summary:
      "Built a natural-language-based code generation concept and pushed it into finalist territory.",
    tags: ["Code Generation", "LLMs", "Finalist"],
    accent: "GG",
    metric: "05",
    palette: "magenta",
    surface: "beam",
    previewLabels: ["Prompt", "Code", "Flow", "Agentic"],
    detailIntro:
      "This result reflects the direction I enjoy most: interfaces that turn language into capability.",
    bullets: [
      "Built a natural-language code generator as part of the challenge.",
      "Finished as a Top 5 finalist according to the resume record.",
      "Reinforced an interest in developer tooling and generative interfaces.",
    ],
    links: [{ label: "LinkedIn", href: identity.linkedin }],
  },
];
