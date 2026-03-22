# 🎯 Upfolio - AI-Powered Opportunity Discovery & Management Platform

A production-ready, full-stack platform that leverages AI to help users discover, track, and manage professional opportunities (internships, hackathons, scholarships, and more). Built on the Atlas AI Command Center framework with advanced features for governance, analytics, and intelligent recommendations.

**Live Repository**: [github.com/dhruvi-git/atlas-template-dhruvi](https://github.com/dhruvi-git/atlas-template-dhruvi)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start Guide](#quick-start-guide)
- [Configuration](#configuration)
- [Usage & Features](#usage--features)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**Upfolio** is an AI-first platform designed to empower students and professionals in discovering and managing their next career opportunity. It serves as a **"Control Plane"** for all things related to career development, combining:

✅ **Intelligent Opportunity Matching** - AI-powered discovery across multiple platforms  
✅ **Portfolio Tracking** - Track your portfolio status across opportunities  
✅ **Policy-Based Governance** - Create natural language rules to filter and manage opportunities  
✅ **AI-Powered Insights** - Get proactive recommendations and analytics  
✅ **Audit & Compliance** - Complete audit trail of all activities  
✅ **Role-Based Access Control** - Secure, production-ready authentication  

The platform aggregates opportunities from platforms like:
- **Unstop** - Hackathons, competitions, internships
- **Devfolio** - Hackathons for developers
- **Hack2Skill** - Skill-based competitions
- **LinkedIn** - Professional opportunities
- **Internshala** - Internship portal

---

## ✨ Key Features

### 1. **AI-Powered Opportunity Discovery**
- **Upfolio Tracker**: Search and discover internships, hackathons, and scholarships across 5+ platforms
- **Smart Search**: Natural language search that understands your intent
- **One-Click Integration**: Open opportunities directly on source platforms
- **Opportunity Seeds**: Pre-configured searches for popular categories

### 2. **AI Policies & Governance**
- **Natural Language Policies**: Create policies in plain English (e.g., "Only show hackathons from verified hosts")
- **DSL Translation**: Policies are automatically translated to a Domain-Specific Language (DSL)
- **Dynamic Filtering**: Apply policies to filter opportunities automatically
- **Policy Management**: Create, update, and manage multiple policies with priorities

### 3. **AI Insights & Analytics**
- **Intelligent Recommendations**: Get AI-generated insights based on your data
- **Severity Levels**: Critical, Warning, and Recommendation categorization
- **Impact Analysis**: Understand potential impact of each insight
- **Proactive Suggestions**: Suggestions for optimizing your opportunity search

### 4. **AI Manager - Agentic Chatbot**
- **Global Chatbot Modal**: 🤖 Button in header - accessible from any page
- **Context-Aware Assistance**: Understands your current page and context
- **Function Calling**: Execute tools like searching logs, fetching statistics
- **Multi-Turn Conversations**: Maintain context across multiple messages
- **Tool Integration**: Can search audit logs, retrieve opportunity stats, and more

### 5. **Comprehensive Audit Logging**
- **Automatic Request Logging**: Every API request is logged with metadata
- **Custom Event Tracking**: Log business events (policy created, opportunity saved, etc.)
- **Export Functionality**: Export logs as JSON for analysis
- **Audit Dashboard**: View, filter, and search all activities

### 6. **User Management & Authentication**
- **Self-Registration**: Users can sign up with email verification
- **Admin Approval**: Optional admin approval workflow for new users
- **Domain-Based Auto-Approval**: Auto-approve users from trusted domains
- **Multi-Role Support**: ADMIN, DEVELOPER, USER roles with fine-grained controls
- **NextAuth.js Integration**: Secure JWT token management
- **Keycloak Support**: Optional OAuth2/OIDC for enterprise SSO

### 7. **Admin Dashboard**
- **User Management**: `/admin/users` - Approve/reject pending registrations
- **Audit Viewer**: `/admin/audit` - View and export system activity logs
- **User Actions**: Approve, reject, or delete user accounts

### 8. **Role-Based Access Control (RBAC)**
- **JSON-Based Authorization**: `authz.map.json` for endpoint-level access
- **Public Routes**: Separate public access configuration
- **Dynamic Permissions**: Assign roles to users with granular endpoint control

---

## 💻 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Backend** | Python | 3.11+ | Core runtime |
| **API Framework** | FastAPI | Latest | High-performance async API |
| **Database** | PostgreSQL | 15+ | Persistent data storage |
| **Migrations** | Alembic | Latest | Database versioning |
| **Frontend** | Next.js | 14+ | Modern React framework |
| **UI Framework** | React | 18+ | Component-based UI |
| **Styling** | Tailwind CSS | 3.4+ | Utility-first CSS |
| **Auth** | NextAuth.js | Latest | Frontend session management |
| **TypeScript** | TypeScript | 5.5+ | Type-safe frontend |
| **AI Engine** | Google Gemini | 2.0-flash | Policy translation & insights |
| **Identity** | Keycloak | 24+ | Optional: Enterprise SSO |
| **Containerization** | Docker | Latest | Container images |
| **Orchestration** | Docker Compose | Latest | Local development |

---

## 🏗️ Architecture

### System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js 14)                       │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Pages: Dashboard, Upfolio, Admin, AI Policies & Insights   │  │
│  │ Components: AIManager (Global Chatbot), Charts, Tables     │  │
│  │ Auth: NextAuth.js + JWT Token Management                  │  │
│  └────────────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────────┘
                     │ HTTP/REST API
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│               Backend API (FastAPI + Python 3.11)               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Core Services:                                          │   │
│  │  • Authentication & Authorization (auth.py)            │   │
│  │  • User Management (users.py)                          │   │
│  │  • Admin Functions (admin.py)                          │   │
│  │  • AI Features (ai.py)                                 │   │
│  │  • Agent Registry (agents.py)                          │   │
│  │  • Telemetry (telemetry.py)                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Services Layer:                                         │   │
│  │  • Policy Service (DSL Translation)                    │   │
│  │  • Insights Service (AI Recommendations)               │   │
│  │  • Chat Service (AI Manager Backend)                   │   │
│  │  • Upfolio Service (Opportunity Discovery)             │   │
│  │  • Keycloak Admin Service                              │   │
│  │  • Gemini AI Client                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Middleware & Core:                                      │   │
│  │  • Audit Logging Middleware (request tracking)         │   │
│  │  • Authorization Engine (RBAC)                         │   │
│  │  • Database Layer (async SQLAlchemy)                   │   │
│  │  • Dependency Injection                                │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        ▼            ▼            ▼              ▼
    ┌────────┐  ┌─────────┐  ┌───────────┐  ┌──────────┐
    │  PSQL  │  │ Keycloak│  │  Gemini   │  │ External │
    │Database│  │  (IAM)  │  │    API    │  │Platforms │
    └────────┘  └─────────┘  └───────────┘  └──────────┘
```

### Data Flow

1. **User Interaction** → Frontend (Next.js)
2. **API Call** → Backend (FastAPI) with JWT Token
3. **Authorization Check** → RBAC Engine checks `authz.map.json`
4. **Audit Logging** → Request logged automatically
5. **Business Logic** → Service layer processes request
6. **Database Operations** → AsyncIO with SQLAlchemy + PostgreSQL
7. **AI Processing** (if needed) → Gemini API for policies/insights
8. **Response** → JSON response back to frontend

---

## 📁 Project Structure

```
atlas-template-dhruvi/
│
├── 📄 README.md                              # Original template documentation
├── 📄 README_UPFOLIO.md                      # This file
├── 📄 SETUP_GUIDE.txt                        # Setup instructions
├── 📄 Makefile                               # Development commands
├── 📄 docker-compose.yml                     # Multi-container setup
├── 📄 .env.example                           # Environment configuration template
│
├── 📁 backend/                               # FastAPI Backend
│   ├── 📄 requirements.txt                   # Python dependencies
│   ├── 📄 Dockerfile                         # Backend container config
│   ├── 📄 alembic.ini                        # Database migration config
│   │
│   ├── 📁 alembic/                           # Database migrations
│   │   ├── env.py
│   │   ├── script.py.mako
│   │   └── versions/
│   │       ├── 001_initial_schema.py
│   │       ├── 002_user_status_policies.py
│   │       └── 003_create_admin_user.py
│   │
│   ├── 📁 app/
│   │   ├── main.py                           # FastAPI app entry point
│   │   ├── authz.map.json                    # Authorization rules (ROLE → ENDPOINTS)
│   │   ├── public.map.json                   # Public routes
│   │
│   │   ├── 📁 api/                           # API Routes
│   │   │   ├── auth.py                       # Authentication endpoints
│   │   │   ├── users.py                      # User management endpoints
│   │   │   ├── admin.py                      # Admin dashboard endpoints
│   │   │   ├── ai.py                         # AI features endpoints (CORE)
│   │   │   ├── agents.py                     # Agent registry endpoints
│   │   │   └── telemetry.py                  # Usage tracking endpoints
│   │
│   │   ├── 📁 core/                          # Core functionality
│   │   │   ├── config.py                     # Configuration & settings
│   │   │   ├── database.py                   # Database setup & connection
│   │   │   ├── security.py                   # Password hashing, JWT
│   │   │   ├── authz.py                      # Authorization engine
│   │   │   └── dependencies.py               # Dependency injection
│   │
│   │   ├── 📁 models/                        # SQLAlchemy ORM Models
│   │   │   ├── user.py                       # User model
│   │   │   ├── policy.py                     # Policy model
│   │   │   ├── audit.py                      # Audit log model
│   │   │   └── agent.py                      # Agent registry model
│   │
│   │   ├── 📁 schemas/                       # Pydantic request/response schemas
│   │   │   ├── user_schema.py
│   │   │   ├── ai_schema.py                  # AI related schemas
│   │   │   └── agent_schema.py
│   │
│   │   ├── 📁 services/                      # Business logic (CORE)
│   │   │   ├── audit.py                      # Audit service
│   │   │   ├── keycloak.py                   # Keycloak JWT validation
│   │   │   ├── keycloak_admin.py             # Keycloak admin API
│   │   │   │
│   │   │   └── 📁 ai/                        # AI Services (UPFOLIO SPECIFIC)
│   │   │       ├── policy.py                 # Policy translation service
│   │   │       ├── insights.py               # AI insights generation
│   │   │       ├── chat.py                   # AI Manager chatbot logic
│   │   │       ├── gemini.py                 # Gemini API client
│   │   │       ├── upfolio.py                # 🎯 Opportunity discovery service
│   │   │       ├── tools.py                  # AI tools for function calling
│   │   │       └── PLATFORM_REGISTRY         # Multi-platform integration
│   │
│   │   ├── 📁 middleware/                    # HTTP Middleware
│   │   │   └── audit.py                      # Auto-logging middleware
│   │
│   │   └── 📁 modules/                       # Feature modules
│   │       ├── hr_bot/
│   │       └── timetable_ai/
│   │
│   └── 📁 gunicorn/                          # Production server config
│       ├── dev.py
│       └── prod.py
│
├── 📁 frontend/                              # Next.js Frontend
│   ├── 📄 package.json                       # Node dependencies
│   ├── 📄 tsconfig.json                      # TypeScript config
│   ├── 📄 tailwind.config.ts                 # Tailwind CSS config
│   ├── 📄 next.config.js                     # Next.js config
│   ├── 📄 Dockerfile                         # Frontend container config
│   │
│   ├── 📁 public/                            # Static assets
│   │
│   └── 📁 src/
│       ├── 📁 app/                           # Next.js app directory
│       │   ├── layout.tsx                    # Root layout
│       │   ├── globals.css                   # Global styles
│       │   │
│       │   └── 📁 (dashboard)/               # Protected routes
│       │       ├── layout.tsx                # Dashboard layout
│       │       ├── page.tsx                  # Dashboard home
│       │       │
│       │       ├── 📁 admin/
│       │       │   ├── users/page.tsx        # User management
│       │       │   └── audit/page.tsx        # Audit log viewer
│       │       │
│       │       ├── 📁 ai/
│       │       │   ├── policies/page.tsx     # Policy management
│       │       │   └── insights/page.tsx     # Insights dashboard
│       │       │
│       │       ├── 📁 upfolio/               # 🎯 Upfolio page
│       │       │   └── page.tsx              # Opportunity discovery/tracking
│       │       │
│       │       ├── 📁 modules/
│       │       │   └── page.tsx
│       │       │
│       │       └── 📁 settings/
│       │           └── page.tsx
│       │
│       ├── 📁 components/
│       │   ├── 📁 ai/
│       │   │   └── AIManager.tsx             # 🤖 Global chatbot modal
│       │   ├── 📁 layout/
│       │   │   ├── Header.tsx                # Top navigation & AI button
│       │   │   └── Sidebar.tsx               # Left navigation
│       │   ├── 📁 charts/
│       │   │   └── DashboardOverview.tsx
│       │   └── 📁 ui/                        # UI components
│       │
│       └── 📁 lib/
│           ├── api.ts                        # API client utilities
│           ├── store.ts                      # State management
│           └── upfolioTracker.ts             # 🎯 Upfolio tracking logic
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Purpose | Download |
|------|---------|---------|----------|
| **Docker Desktop** | Latest | Containerization | [docker.com](https://docker.com) |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com) |
| **Python** | 3.11+ | Backend runtime | [python.org](https://python.org) |
| **Node.js** | 18+ | Frontend build tool | [nodejs.org](https://nodejs.org) |
| **PostgreSQL** | 15+ | Database (via Docker) | Via Docker |
| **Gemini API Key** | Optional | AI features | [aistudio.google.com](https://aistudio.google.com/apikey) |

**For Windows Users**: Use WSL2 (Windows Subsystem for Linux) or Git Bash for terminal commands.

---

## 🚀 Quick Start Guide

Get Upfolio running locally in 5 minutes!

### Step 1: Clone the Repository

```bash
git clone https://github.com/dhruvi-git/atlas-template-dhruvi.git
cd atlas-template-dhruvi
```

### Step 2: Setup Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Generate secure secrets (on macOS/Linux)
openssl rand -base64 32
# On Windows PowerShell:
# [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char](Get-Random -Minimum 33 -Maximum 126)})) -join '')
```

### Step 3: Edit `.env` File

Open `.env` and add the generated secrets:

```bash
# Required: Set both to the same value (paste from step 2)
SECRET_KEY=<your-generated-secret>
NEXTAUTH_SECRET=<your-generated-secret>

# Optional but Recommended: Enable AI features
GEMINI_API_KEY=<your-gemini-api-key>

# Email domains to auto-approve (comma-separated)
APPROVED_EMAIL_DOMAINS=atlasuniversity.edu.in,example.com

# CORS origins (for frontend)
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Step 4: Start Services

```bash
# Using Docker Compose (Recommended)
docker-compose up -d --build

# Wait for all services to be healthy (30-60 seconds)
docker-compose ps
```

### Step 5: Access the Application

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Register or use demo account |
| **API Docs** | http://localhost:8000/docs | No auth required |
| **Keycloak** | http://localhost:8080 | admin / admin |
| **Create Admin** | Run migrations | See next section |

### Step 6: Create Admin User (First Run)

The database migrations automatically create an admin user:

```
Email: admin@atlasuniversity.edu.in
Password: admin123
```

Or run the migration manually:

```bash
docker-compose exec backend alembic upgrade head
```

---

## ⚙️ Configuration

### Environment Variables Reference

```bash
# ============= API Configuration =============
APP_NAME=Upfolio                              # Application name
APP_ENV=development                           # development, staging, production
DEBUG=False                                   # Enable debug mode
LOG_LEVEL=INFO                                # Logging level

# ============= Database =============
DATABASE_URL=postgresql+asyncpg://atlas:atlas_secret@db:5432/atlas_db

# ============= Security & Auth =============
SECRET_KEY=<your-secret>                      # JWT signing key (generate with openssl)
NEXTAUTH_SECRET=<your-secret>                 # NextAuth JWT secret (same value or different)
ALGORITHM=HS256                               # JWT algorithm
ACCESS_TOKEN_EXPIRE_MINUTES=30                # JWT token expiry

# ============= AI Features =============
GEMINI_API_KEY=<your-gemini-api-key>         # Get from: https://aistudio.google.com/apikey
AI_MODEL=gemini-2.0-flash-exp                 # AI model to use

# ============= User Management =============
APPROVED_EMAIL_DOMAINS=atlasuniversity.edu.in # Comma-separated list

# ============= Keycloak (Optional) =============
KEYCLOAK_SERVER_URL=http://keycloak:8080     # Keycloak server
KEYCLOAK_REALM=atlas                         # Keycloak realm
KEYCLOAK_CLIENT_ID=atlas-backend             # Client ID
KEYCLOAK_CLIENT_SECRET=                      # Client secret

# ============= CORS =============
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# ============= NextAuth Configuration =============
NEXTAUTH_URL=http://localhost:3000            # Frontend URL
NEXTAUTH_URL_INTERNAL=http://frontend:3000   # Internal URL (Docker)
```

### Important Configuration Notes

1. **Secrets**: Always generate new `SECRET_KEY` and `NEXTAUTH_SECRET` for production
2. **Database URL**: Change password in production
3. **GEMINI_API_KEY**: Optional but required for AI features (policies, insights, chat)
4. **Email Domains**: Configure which domains are auto-approved for registration
5. **CORS**: Update with your production domain

---

## 🎯 Usage & Features

### Feature 1: Opportunity Discovery (Upfolio Tracker)

Navigate to **Upfolio** from the sidebar to:

1. **Search** for opportunities across multiple platforms
2. **Enter keywords** (e.g., "Python internship", "hackathon")
3. **Filter by platform** (Unstop, Devfolio, LinkedIn, Internshala, Hack2Skill)
4. **View results** with direct links to source platforms
5. **Save opportunities** to track them

```bash
# Supported platforms:
- Unstop (https://unstop.com)
- Devfolio (https://devfolio.co)
- Hack2Skill (https://hack2skill.com)
- LinkedIn (https://linkedin.com)
- Internshala (https://internshala.com)
```

**Example Searches**:
- "Machine Learning Internship"
- "Web Development Hackathon"
- "Data Science Fellowship"

### Feature 2: Create & Manage Policies

Navigate to **AI → Policies**:

1. **Create Policy**: Click "New Policy"
2. **Enter Natural Language**: E.g., "Allow only verified hackathons"
3. **AI Translates to DSL**: Automatic conversion to executable rules
4. **Set Priority**: Higher priority policies apply first
5. **Monitor Status**: View policy status and metrics

**Example Policies**:
- "Only show internships with salary ≥ ₹500/day"
- "Filter hackathons from selected hosts: Devfolio, Unstop"
- "Recommend opportunities matching my skill tags: Python, Web Dev"

### Feature 3: AI Insights & Recommendations

Navigate to **AI → Insights**:

1. **View AI-Generated Insights**: System analyzes your data
2. **Check Severity Levels**: Critical, Warning, Recommendation
3. **Read Recommendations**: Actionable suggestions with impact
4. **Track Metrics**: See what insights are most relevant

**Example Insights**:
- "You've applied to 5 similar roles; consider diversifying"
- "Upcoming deadline in 2 hours for internship X"
- "Your skills match 8 new hackathons posted today"

### Feature 4: AI Manager Chatbot

Click the **🤖** button in the header:

1. **Ask Questions**: Natural language queries
2. **Get Help**: Search logs, view stats
3. **Function Calling**: Bot can execute backend tools
4. **Context-Aware**: Understands current page
5. **Multi-Turn**: Maintain conversation context

**Example Queries**:
- "How many opportunities have I saved?"
- "Show me critical insights"
- "What was my activity last week?"
- "Search audit logs for policy changes"

### Feature 5: Admin Dashboard

**Access**: `/admin` (ADMIN role only)

#### User Management (`/admin/users`)
- ✅ View all users
- ✅ Approve pending registrations
- ✅ Reject users
- ✅ Delete accounts
- ✅ View user details and creation dates

#### Audit Logs (`/admin/audit`)
- ✅ View all system activity
- ✅ Filter by timestamp, user, action
- ✅ Search in log data
- ✅ **Export as JSON** for analysis
- ✅ Track API calls, custom events

### Feature 6: User Management

#### Self-Registration
1. Go to **Register** page
2. Enter email and password
3. Email must match `APPROVED_EMAIL_DOMAINS` for auto-approval
4. Or wait for admin approval

#### Role-Based Access
- **ADMIN**: Full access to all features
- **DEVELOPER**: Access to API, policies, insights
- **USER**: Access to Upfolio, dashboard, personal settings

---

## 📡 API Documentation

### Interactive API Docs

**Swagger UI**: http://localhost:8000/docs  
**ReDoc**: http://localhost:8000/redoc

### Core API Endpoints

#### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login (returns JWT token)
POST   /api/auth/refresh        - Refresh JWT token
POST   /api/auth/logout         - Logout
GET    /api/users/me            - Get current user info
```

#### User Management (Admin)
```
GET    /api/admin/users         - List all users
GET    /api/admin/users/pending - List pending registrations
POST   /api/admin/users/{id}/approve        - Approve user
POST   /api/admin/users/{id}/reject         - Reject user
DELETE /api/admin/users/{id}    - Delete user
```

#### AI Policies (Core Feature)
```
GET    /api/ai/policies         - List all policies
POST   /api/ai/policies         - Create new policy
PUT    /api/ai/policies/{id}    - Update policy
DELETE /api/ai/policies/{id}    - Delete policy
POST   /api/ai/policies/translate           - Translate NLP to DSL
```

#### AI Insights
```
GET    /api/ai/insights         - Get AI insights
POST   /api/ai/insights/generate            - Generate new insights
```

#### AI Chat (Manager)
```
POST   /api/ai/chat             - Send message to AI
```

#### Upfolio Discovery (Core Feature)
```
GET    /api/ai/upfolio/search   - Search opportunities
POST   /api/ai/upfolio/match    - Match opportunities by profile
```

#### Audit Logs
```
GET    /api/admin/audit         - View audit logs
POST   /api/admin/audit/custom  - Log custom event
GET    /api/admin/audit/export  - Export logs as JSON
```

#### Agents & Telemetry
```
GET    /api/agents              - List registered agents
POST   /api/agents              - Register new agent
POST   /api/telemetry           - Log telemetry data
```

### Request/Response Examples

#### Create Policy
```bash
curl -X POST http://localhost:8000/api/ai/policies \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Verified Only",
    "description": "Only show verified opportunities",
    "policy_type": "FILTER",
    "natural_language": "Show only internships from verified companies",
    "dsl": "company.verified == true AND opportunity.type == \"internship\""
  }'
```

#### Search Opportunities
```bash
curl -X GET "http://localhost:8000/api/ai/upfolio/search?query=Python+internship" \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Send Chat Message
```bash
curl -X POST http://localhost:8000/api/ai/chat \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "How many opportunities have I saved?"}
    ]
  }'
```

---

## 🚢 Deployment

### Docker Compose (Local Development)

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

### Production Deployment

#### Option 1: Google Cloud Run + Cloud SQL

```bash
# Setup Cloud SQL
gcloud sql instances create atlas-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro

# Deploy backend
gcloud run deploy atlas-backend \
  --source . \
  --runtime python311 \
  --set-env-vars DATABASE_URL=<cloud-sql-url>

# Deploy frontend
gcloud run deploy atlas-frontend \
  --source ./frontend \
  --runtime nodejs18
```

#### Option 2: Kubernetes

```bash
# Build images
docker build -t atlas-backend:latest backend/
docker build -t atlas-frontend:latest frontend/

# Push to registry
docker push your-registry/atlas-backend:latest
docker push your-registry/atlas-frontend:latest

# Deploy with Kubernetes manifests
kubectl apply -f k8s/deployment.yaml
```

#### Environment Checklist for Production

- ✅ Generate new `SECRET_KEY` and `NEXTAUTH_SECRET`
- ✅ Change database password
- ✅ Set `APP_ENV=production`
- ✅ Update `CORS_ORIGINS` with production domain
- ✅ Configure `GEMINI_API_KEY`
- ✅ Enable HTTPS (use reverse proxy like Nginx)
- ✅ Setup database backups
- ✅ Configure error logging
- ✅ Enable rate limiting
- ✅ Review security headers

---

## 👨‍💻 Development

### Local Development Setup

```bash
# Install backend dependencies
cd backend
pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

### Running Locally (Without Docker)

#### Terminal 1: Backend
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

#### Terminal 3: Database
```bash
# Start PostgreSQL in Docker
docker run -d \
  --name atlas-db \
  -e POSTGRES_USER=atlas \
  -e POSTGRES_PASSWORD=atlas_secret \
  -e POSTGRES_DB=atlas_db \
  -p 5432:5432 \
  postgres:15
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# View migration history
alembic history

# Rollback last migration
alembic downgrade -1
```

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run tests
pytest backend/tests/ -v

# With coverage
pytest --cov=app backend/tests/
```

### Code Formatting & Linting

```bash
# Backend
black backend/
flake8 backend/
pylint backend/

# Frontend
npm run lint
npm run format
```

### Useful Make Commands

```bash
# View available commands
make help

# Start services
make up

# Stop services
make down

# View logs
make logs

# Run database migrations
make migrate

# Create seed data
make seed
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Workflow

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/your-feature`
3. **Make** changes and test locally
4. **Commit**: `git commit -m "Add your feature"`
5. **Push**: `git push origin feature/your-feature`
6. **Submit** Pull Request

### Code Standards

- **Python**: Follow [PEP 8](https://pep8.org/) style guide
- **Frontend**: Use Prettier for formatting
- **Commit Messages**: Be descriptive, use imperative mood
- **Documentation**: Update README for new features

### Areas for Contribution

- [ ] Additional opportunity platforms (Angel List, Product Hunt, etc.)
- [ ] Enhanced policy engine (more complex DSL rules)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with Google Calendar
- [ ] Email reminders for deadlines
- [ ] Social features (share opportunities, follow users)
- [ ] Automated application suggestions

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Support & Contact

### Documentation
- **API Docs**: http://localhost:8000/docs
- **Setup Guide**: See `SETUP_GUIDE.txt`
- **Original Template**: See `README.md`

### Issue Reporting
Found a bug? Please [open an issue](https://github.com/dhruvi-git/atlas-template-dhruvi/issues) with:
- Clear description
- Steps to reproduce
- Expected vs. actual behavior
- Environment details

### Questions?
Join our community or reach out through GitHub Discussions.

---

## 🎉 Acknowledgments

This project is built on the **Atlas AI Command Center** framework, an enterprise-grade template for AI-first applications.

**Special Thanks To**:
- FastAPI & Starlette teams
- Next.js & Vercel
- Google Gemini AI
- Open-source contributors

---

## 📊 Project Status

- ✅ Authentication & Authorization
- ✅ User Management
- ✅ Audit Logging
- ✅ AI Policies Engine
- ✅ AI Insights Generation
- ✅ AI Manager Chatbot
- ✅ Opportunity Discovery (Upfolio)
- 🔄 Mobile App (In Progress)
- 🔄 Advanced Analytics (Planned)
- 🔄 Email Notifications (Planned)

---

**Built with ❤️ by the Upfolio Team**  
**Last Updated**: March 2026
