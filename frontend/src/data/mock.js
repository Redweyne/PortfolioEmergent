// Mock data for Redweyne's Sci-Fi Portfolio

export const personalInfo = {
  name: "REDWEYNE",
  title: "Digital Architect",
  tagline: "Crafting Exceptional Digital Experiences",
  email: "redweynemk@gmail.com",
  heroStatement: "You have a vision. I have the obsession to make it real. Let's build something the internet hasn't seen yet.",
  bio: "Who I am matters far less than what I can build for you. Forget the resume, the credentials, the carefully curated story—what you're really here for is someone who can take the chaos in your head and turn it into something that actually works. Something that makes people stop scrolling. Something that solves the problem you couldn't articulate until you saw it solved.",
  philosophy: "I operate on a simple belief: the world doesn't need another developer. It needs someone obsessed enough to lose sleep over a button's placement, paranoid enough to anticipate the edge case you haven't imagined yet, and stubborn enough to rebuild something five times until it feels inevitable. Your project isn't a transaction to me—it's a proving ground. And I don't show up to participate. I show up to leave a mark.",
  availability: "Available for Projects",
  responseTime: "Usually responds within 24 hours"
};

export const projects = [
  {
    id: 1,
    name: "INBOX_AI",
    codename: "PROJECT::NEURAL_MAIL",
    description: "Email overwhelm is real—hundreds of messages, buried priorities, hours wasted. INBOX_AI doesn't just organize your inbox; it thinks for you. AI-generated summaries cut through noise, smart categorization learns your patterns, and automated responses handle the repetitive stuff so you can focus on what actually matters.",
    features: [
      "Summarizes 50+ email threads in seconds",
      "Priority scoring that learns your workflow",
      "One-click smart replies for routine messages",
      "Dashboard analytics to reclaim your time"
    ],
    tech: ["React", "TypeScript", "AI/ML", "Node.js", "PostgreSQL"],
    status: "OPERATIONAL",
    link: "https://redweyne.com/inboxai/"
  },
  {
    id: 2,
    name: "TEMP_MAIL",
    codename: "PROJECT::GHOST_PROTOCOL",
    description: "Every signup form is a data grab. Every newsletter is a commitment. TEMP_MAIL gives you throwaway addresses that self-destruct—no registration, no trace, no spam reaching your real inbox. Built for developers testing email flows and anyone tired of giving away their identity for a PDF.",
    features: [
      "Auto-expiring aliases with custom TTL",
      "SendGrid-powered delivery (100+ emails/day)",
      "Full HTML & attachment support",
      "Zero-trace cleanup on expiry"
    ],
    tech: ["React", "TypeScript", "WebSocket", "Express", "Redis"],
    status: "ACTIVE",
    link: "https://redweyne.com/tempmail"
  },
  {
    id: 3,
    name: "[ CLASSIFIED ]",
    codename: "PROJECT::PHANTOM_LINK",
    description: "Some projects aren't ready to see the light. This one's deep in the lab—encrypted comms, decentralized architecture, zero-knowledge proofs. When it surfaces, it'll redefine how you think about digital ownership. Until then, the specs remain sealed.",
    features: [
      "[ REDACTED ] encryption protocol",
      "Decentralized node architecture",
      "Zero-knowledge identity layer",
      "Launch: Q2 2025"
    ],
    tech: ["Rust", "WebAssembly", "Cryptography", "P2P", "???"],
    status: "CLASSIFIED",
    link: null,
    isClassified: true
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
  { name: "GitHub", url: "https://github.com", icon: "Github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
  { name: "Email", url: "mailto:redweynemk@gmail.com", icon: "Mail" }
];
