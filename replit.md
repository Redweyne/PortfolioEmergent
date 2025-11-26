# Overview

This is a sci-fi themed portfolio website for REDWEYNE (Digital Architect), featuring a React frontend with a FastAPI backend. The project showcases projects, skills, and provides a contact form for client inquiries. The design emphasizes a futuristic, cyberpunk aesthetic with neon cyan accents and terminal-style UI elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack:**
- React 19 with Create React App as the build tool
- Tailwind CSS for styling with custom sci-fi/cyberpunk theme variables
- shadcn/ui component library (Radix UI primitives)
- React Router for navigation
- Custom CRACO configuration for build customization

**Design System:**
- Dark theme with neon cyan (#00FFD1) as primary accent color
- Custom CSS variables for consistent theming (neon glows, borders, gradients)
- JetBrains Mono and Orbitron fonts for terminal/sci-fi aesthetic
- Scanlines overlay component for retro-futuristic effect

**Component Structure:**
- Single-page application with sections: Hero, Projects, Skills, About, Contact, Footer
- Static data stored in `src/data/mock.js` (personal info, projects, skills)
- Form handling with validation for contact submissions
- Custom hooks for toast notifications

**Development Enhancements:**
- Visual editing plugin system (babel metadata injection for element tracking)
- Health check plugin for webpack compilation monitoring
- Configurable hot reload and development server setup
- Express middleware integration for dev server endpoints

**Rationale:** React provides a robust component-based architecture suitable for a portfolio site. The custom CRACO configuration allows extended webpack customization without ejecting, enabling the visual editing and health check plugins. Tailwind CSS with custom theme variables ensures consistent sci-fi styling throughout.

## Backend Architecture

**Technology Stack:**
- FastAPI (Python 3.11+) for REST API
- Pydantic for data validation
- Email validator for contact form validation
- SMTP for email notifications

**API Design:**
- RESTful API with `/api` prefix
- Health check endpoint at `/api/`
- Contact form submission at `POST /api/contact`
- Admin endpoint for retrieving messages at `GET /api/contact`

**Security Features:**
- CORS middleware for cross-origin requests
- Rate limiting (5 requests per hour per IP) for contact form
- Honeypot fields (website, phone_confirm) for spam prevention
- Input validation with min/max length constraints
- Email validation using email-validator library

**Data Handling:**
- In-memory storage using defaultdict for rate limiting
- Pydantic models for request/response validation
- Datetime tracking with timezone awareness

**Rationale:** FastAPI was chosen for its high performance, automatic API documentation, and excellent Pydantic integration for validation. The rate limiting prevents spam abuse while honeypot fields catch bots. CORS middleware is essential for frontend-backend communication across different origins in development/production.

## Deployment Architecture

**Production Stack:**
- Nginx as reverse proxy
- PM2 for process management
- Gunicorn with Uvicorn workers for ASGI serving
- Systemd or PM2 for service persistence

**Configuration:**
- Frontend: Static build served by Nginx
- Backend: Gunicorn binding to 127.0.0.1:8000 with 4 workers
- SSL via Certbot/Let's Encrypt
- Environment variables via .env file

**Process Management:**
- PM2 ecosystem.config.js defines backend service
- Auto-restart on failure
- Log rotation and error tracking
- Memory limit of 500MB per worker

**Rationale:** Nginx efficiently serves static files and proxies API requests. PM2 provides robust process management with automatic restarts and logging. Gunicorn with Uvicorn workers optimally handles ASGI applications, balancing performance with resource usage.

# External Dependencies

## Frontend Dependencies

**UI Libraries:**
- Radix UI (@radix-ui/react-*) - Accessible, unstyled component primitives for building the UI
- shadcn/ui - Pre-styled components built on Radix UI
- Lucide React - Icon library for consistent iconography

**Animation/3D:**
- @splinetool/react-spline & @splinetool/runtime - 3D graphics and animations for sci-fi aesthetic

**Form Handling:**
- React Hook Form via @hookform/resolvers - Form state management
- Zod (implied via resolvers) - Schema validation

**Styling:**
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Managing component variants
- tailwind-merge & clsx - Conditional class name merging

**HTTP Client:**
- Axios - Promise-based HTTP requests to backend API

**Utilities:**
- date-fns - Date formatting and manipulation
- cmdk - Command palette component
- embla-carousel-react - Carousel/slider functionality

## Backend Dependencies

**Core Framework:**
- FastAPI - Modern, high-performance web framework
- Uvicorn - ASGI server for running FastAPI
- Pydantic - Data validation using Python type hints

**Email:**
- email-validator - Validates email addresses in contact form
- SMTP (Python stdlib) - Sends email notifications

**Utilities:**
- python-dotenv - Environment variable management
- python-multipart - Multipart form data parsing (if needed for file uploads)

## Build & Development Tools

**Frontend:**
- Create React App (react-scripts) - Build tooling and dev server
- CRACO - Override CRA config without ejecting
- Babel - JavaScript transpilation
- Webpack - Module bundling (via CRA)
- PostCSS & Autoprefixer - CSS processing

**Backend:**
- Gunicorn - Production WSGI/ASGI server
- PM2 - Process manager for Node.js/Python apps in production

## Third-Party Services

**Email Delivery:**
- SMTP server (configuration in .env) - Sends contact form submissions to site owner

**Domain/Hosting:**
- VPS deployment assumed (Ubuntu/Debian based)
- Nginx web server
- Certbot for SSL certificates

**Development:**
- Supervisor with code-server (VS Code in browser) - Development environment integration
- Password authentication for code-server access

## Rationale for Dependencies

The frontend dependencies prioritize accessibility (Radix UI), developer experience (shadcn/ui), and performance (React 19, Tailwind). The Spline tools enable unique 3D effects matching the sci-fi theme.

The backend keeps dependencies minimal - FastAPI provides everything needed with excellent performance. Email-validator ensures data quality while python-dotenv enables secure configuration management.

The deployment stack (Nginx, Gunicorn, PM2) is battle-tested and provides reliability, performance monitoring, and easy scaling capabilities for production workloads.