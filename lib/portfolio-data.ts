import repoCatalog from "./repo-catalog.json";

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

type RepoCatalogEntry = {
  name: string;
  fork: boolean;
  description: string;
  language: string;
  updated: string;
  summary: string;
  longSummary: string;
  readme: boolean;
  url: string;
  homepage: string;
  topics: string[];
};

const repoCatalogEntries = repoCatalog as RepoCatalogEntry[];
const paletteCycle: Palette[] = ["cyan", "emerald", "violet", "amber", "magenta"];
const surfaceCycle: SurfaceStyle[] = ["rings", "mesh", "stack", "beam", "pulse", "matrix"];

const featuredRepoNames = new Set([
  "Quant-Gambit",
  "Brailey",
  "Vaani-X",
  "VR-FINAL_PROJECT-2025",
  "Meta-s-LedgerShield",
  "Redactor",
  "VisionYard-Pro",
  "Intelligent-Clinical-Data-Mesh-ICDM-",
  "NanoCredit.AI",
  "Seva.ai",
  "Prompt-flow",
  "Econexus",
  "Apna-Doctor",
  "Bayesian-Coin-Toss-Experiment",
  "Summarize.ai",
  "Smart-Vision-Technology-Quality-Control-",
]);

const hiddenRepoNames = new Set([
  "BiradarScripts",
  "Dataset-Grid",
  "EconeXus-frontends",
  "EconeXus-backend",
  "website",
  "Gifs",
  "wagtail",
]);

const repoTitleOverrides: Record<string, string> = {
  "5G-NR-Mini-Projects": "5G NR Mini Projects",
  "AMAZON-ML-CHALLENGE-2025": "Amazon ML Challenge 2025",
  "AxRMs-": "AxRMs",
  "Chat-Simulator": "Chat Simulator",
  Djaan: "Djaan Search",
  "Final-Portfolio": "Earlier Portfolio",
  "LLD-low-level-Design-": "Low-Level Design Notes",
  "LSTM_word_predictor": "LSTM Word Predictor",
  "Mernify-language": "PixelLingo",
  "os_mini_project": "Online Library Management System",
  "PGTVS-LLM": "PGTVS LLM",
  "project_signals": "Project Signals",
  "Project1_java": "Filesystem Project",
  "VR_Assignment1_ShreyasBiradar_IMT2022529.": "Visual Recognition Assignment",
  "VR_Project1-pre-mid-sem": "Face Mask Detection",
  "VR_VISUALISATION": "VR Visualisation",
};

const repoLookup = new Map(repoCatalogEntries.map((repo) => [repo.name, repo]));

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeSpacing(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function cleanRepoText(text: string, repoName?: string, maxLength = 260) {
  let cleaned = text
    .replace(/[*_`#>]+/g, " ")
    .replace(/\[[^\]]+\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (repoName) {
    const rawNamePattern = new RegExp(`^${escapeRegExp(repoName)}\\s+`, "i");
    const prettyNamePattern = new RegExp(
      `^${escapeRegExp(repoName.replace(/[-_.]+/g, " "))}\\s+`,
      "i",
    );

    cleaned = cleaned.replace(rawNamePattern, "").replace(prettyNamePattern, "");
  }

  cleaned = normalizeSpacing(cleaned);

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const clipped = cleaned.slice(0, maxLength);
  const breakpoint = Math.max(
    clipped.lastIndexOf(". "),
    clipped.lastIndexOf(", "),
    clipped.lastIndexOf(" "),
  );

  return `${clipped.slice(0, breakpoint > 120 ? breakpoint : maxLength).trim()}...`;
}

function takeSentences(text: string, count: number, maxLength = 420) {
  const cleaned = cleanRepoText(text, undefined, maxLength * 2);
  const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);

  if (sentences.length === 0) {
    return [cleaned];
  }

  return sentences.slice(0, count);
}

function formatUpdatedMonth(value: string) {
  const date = new Date(`${value}T00:00:00Z`);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function titleFromRepoName(name: string) {
  return repoTitleOverrides[name] ?? name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function accentFromTitle(title: string) {
  const letters = title
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "");

  return letters.join("").slice(0, 2) || "RP";
}

function repoSummary(name: string, fallback: string) {
  return cleanRepoText(repoLookup.get(name)?.summary ?? fallback, name, 220);
}

function repoLongSummary(name: string, fallback: string) {
  return cleanRepoText(repoLookup.get(name)?.longSummary ?? fallback, name, 420);
}

function deriveRepoTags(repo: RepoCatalogEntry) {
  const source = `${repo.summary} ${repo.description}`.toLowerCase();
  const tags = [repo.language];

  if (source.includes("vision") || source.includes("image")) {
    tags.push("Vision");
  }
  if (source.includes("llm") || source.includes("language model")) {
    tags.push("LLM");
  }
  if (source.includes("rag") || source.includes("search")) {
    tags.push("Search");
  }
  if (source.includes("clinical") || source.includes("doctor") || source.includes("health")) {
    tags.push("Health");
  }
  if (source.includes("credit") || source.includes("market") || source.includes("pricing")) {
    tags.push("Finance");
  }
  if (source.includes("chat") || source.includes("social")) {
    tags.push("Interaction");
  }
  if (source.includes("system calls") || source.includes("process")) {
    tags.push("Systems");
  }
  if (repo.fork) {
    tags.push("Experiment");
  } else {
    tags.push("Original");
  }

  return unique(tags).slice(0, 3);
}

function deriveRepoBullets(repo: RepoCatalogEntry) {
  const summary = cleanRepoText(repo.longSummary || repo.summary, repo.name, 520);
  const bullets = takeSentences(summary, 3, 520);

  if (repo.description) {
    bullets.push(cleanRepoText(repo.description, undefined, 140));
  }

  bullets.push(
    repo.fork
      ? `Kept as a forked experiment or challenge build, last updated ${formatUpdatedMonth(repo.updated)}.`
      : `Original public repository, last updated ${formatUpdatedMonth(repo.updated)}.`,
  );

  return unique(
    bullets
      .map((bullet) => bullet.trim())
      .filter((bullet) => bullet.length > 24),
  ).slice(0, 4);
}

export const identity = {
  name: "Shreyas Biradar",
  alias: "Balidaan",
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
      repoSummary(
        "Meta-s-LedgerShield",
        "A multimodal accounts-payable audit environment for enterprise workflow intelligence.",
      ),
    tags: ["Document AI", "Audit", "Recent"],
    accent: "LS",
    palette: "cyan",
    surface: "rings",
    previewLabels: ["Audit", "OCR", "Docs", "AI"],
    detailIntro:
      repoLongSummary(
        "Meta-s-LedgerShield",
        "A stateful multimodal benchmark for AI agents operating inside trust-sensitive accounts-payable workflows.",
      ),
    bullets: [
      "Frames accounts-payable review as a stateful benchmark instead of a single-step classification problem.",
      "Pushes agents through evidence gathering, control selection, pressure handling, and proof-carrying decision flows.",
      "Signals a sharper move toward enterprise document intelligence and workflow reliability.",
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
      repoSummary(
        "Redactor",
        "A context-aware privacy workflow for masking sensitive information inside legal documents.",
      ),
    tags: ["Privacy", "Legal Tech", "Recent"],
    accent: "RD",
    palette: "magenta",
    surface: "beam",
    previewLabels: ["Privacy", "Mask", "Docs", "Legal"],
    detailIntro:
      repoLongSummary(
        "Redactor",
        "A legal-tech workflow that uses contextual masking instead of blunt redaction everywhere.",
      ),
    bullets: [
      "Interfaces with the Indian Kanoon API to fetch source documents and mask the right people, not every named entity.",
      "Protects victims and their families while preserving judges, lawyers, and the accused for legal context.",
      "Pairs the NLP workflow with a web interface for side-by-side review.",
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
      repoSummary(
        "VisionYard-Pro",
        "A logistics and customs platform designed to reduce trade friction before cargo reaches the gate.",
      ),
    tags: ["TypeScript", "Vision", "Recent"],
    accent: "VY",
    palette: "violet",
    surface: "stack",
    previewLabels: ["Vision", "UI", "TS", "Product"],
    detailIntro:
      repoLongSummary(
        "VisionYard-Pro",
        "A multi-surface logistics, customs, and port-operations platform with both operational dashboards and AI parsing flows.",
      ),
    bullets: [
      "Combines a FastAPI backend for document ingestion, AI parsing, customs compliance checks, and risk scoring.",
      "Pairs that backend with a Next.js interface covering broker intake, dashboards, customs review, and operations workspaces.",
      "Feels like a true product system rather than a single isolated model demo.",
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
      repoSummary(
        "Intelligent-Clinical-Data-Mesh-ICDM-",
        "A clinical-trial intelligence architecture built to unify fragmented data sources in real time.",
      ),
    tags: ["Healthcare", "Python", "Data"],
    accent: "IC",
    palette: "emerald",
    surface: "mesh",
    previewLabels: ["Clinical", "Data", "Mesh", "Python"],
    detailIntro:
      repoLongSummary(
        "Intelligent-Clinical-Data-Mesh-ICDM-",
        "An insight-driven architecture for real-time clinical trial intelligence and harmonized operational data.",
      ),
    bullets: [
      "Unifies fragmented EDC, safety, lab, and CTMS data into a more coherent lakehouse-style architecture.",
      "Targets operational blind spots in clinical trials by moving from document-heavy reporting toward live intelligence.",
      "Adds a serious healthcare-data systems angle to the GitHub portfolio.",
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
      repoSummary(
        "NanoCredit.AI",
        "An ML project focused on assessing nano-enterprise creditworthiness for more inclusive lending decisions.",
      ),
    tags: ["Fintech", "AI", "Credit"],
    accent: "NC",
    palette: "amber",
    surface: "pulse",
    previewLabels: ["Credit", "Risk", "ML", "Finance"],
    detailIntro:
      repoLongSummary(
        "NanoCredit.AI",
        "A finance-oriented machine-learning workflow shaped around nano-entrepreneurs and credit access.",
      ),
    bullets: [
      "Centers on creditworthiness modeling for nano-enterprises rather than traditional, better-documented borrowers.",
      "Frames the project around financial inclusion and practical exploratory data analysis.",
      "Extends the portfolio into higher-trust finance problems with a clear human outcome.",
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
      repoSummary(
        "Prompt-flow",
        "An AI-orchestrated code generation and deployment workflow for turning prompts into full project scaffolds.",
      ),
    tags: ["Automation", "SDLC", "Python"],
    accent: "PF",
    palette: "magenta",
    surface: "stack",
    previewLabels: ["Flow", "Prompt", "SDLC", "LCNC"],
    detailIntro:
      repoLongSummary(
        "Prompt-flow",
        "An autonomous pipeline that combines LangChain, LLMs, and deployment steps for faster software delivery.",
      ),
    bullets: [
      "Uses prompt-driven orchestration to move from idea to generated code and deployment steps.",
      "Sits at the intersection of developer tooling, automation, and applied LLM workflows.",
      "Fits the broader portfolio story around turning language into capability.",
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
      repoSummary(
        "Econexus",
        "A full-stack social platform for interest-based networking and community discovery.",
      ),
    tags: ["MERN", "Social Product", "Full Stack"],
    accent: "EX",
    palette: "violet",
    surface: "mesh",
    previewLabels: ["Profiles", "Feeds", "Community", "MERN"],
    detailIntro:
      repoLongSummary(
        "Econexus",
        "A virtual platform built around matching people through shared interests, communities, and conversations.",
      ),
    bullets: [
      "Built as the single representative entry for the EconeXus concept while the split frontend and backend repos are omitted here.",
      "Explores product-building patterns around networking, profiles, and community discovery.",
      "Shows range beyond AI-heavy systems and into broader full-stack product work.",
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
      repoSummary(
        "Apna-Doctor",
        "A doctor-patient chatbot workflow designed around appointments, symptom questions, and basic healthcare support.",
      ),
    tags: ["Healthcare", "JavaScript", "Platform"],
    accent: "AD",
    palette: "cyan",
    surface: "beam",
    previewLabels: ["Doctors", "Patients", "Web", "Care"],
    detailIntro:
      repoLongSummary(
        "Apna-Doctor",
        "A healthcare chatbot application that helps with appointments, medical information, and symptom-led queries.",
      ),
    bullets: [
      "Designed around common doctor-patient interaction flows including appointments and question handling.",
      "Keeps the healthcare thread in the portfolio grounded in a product-facing interface.",
      "Broadens the work beyond benchmarks and challenge-style builds.",
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

export const repoArchiveCards: PortfolioCard[] = repoCatalogEntries
  .filter((repo) => !hiddenRepoNames.has(repo.name))
  .filter((repo) => !featuredRepoNames.has(repo.name))
  .map((repo, index) => ({
    id: `repo-${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    section: "projects" as const,
    eyebrow: repo.fork ? "Forked Experiment" : "Repository Archive",
    title: titleFromRepoName(repo.name),
    meta: `${repo.language} · Updated ${formatUpdatedMonth(repo.updated)}`,
    summary: cleanRepoText(repo.summary, repo.name, 190),
    tags: deriveRepoTags(repo),
    accent: accentFromTitle(titleFromRepoName(repo.name)),
    detailIntro: cleanRepoText(repo.longSummary || repo.summary, repo.name, 420),
    bullets: deriveRepoBullets(repo),
    links: [
      { label: "Open Repository", href: repo.url },
      ...(repo.homepage ? [{ label: "Live Preview", href: repo.homepage }] : []),
    ],
    palette: paletteCycle[index % paletteCycle.length],
    surface: surfaceCycle[index % surfaceCycle.length],
    previewLabels: deriveRepoTags(repo),
  }));

export const achievementCards: PortfolioCard[] = [
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
