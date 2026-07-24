export const education = {
  school: 'UPES Dehradun',
  degree: 'B.Tech CS (AI & ML)',
  cgpa: '7.9',
  graduation: 'May 2026',
}

export const experience = [
  {
    id: 'ibm',
    company: 'IBM',
    role: 'AI & ML Engineering Intern',
    period: 'Jun - Aug 2025',
    highlights: [
      'Built a clinical trial matching app processing 370K+ records',
      'Classified patient conditions across 14 categories at 93.57% accuracy using Gemini 1.5 Pro',
      'Engineered a retrieval and ranking pipeline (Precision@10: 0.45, NDCG@10: 0.46)',
      'Integrated end-to-end with Django backend and secure auth',
      'Cut end-to-end inference latency by 28%',
    ],
  },
]

export const projects = [
  {
    id: 'ai-learning-explorer',
    name: 'AI Learning Resource Explorer',
    index: '01',
    stack: ['Django', 'DRF', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker Compose'],
    github: 'https://github.com/Er0ze-Barua/ai-learning-resource-explorer',
    images: ['/projects/explorer-1.png', '/projects/explorer-3.png', '/projects/explorer-2.png'],
    slides: [
      {
        label: 'OVERVIEW',
        tagline: 'Full-stack backend for discovering learning resources',
        body: 'Built a discovery platform with Django as the API gateway and FastAPI serving recommendations. Features PostgreSQL full-text search and Redis caching for queries and dashboard stats.',
      },
      {
        label: 'SDE & BACKEND',
        tagline: 'Service separation, search, & Redis caching',
        body: 'Decoupled auth/CRUD (Django) from recommendations (FastAPI). Integrated full-text search and implemented Redis caching with live HIT/MISS tracking, fully dockerized.',
      },
      {
        label: 'AI & MODELS',
        tagline: 'No AI layer in v1 (Planned Upgrades)',
        body: 'Recommendations are rule-based in v1 to focus on backend architecture. Future plans: embedding-based similarity matching and AI-assisted search query expansion.',
      }
    ],
  },
  {
    id: 'rto-sentinel',
    name: 'RTO Sentinel',
    index: '02',
    stack: ['FastAPI', 'Django', 'Scikit-Learn', 'Docker Compose'],
    github: 'https://github.com/Er0ze-Barua/rto-sentinel',
    images: ['/projects/rto-1.png', '/projects/rto-2.png', '/projects/rto-3.png'],
    slides: [
      {
        label: 'OVERVIEW',
        tagline: 'Order risk scoring for e-commerce fraud detection',
        body: "Built an order risk-scoring system to flag high-risk transaction attempts before dispatch, responding to Razorpay's open problem statement.",
      },
      {
        label: 'SDE & BACKEND',
        tagline: 'FastAPI/Django service communication & input validation',
        body: "Developed and dockerized a multi-service stack utilizing Django and FastAPI. Implemented strict Pydantic validation schemas to guarantee data integrity across service communications.",
      },
      {
        label: 'AI & MODELS',
        tagline: 'Supervised risk classification modeling',
        body: "Achieved 87.2% accuracy, 0.92 precision, and 0.85 recall on the fraud class by training a Scikit-Learn model on 8+ custom engineered transaction and user features.",
      },
    ],
  },
  {
    id: 'cold-email',
    name: 'AI Cold Email Generator',
    index: '03',
    stack: ['Vanilla JS', 'Chrome Extension MV3', 'Gemini API'],
    github: 'https://github.com/Er0ze-Barua/AI-Cold-Email-Generator',
    images: ['/projects/mail-1.png', '/projects/mail-2.png', '/projects/mail-3.png', '/projects/mail-4.png'],
    slides: [
      {
        label: 'OVERVIEW',
        tagline: 'Chrome extension writing context-aware cold emails in one click',
        body: "A Chrome extension that turns any LinkedIn or Indeed job posting into a tailored cold email in one click.",
      },
      {
        label: 'SDE & BACKEND',
        tagline: 'Client-side state management & lightweight architecture',
        body: "Runs entirely client-side under Chrome's Manifest V3 - Vanilla JS, no backend. Users bring their own Gemini API key, stored locally in chrome.storage.local alongside their profile data - no server, no cost, nothing ever leaves the browser except the direct call to Gemini.",
      },
      {
        label: 'AI & MODELS',
        tagline: 'Context extraction & custom prompt layouts',
        body: "Parsed the webpage DOM dynamically to extract key job requirements and applicant background, passing structured data to the Gemini API for tailored draft generation.",
      },
    ],
  },
  {
    id: 'mental-wellness',
    name: 'Mental Wellness AI',
    index: '04',
    stack: ['Django', 'Ollama', 'MentalBERT', 'DistilBERT', 'SQLite'],
    github: 'https://github.com/Er0ze-Barua/Mental-Wellness-AI-Companion',
    images: ['/projects/wellness-1.png', '/projects/wellness-2.png', '/projects/wellness-3.png', '/projects/wellness-4.png'],
    slides: [
      {
        label: 'OVERVIEW',
        tagline: 'Offline mental wellness companion with crisis detection',
        body: "A fully offline mental wellness companion that classifies emotion, retains conversational context, and flags high-risk input before it reaches the user.",
      },
      {
        label: 'SDE & BACKEND',
        tagline: 'Model containerization & state machine routing',
        body: "Django backend serving all four models locally via Ollama - no cloud calls, no data leaving the device. A Finite State Machine intercepts crisis-risk messages and reroutes the session into a de-escalation flow before the main model ever responds.",
      },
      {
        label: 'AI & MODELS',
        tagline: 'Multi-model local inference pipeline',
        body: "Orchestrated Gemma-2b for dialogue, MentalBERT for crisis classification (0.9823 recall), and DistilBERT for emotion tracking, trained on 443K conversational samples.",
      },
    ],
  },
]

export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    desc: 'Core languages I write in daily.',
    skills: ['Python', 'C++', 'JavaScript'],
  },
  {
    id: 'ai-ml',
    title: 'AI / ML',
    desc: 'Models, frameworks and pipelines.',
    skills: [
      'PyTorch',
      'Scikit-Learn',
      'Transformers',
      'LLMs',
      'LangChain',
      'LangGraph',
      'RAG',
      'NLP',
      'HuggingFace',
      'Ollama',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    desc: 'APIs, services and server-side.',
    skills: ['FastAPI', 'Django', 'Pydantic', 'Redis'],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    desc: 'Containerisation and shipping.',
    skills: ['Docker', 'Docker Compose'],
  },
  {
    id: 'data',
    title: 'Data',
    desc: 'Wrangling, features and analysis.',
    skills: ['Pandas', 'NumPy', 'Feature Engineering'],
  },
  {
    id: 'tools',
    title: 'Tools',
    desc: 'Dev tools and workflow essentials.',
    skills: ['Git', 'Chrome Extension MV3'],
  },
  {
    id: 'core-cs',
    title: 'Core CS',
    desc: 'Fundamentals that never go stale.',
    skills: ['Data Structures & Algorithms', 'OS', 'DBMS', 'Computer Networks', 'OOP'],
  },
  {
    id: 'databases',
    title: 'Databases',
    desc: 'Storage, queries and persistence.',
    skills: ['PostgreSQL', 'SQLite'],
  },
]

export const achievements = [
  'Ranked 26/111 teams in Kaggle Multi-Instance Object Detection Challenge',
  'Oracle Cloud Infrastructure Generative AI Professional (2025)',
  'Oracle Data Science Professional (2025)',
]

export const behindTheCurtains = {
  eyebrow: 'ABOUT SELF',
  title: 'Beyond the models & metrics',
  subtitle:
    'The person behind the pipelines — what I care about when I\'m not tuning hyperparameters.',
  intro:
    'I\'m a builder at heart. Whether it\'s shipping an ML system at IBM, grinding LeetCode before sunrise, or experimenting with a new LLM stack on weekends — I like making things that work in the real world, not just in notebooks.',
  cards: [
    {
      id: 'how-i-work',
      label: 'HOW I WORK',
      body: "I break down complex systems by building them piece by piece rather than reading theory cover to cover. I give myself space to struggle with a problem before reaching for help - that's where the actual learning happens. Debugging stays light, but shipping clean, working logic is non-negotiable.",
    },
    {
      id: 'sde-backend',
      label: 'SDE & BACKEND',
      body: "I build server-side systems that hold up: FastAPI and Django up front, PostgreSQL underneath. Outside of shipping, I keep my DSA sharp on LeetCode and Codeforces - clean architecture means nothing if the logic underneath is weak.",
    },
    {
      id: 'ai-models',
      label: 'AI & MODELS',
      body: "I don't treat AI as a notebook demo - I build it into backend services. LangGraph pipelines, RAG systems, offline dialogue models wrapped in real APIs. If it can't be served and scaled, it's not done.",
    },
    {
      id: 'get-in-touch',
      label: 'GET IN TOUCH',
      body: "Let's connect - explore my repos and coding profiles below, or grab my resume. Rather just talk? Get in touch.",
    },
  ],
}
