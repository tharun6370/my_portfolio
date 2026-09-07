import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  name: 'THARUN',
  title: 'AI Intern, Vibe Coder & Full Stack Builder',
  tagline: 'High-velocity AI vibe coder & student engineer building autonomous RAG agents, local LLM platforms, and cyber-defense tools. Actively seeking AI/Software Internships (Remote | On-site in Chennai & Bangalore) & welcoming professional mentorship.',
  bio: 'Passionate student engineer and experienced AI vibe coder building end-to-end software with modern AI tools. AI Intern alumnus at Virtual Internship 6.0 (engineered an AI phishing detection platform), creator of AuditArmor AI & Superbot RAG. Actively seeking internships in Chennai, Bangalore, or Remote with a strong desire to learn under experienced mentors.',
  detailedBio: [
    'I am a high-velocity AI vibe coder and Computer Science student who leverages state-of-the-art AI tools, LLM SDKs, and rapid prototyping workflows to build ambitious, real-world systems. Learning as a student without a dedicated in-person mentor has fueled my self-driven curiosity to master modern AI agent pipelines, full-stack web architectures, and decentralized protocols.',
    'During Virtual Internship 6.0, I served as an AI Intern and engineered an intelligent Phishing Detection Website that analyzes suspicious URLs, domain vectors, and email content in real time. My independent engineering work includes AuditArmor AI (a zero-data-leakage local LLM auditor running via Ollama/vLLM) and Superbot (a hybrid RAG + live web search agent using Gemini 2.5 Flash and LangGraph).',
    'I am actively seeking AI, Machine Learning, and Full-Stack Software Engineering internships — open to both Remote positions and On-site opportunities in Chennai and Bangalore. I am deeply eager to learn from and be guided by experienced industry professionals to refine my system design skills and engineering rigor.'
  ],
  location: 'Chennai / Bangalore, India (Open to Remote & On-Site)',
  email: 'tharun6370@gmail.com',
  phone: '+91 (Contact via Email/LinkedIn)',
  availableForHire: true,
  avatarUrl: 'https://avatars.githubusercontent.com/u/177113271?v=4',
  resumeUrl: '#',
  stats: {
    yearsOfExperience: 'Student / AI Intern',
    completedProjects: '12+',
    codeCommits: '500+',
    happyCollaborators: '100%'
  },
  socials: [
    {
      id: 'github',
      platform: 'GitHub',
      url: 'https://github.com/tharun6370',
      username: '@tharun6370',
      iconName: 'Github'
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/tharun6370',
      username: 'in/tharun6370',
      iconName: 'Linkedin'
    },
    {
      id: 'email',
      platform: 'Email',
      url: 'mailto:tharun6370@gmail.com',
      username: 'tharun6370@gmail.com',
      iconName: 'Mail'
    }
  ],
  experiences: [
    {
      id: 'exp-internship',
      role: 'AI Intern',
      company: 'Virtual Internship 6.0',
      companyUrl: 'https://github.com/tharun6370',
      period: '2024 — 2025',
      location: 'Virtual / Remote',
      description: 'Completed rigorous virtual internship program focusing on Artificial Intelligence, Machine Learning pipelines, and cybersecurity engineering.',
      achievements: [
        'Engineered an end-to-end AI Phishing Detection Website classifying malicious URLs, spoofed domains, and deceptive patterns.',
        'Extracted security heuristic features (lexical URL structure, HTTPS validation, domain age, abnormal tokens) to train predictive ML models.',
        'Built an intuitive interactive dashboard providing real-time threat scores, explainable classification indicators, and actionable safety tips.'
      ],
      technologies: ['Python', 'Machine Learning', 'Cybersecurity', 'Feature Engineering', 'Scikit-Learn', 'Flask/FastAPI', 'HTML/CSS/JS'],
      current: false
    },
    {
      id: 'exp-1',
      role: 'AI Systems & Full Stack Vibe Coder (Independent Projects)',
      company: 'AuditArmor & Superbot Research',
      companyUrl: 'https://github.com/tharun6370',
      period: '2025 — Present',
      location: 'Remote / Independent',
      description: 'Architecting privacy-first compliance audit platforms and autonomous multi-modal agentic search pipelines.',
      achievements: [
        'Engineered AuditArmor AI, an offline legal and financial audit automation platform with zero-data-leakage utilizing local LLMs (Ollama / vLLM) and vector search.',
        'Developed Superbot, a Universal RAG + Real-time Web Search agent utilizing LangGraph ReAct routing, FAISS embeddings, and Google Gemini 2.5 Flash.',
        'Designed modular document ingestion pipelines supporting PDF, DOCX, TXT, and CSV file formats with contextual citation mapping.'
      ],
      technologies: ['Python', 'LangGraph', 'LangChain', 'Gemini 2.5 Flash', 'FastAPI', 'Streamlit', 'FAISS', 'Ollama', 'React'],
      current: true
    },
    {
      id: 'exp-2',
      role: 'DeFi & Protocol Engineer',
      company: 'Sentinel Protocol (Shardeum Ecosystem)',
      companyUrl: 'https://github.com/tharun6370/sentinel-protocol',
      period: '2025 — 2026',
      location: 'Remote / Hackathons',
      description: 'Built the first "Active Defense" security command center and emergency panic vault for DeFi wallet protection.',
      achievements: [
        'Developed Panic Protocol: an AI-driven emergency killswitch smart contract executing single-block atomic permission revocations and fund evacuation.',
        'Engineered Stealth Protocol to shield transaction intents and combat mempool front-running bots.',
        'Built full-stack real-time analytics dashboard with Next.js 14, Ethers.js, and Solidity smart contracts.'
      ],
      technologies: ['Solidity', 'Next.js 14', 'TypeScript', 'Ethers.js', 'Shardeum', 'Tailwind CSS', 'Smart Contracts'],
      current: false
    },
    {
      id: 'exp-3',
      role: 'Full Stack & Hackathon Developer',
      company: 'Odoo Hackathon & Open Source Initiatives',
      companyUrl: 'https://github.com/tharun6370',
      period: '2024 — 2025',
      location: 'India',
      description: 'Participated in competitive hackathons and engineered modern web applications, business workflows, and interactive tooling.',
      achievements: [
        'Designed scalable ERP modules and modern frontends adhering to clean architecture principles.',
        'Contributed to diffusion model research (IDM-VTON) and modern computer vision tooling.',
        'Created performant full-stack JavaScript & Python automation utilities.'
      ],
      technologies: ['JavaScript', 'Python', 'React', 'Git', 'REST APIs', 'PostgreSQL', 'Docker'],
      current: false
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Science & Engineering (Undergraduate Student)',
      institution: 'Engineering University',
      period: '2021 — 2025 / Present',
      location: 'India',
      honors: 'Specialization in Artificial Intelligence, Machine Learning & Systems Architecture',
      details: 'Self-driven student engineer passionate about AI-assisted software development ("Vibe Coding"), autonomous agent frameworks, distributed computing, and cybersecurity.'
    }
  ],
  skills: [
    {
      id: 'ai-ml',
      title: 'AI Systems & Agentic Workflows',
      description: 'Autonomous reasoning agents, RAG pipelines, local LLM deployments, and vibe coding.',
      skills: [
        { name: 'AI-Assisted Vibe Coding', level: 96, years: '2 yrs', isKeySkill: true },
        { name: 'LangGraph & LangChain', level: 95, years: '2 yrs', isKeySkill: true },
        { name: 'Google Gemini 2.5 / Pro', level: 94, years: '2 yrs', isKeySkill: true },
        { name: 'Local LLMs (Ollama / vLLM)', level: 92, years: '2 yrs', isKeySkill: true },
        { name: 'Vector DBs (FAISS, Qdrant, Chroma)', level: 90, years: '2 yrs', isKeySkill: true },
        { name: 'ReAct Agent Routing', level: 93, years: '2 yrs', isKeySkill: true },
        { name: 'Phishing & Threat Detection ML', level: 89, years: '1 yr', isKeySkill: true },
        { name: 'Document Ingestion (Unstructured/PyMuPDF)', level: 88, years: '2 yrs' }
      ]
    },
    {
      id: 'backend-python',
      title: 'Backend & Python Engineering',
      description: 'Building high-throughput APIs, asynchronous pipelines, and structured microservices.',
      skills: [
        { name: 'Python 3.10+', level: 94, years: '3 yrs', isKeySkill: true },
        { name: 'FastAPI & REST APIs', level: 90, years: '2 yrs', isKeySkill: true },
        { name: 'Streamlit UI Framework', level: 92, years: '2 yrs', isKeySkill: true },
        { name: 'Scikit-Learn / ML Pipelines', level: 88, years: '1.5 yrs', isKeySkill: true },
        { name: 'Node.js & Express', level: 88, years: '2 yrs' },
        { name: 'PostgreSQL & Relational Schemas', level: 86, years: '2 yrs' },
        { name: 'DuckDuckGo API & Web Search Grounding', level: 90, years: '2 yrs' }
      ]
    },
    {
      id: 'frontend-web',
      title: 'Frontend & Modern Web',
      description: 'Designing performant, interactive interfaces and real-time developer dashboards.',
      skills: [
        { name: 'React.js & Next.js 14', level: 92, years: '3 yrs', isKeySkill: true },
        { name: 'TypeScript & JavaScript', level: 90, years: '3 yrs', isKeySkill: true },
        { name: 'Tailwind CSS', level: 94, years: '3 yrs', isKeySkill: true },
        { name: 'Motion / Animations', level: 86, years: '2 yrs' },
        { name: 'State Management (Hooks/Zustand)', level: 89, years: '2 yrs' },
        { name: 'Responsive UI / UX Design', level: 92, years: '3 yrs' }
      ]
    },
    {
      id: 'web3-devops',
      title: 'Blockchain, Web3 & DevOps',
      description: 'Deploying smart contracts, DeFi security logic, and reproducible container workflows.',
      skills: [
        { name: 'Solidity Smart Contracts', level: 85, years: '1.5 yrs', isKeySkill: true },
        { name: 'Ethers.js / Web3.js', level: 86, years: '1.5 yrs', isKeySkill: true },
        { name: 'Shardeum Blockchain', level: 88, years: '1.5 yrs' },
        { name: 'Git & GitHub CI/CD', level: 92, years: '3 yrs', isKeySkill: true },
        { name: 'Docker & Virtual Environments', level: 84, years: '2 yrs' }
      ]
    }
  ],
  projects: [
    {
      id: 'phishing-detection',
      title: 'AI Phishing Detection Website',
      tagline: 'Machine-learning powered cybersecurity tool identifying malicious URLs and deceptive web threats.',
      description: 'Engineered during Virtual Internship 6.0 as an AI Intern. An intelligent threat detection platform that analyzes URL syntax, security certificates, and lexical patterns to predict phishing risks in real time.',
      longDescription: 'Developed during my tenure as an AI Intern at Virtual Internship 6.0, this cybersecurity platform tackles deceptive phishing attacks and credential harvesting. The system extracts multi-dimensional features from submitted URLs (such as lexical length, suspicious top-level domains, redirection count, prefix/suffix flags, and IP-based URLs) and classifies them using trained machine learning algorithms. It features an intuitive web interface providing instant safety ratings, threat breakdowns, and proactive safety guidance.',
      category: 'AI / Cloud',
      featured: true,
      year: '2025',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/tharun6370',
      githubUrl: 'https://github.com/tharun6370',
      tags: ['Python', 'Machine Learning', 'Cybersecurity', 'Phishing Detection', 'Feature Engineering', 'FastAPI', 'Scikit-Learn'],
      highlights: [
        'Developed during Virtual Internship 6.0 as part of the AI Engineering track.',
        'Real-time lexical and structural feature extraction for malicious URL analysis.',
        'High-accuracy classification pipeline distinguishing legitimate sites from phishing clones.',
        'Clean, accessible web interface delivering instant risk scores and actionable security feedback.'
      ],
      metrics: [
        { label: 'Role', value: 'AI Intern' },
        { label: 'Domain', value: 'Cybersecurity ML' },
        { label: 'Program', value: 'Virtual Internship 6.0' }
      ],
      architecture: [
        'ML Pipeline: Scikit-Learn classification model trained on verified phishing datasets',
        'Feature Extractor: Lexical token parser, domain reputation, and HTTPS inspection',
        'Backend: Lightweight Python API for instantaneous inference',
        'UI: Responsive interactive security dashboard'
      ]
    },
    {
      id: 'auditarmor-ai',
      title: 'AuditArmor AI — Local Legal & Financial Auditor',
      tagline: 'Enterprise-grade, privacy-first audit automation platform running entirely on local LLMs.',
      description: 'Zero-data-leakage legal and financial audit automation platform that runs on local hardware using Ollama / vLLM, parsing contracts, transaction logs, and policies without external cloud APIs.',
      longDescription: 'AuditArmor AI was engineered for law firms, corporate compliance officers, and financial auditors who require airtight privacy. It ingests NDAs, MSAs, and financial ledgers, extracting clauses, identifying liabilities, and flagging non-compliance against GDPR, HIPAA, and SEC regulations with exact page-and-paragraph source mapping and confidence scoring.',
      category: 'AI / Local LLM',
      featured: true,
      year: '2026',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/tharun6370/AuditArmor-AI',
      githubUrl: 'https://github.com/tharun6370/AuditArmor-AI',
      tags: ['Local LLMs', 'Ollama / vLLM', 'FastAPI', 'LangChain', 'Qdrant / ChromaDB', 'PyMuPDF', 'React', 'Privacy-First'],
      highlights: [
        'Zero-Data-Leakage offline architecture running quantized Llama-3 / Mistral-7B models.',
        'Automated contract review mapping risk levels (Low, Med, High) with model confidence metrics.',
        'Relational ER lineage schema connecting users, audit sessions, doc elements, and findings.',
        'Interactive RAG-powered statutory QA assistant with line-level source attribution.'
      ],
      metrics: [
        { label: 'Privacy', value: '100% Offline' },
        { label: 'Latency', value: 'Local GPU/CPU' },
        { label: 'Frameworks', value: 'GDPR / SEC' }
      ],
      architecture: [
        'Inference Engine: Local Ollama / vLLM serving quantized Llama-3-8B & Mistral-7B',
        'Vector Store: Local Qdrant / ChromaDB with dense embeddings',
        'Backend: FastAPI with LangChain / LlamaIndex retrieval orchestration',
        'Data Parser: PyMuPDF + Tesseract OCR with structured chunking'
      ]
    },
    {
      id: 'superbot-rag-agent',
      title: 'Superbot — Universal RAG + Web Search Agent',
      tagline: 'Multi-modal AI agent intelligently routing queries between private docs and live internet.',
      description: 'Universal document QA and real-time research agent powered by LangGraph ReAct routing, FAISS vector embeddings, DuckDuckGo search, and Google Gemini 2.5 Flash.',
      longDescription: 'Superbot eliminates the static limitation of traditional RAG systems. When a user queries their uploaded documents (PDF, DOCX, TXT, CSV), the LangGraph router autonomously decides whether to retrieve internal document chunks, query the live internet via DuckDuckGo with date validation, or perform hybrid synthesis across both channels.',
      category: 'AI / Agents',
      featured: true,
      year: '2025',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/tharun6370/superbot-rag-agent',
      githubUrl: 'https://github.com/tharun6370/superbot-rag-agent',
      tags: ['Google Gemini 2.5', 'LangGraph', 'LangChain', 'FAISS', 'Streamlit', 'Python 3.10+', 'DuckDuckGo API'],
      highlights: [
        'Universal document loading and parsing for PDF, DOCX, TXT, and CSV files.',
        'Intelligent LangGraph ReAct Router dynamically deciding retrieval vs live web search.',
        'Multi-turn conversational memory preserving query context across questions.',
        'Real-time synthesis combining document citations with live stock, news, and market data.'
      ],
      metrics: [
        { label: 'Model', value: 'Gemini 2.5 Flash' },
        { label: 'Formats', value: 'PDF, DOCX, CSV' },
        { label: 'Routing', value: 'LangGraph ReAct' }
      ],
      architecture: [
        'Core LLM: Google Gemini 2.5 Flash via LangChain',
        'Agent Orchestration: LangGraph ReAct Agent with dynamic tool routing',
        'Vector Store: FAISS with all-MiniLM-L6-v2 HuggingFace embeddings',
        'UI: Streamlit interactive conversational workspace'
      ]
    },
    {
      id: 'sentinel-protocol',
      title: 'Sentinel Protocol — Active Defense DeFi Fire Alarm',
      tagline: 'AI-powered emergency panic vault and threat neutralization command center.',
      description: 'Active defense dashboard for Web3 users built on Shardeum, combining Natural Language distress detection with rapid-response smart contracts to evacuate assets in a single block.',
      longDescription: 'DeFi users typically suffer from the "Slow Hands Problem" when malicious contracts drain wallets before manual revocations occur. Sentinel Protocol detects distress signals and initiates the PanicVault contract, executing atomic batch transactions on Shardeum to revoke permissions and evacuate assets to a secure cold vault in seconds.',
      category: 'Web3 / Security',
      featured: true,
      year: '2026',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/tharun6370/sentinel-protocol',
      githubUrl: 'https://github.com/tharun6370/sentinel-protocol',
      tags: ['Solidity', 'Shardeum', 'Next.js 14', 'Smart Contracts', 'DeFi Security', 'TypeScript', 'Ethers.js'],
      highlights: [
        'Panic Protocol: Emergency single-block batch revocation and vault evacuation.',
        'Stealth Protocol: Intent privacy shield preventing mempool front-running.',
        'Natural Language threat detection triggering automated security responses.',
        'Full-stack Next.js 14 Command Center dashboard with real-time wallet analytics.'
      ],
      metrics: [
        { label: 'Response', value: 'Single Block' },
        { label: 'Network', value: 'Shardeum' },
        { label: 'Protection', value: 'Zero Front-run' }
      ],
      architecture: [
        'Smart Contracts: Solidity PanicVault batch evacuation contracts',
        'Blockchain: Shardeum EVM-compatible sharded network',
        'Frontend: Next.js 14 with Ethers.js and Tailwind CSS',
        'Agent Layer: NLP distress trigger analyzer'
      ]
    },
    {
      id: 'idm-vton',
      title: 'IDM-VTON Research & Implementation',
      tagline: 'Improving diffusion models for authentic virtual try-on in the wild.',
      description: 'Exploration and implementation of state-of-the-art diffusion models for high-fidelity, authentic garment virtual try-on and human pose transfer.',
      longDescription: 'Implemented experiments and workflows surrounding IDM-VTON (ECCV 2024), focusing on cross-attention mechanisms, image warping, and latent diffusion pipelines to achieve realistic fabric drapery and photo-consistent garment synthesis.',
      category: 'AI / Vision',
      featured: false,
      year: '2024',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/tharun6370/IDM-VTON',
      githubUrl: 'https://github.com/tharun6370/IDM-VTON',
      tags: ['PyTorch', 'Diffusion Models', 'Computer Vision', 'Generative AI', 'Python'],
      highlights: [
        'Authentic garment texture preservation and human pose conditioning.',
        'Evaluation of high-resolution latent diffusion architectures.'
      ],
      metrics: [
        { label: 'Domain', value: 'Diffusion AI' },
        { label: 'Paper', value: 'ECCV 2024' }
      ]
    },
    {
      id: 'odoo-hackathon',
      title: 'Odoo Enterprise Workflow Systems',
      tagline: 'Rapid enterprise application architecture and business flow automation.',
      description: 'Engineered modular solutions during the Odoo Hackathon, streamlining business processes, ERP data models, and customized workflow automation.',
      longDescription: 'Developed specialized workflow modules tailored for fast enterprise operations, clean schema modeling, and seamless automated record pipelines.',
      category: 'Full Stack',
      featured: false,
      year: '2025',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://github.com/tharun6370/Odoo-Hackathon',
      githubUrl: 'https://github.com/tharun6370/Odoo-Hackathon',
      tags: ['Python', 'PostgreSQL', 'ERP Architecture', 'Enterprise Workflows'],
      highlights: [
        'Clean relational schema designs and modular backend triggers.',
        'High-speed business logic execution with automated reporting.'
      ],
      metrics: [
        { label: 'Event', value: 'Odoo Hackathon' },
        { label: 'Architecture', value: 'Modular' }
      ]
    }
  ]
};
