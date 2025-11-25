// Mock data for Redweyne's Sci-Fi Portfolio

export const personalInfo = {
  name: "REDWEYNE",
  title: "Digital Architect",
  tagline: "Crafting Exceptional Digital Experiences",
  email: "hello@redweyne.com",
  bio: "I don't just write code—I architect digital experiences that transform how you work and interact online. Every project I touch is an opportunity to push boundaries, whether it's developing AI-powered tools that intelligently manage thousands of emails or creating privacy-first platforms that put control back in users' hands.",
  philosophy: "The web is saturated with mediocre applications that merely function. I build solutions that excel—combining cutting-edge technology with ruthless attention to user experience. My approach is simple: understand the core problem, eliminate unnecessary complexity, and deliver results that speak louder than promises.",
  availability: "Available for Projects",
  responseTime: "Usually responds within 24 hours"
};

export const projects = [
  {
    id: 1,
    name: "INBOX_AI",
    codename: "PROJECT::NEURAL_MAIL",
    description: "An intelligent email management platform powered by AI that helps you organize, prioritize, and respond to emails efficiently. Features smart categorization, AI-generated summaries, and automated responses.",
    features: [
      "AI-powered email summaries",
      "Smart inbox categorization",
      "Automated response suggestions",
      "Priority detection algorithms"
    ],
    tech: ["React", "TypeScript", "AI/ML", "Node.js", "PostgreSQL"],
    status: "OPERATIONAL",
    link: "https://redweyne.com/inboxai/"
  },
  {
    id: 2,
    name: "TEMP_MAIL",
    codename: "PROJECT::GHOST_PROTOCOL",
    description: "A secure temporary email service that protects your privacy. Generate disposable email addresses instantly for testing, signups, and avoiding spam. Built with security and user experience in mind.",
    features: [
      "Instant email generation",
      "Real-time inbox updates",
      "Privacy-focused architecture",
      "Zero registration required"
    ],
    tech: ["React", "TypeScript", "WebSocket", "Express", "Redis"],
    status: "ACTIVE",
    link: "https://redweyne.com/tempmail"
  }
];

export const skills = {
  frontend: {
    title: "FRONTEND_SYSTEMS",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS"]
  },
  backend: {
    title: "BACKEND_CORE",
    items: ["Node.js & Express", "PostgreSQL & Redis", "REST & GraphQL APIs"]
  },
  emerging: {
    title: "EMERGING_TECH",
    items: ["AI/ML Integration", "WebSocket & Real-time", "Edge Computing"]
  },
  devops: {
    title: "DEVOPS_INFRA",
    items: ["Cloud Deployment", "Performance Optimization", "Security Protocols"]
  },
  architecture: {
    title: "ARCHITECTURE",
    items: ["Microservices", "System Design", "Scalable Solutions"]
  }
};

export const stats = [
  { label: "Projects Deployed", value: "15+", unit: "SYSTEMS" },
  { label: "Tech Mastered", value: "20+", unit: "PROTOCOLS" },
  { label: "Code Written", value: "100K+", unit: "LINES" },
  { label: "Uptime", value: "99.9", unit: "%" }
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/redweyne", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/redweyne", icon: "Linkedin" },
  { name: "Email", url: "mailto:hello@redweyne.com", icon: "Mail" }
];
