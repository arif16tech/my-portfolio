export const links = {
  github: "https://github.com/arif16tech",
  linkedin: "https://linkedin.com/in/arif16tech",
  email: "arifmalik16t@gmail.com",
};

export const skills = [
  {
    group: "Languages",
    items: [
      ["JavaScript", "async/await, modules and modern patterns."],
      ["TypeScript", "Typed codebases, interfaces, generics."],
      ["Python", "Scripting, data work, FastAPI and ML glue."],
      ["Java", "OOP fundamentals and data structures."],
      ["HTML5 / CSS3", "Semantic markup, layouts, animations."],
    ],
  },
  {
    group: "Frontend",
    items: [
      ["React", "Component architecture, hooks, performant UIs."],
      ["Tailwind CSS", "Utility-first design systems at speed."],
      ["Framer Motion", "Declarative, spring-based animations."],
      ["GSAP", "Scroll-driven, purposeful motion."],
    ],
  },
  {
    group: "Backend",
    items: [
      ["Node.js", "Event-driven services and scalable APIs."],
      ["Express", "Clean MVC, middleware, auth flows."],
      ["FastAPI", "Typed, async model-serving endpoints."],
      ["Socket.IO", "Real-time bidirectional communication."],
      ["JWT / OAuth", "httpOnly cookies, Passport.js, Google sign-in."],
    ],
  },
  {
    group: "Databases",
    items: [
      ["MongoDB", "Schema design, aggregation pipelines, Atlas."],
      ["PostgreSQL", "Relational modelling, indexes, transactions."],
    ],
  },
  {
    group: "AI / ML",
    items: [
      ["LangChain", "Chains, tools, agents and memory."],
      ["RAG", "Retrieval-grounded answers over your own data."],
      ["FAISS", "Vector similarity search at scale."],
    ],
  },
  {
    group: "DevOps & Tools",
    items: [
      ["Docker", "Containerised services and consistent envs."],
      ["Git / GitHub", "Version control, PRs and CI workflows."],
      ["Vercel / Render", "Zero-config frontend and backend deploys."],
      ["Cloudinary", "Media uploads, transforms and delivery."],
    ],
  },
];

export const projects = [
  {
    n: "01",
    title: "ResumeAI Coach",
    hue: 38,
    tag: "AI · MERN",
    desc: "A full-stack AI platform that analyzes resumes with real-time ATS scoring, keyword gap analysis, and AI-powered interview preparation across Technical, HR, and Resume-based modes.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API", "Google OAuth", "Cloudinary"],
    live: "https://resumeai-coach.vercel.app",
    repo: "https://github.com/arif16tech/resumeai-coach",
    image: "/images/project1.png",
  },
  {
    n: "02",
    title: "StyleStore",
    hue: 330,
    tag: "E-commerce · MERN",
    desc: "A complete e-commerce platform with product catalog, cart management, order tracking, and Admin dashboard with inventory control.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Google OAuth"],
    live: "https://stylestore16tech.vercel.app",
    repo: "https://github.com/arif16tech/ecommerce-app",
    image: "/images/project2.png",
  },
  {
    n: "03",
    title: "ChatApp",
    hue: 205,
    tag: "Realtime · MERN",
    desc: "A real-time chat application with 1-to-1 and group messaging via Socket.IO. Includes WhatsApp-style message ticks, typing indicators, real-time presence tracking, media sharing via Cloudinary.",
    tech: ["React", "Socket.IO", "Node.js", "Express", "MongoDB", "Cloudinary"],
    live: "https://chatapp16tech.vercel.app",
    repo: "https://github.com/arif16tech/chat-app",
    image: "/images/project3.png",
  },
  {
    n: "04",
    title: "Auth System",
    hue: 140,
    tag: "Security · MERN",
    desc: "A production-grade authentication system covering every modern auth pattern: RBAC, OTP verification, rate limiting and more.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Google OAuth", "Zod"],
    repo: "https://github.com/arif16tech/auth-system",
    image: "/images/project4.png",
  },
  {
    n: "05",
    title: "YouTube AI Chatbot",
    hue: 260,
    tag: "RAG · AI · FastAPI",
    desc: "A RAG-powered chatbot that lets you chat with any YouTube video in Hindi or English — grounded answers, not hallucinations.",
    tech: ["React", "FastAPI", "LangChain", "Groq", "FAISS"],
    repo: "https://github.com/arif16tech/youtube-ai-chatbot",
    image: "/images/project5.png",
  },
];

export const journey = [
  {
    n: "01",
    t: "Foundations",
    d: "Started B.Tech in Computer Science. Fell for the web: HTML, CSS and JavaScript — then the craft of building real interfaces.",
  },
  {
    n: "02",
    t: "The MERN Stack",
    d: "Moved into full-stack development with React, Node.js, Express, and MongoDB. Built complete web applications.",
  },
  {
    n: "03",
    t: "First Internship Experience",
    d: "Frontend Web Developer Intern at CodSoft (Jul – Aug 2024). Built and shipped real UI features in a professional team environment.",
  },
  {
    n: "04",
    t: "Full-Stack Internship",
    d: "Full-Stack Web Developer Intern at Prodigy InfoTech (Jun – Jul 2025). Designed scalable systems, robust APIs and production-grade auth.",
  },
  {
    n: "05",
    t: "Exploring AI Engineering",
    d: "Moving beyond full-stack development into Generative AI and Agentic AI, exploring LLMs, RAG pipelines, and intelligent AI systems.",
  },
];
