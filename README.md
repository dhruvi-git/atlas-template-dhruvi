# 🎯 Upfolio - AI-Powered Opportunity Discovery & Management

An intelligent agentic platform that uses AI to help you discover, filter, and manage professional opportunities across multiple platforms. Upfolio combines smart search, natural language policies, and AI-powered insights to be your personal opportunity management assistant.

**GitHub Repository**: [github.com/dhruvi-git/atlas-template-dhruvi](https://github.com/dhruvi-git/atlas-template-dhruvi)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Usage](#usage)
- [Full Documentation](#full-documentation)

---

## 🌟 Overview

Upfolio is an **agentic AI system** that revolutionizes how you discover professional opportunities. Instead of manually searching multiple platforms, Upfolio:

1. **Searches automatically** across Unstop, Devfolio, LinkedIn, Internshala, and Hack2Skill
2. **Filters intelligently** using AI policies (write rules in plain English!)
3. **Recommends proactively** based on your profile and interests
4. **Tracks everything** with a complete audit trail
5. **Assists conversationally** via an AI chatbot available everywhere

Perfect for students and professionals looking for internships, hackathons, scholarships, fellowships, and other career opportunities.

---

## ✨ Key Features

### 🔍 **Intelligent Opportunity Discovery**
- **Multi-Platform Search**: Search across 5+ platforms simultaneously
- **Smart Matching**: AI understands your intent (e.g., "Python internship in tech companies")
- **One-Click Links**: Direct access to opportunities on original platforms
- **Curated Searches**: Pre-built templates for popular opportunities

### 📋 **AI Policies - The Game Changer**
Create natural language rules that automatically filter opportunities:
- Write rules in plain English: *"Only show hackathons from verified hosts"*
- AI automatically translates to executable logic
- Apply multiple policies with priority levels
- Update policies on the fly without code changes

**Examples**:
- "Show internships with salary ≥ ₹500/day"
- "Filter hackathons only from Devfolio and Unstop"
- "Recommend only roles matching Python and Web Development skills"

### 🤖 **AI Manager Chatbot**
- **Global Assistant**: Available on every page via 🤖 button
- **Context-Aware**: Understands what you're doing
- **Function Calling**: Execute commands like searching logs, fetching statistics
- **Natural Conversation**: Ask questions naturally, get answers instantly

**Ask It**: 
- "How many opportunities have I saved?"
- "Show me critical insights"
- "What was my activity last week?"

### 💡 **AI Insights & Recommendations**
- **Smart Analysis**: AI analyzes your data and behavior
- **Actionable Recommendations**: Severity levels (Critical, Warning, Suggestion)
- **Impact Estimates**: Understand potential impact of each insight
- **Proactive Suggestions**: Get recommendations before you ask

### 📊 **Complete Audit & Analytics**
- **Automatic Logging**: Every action is logged with full metadata
- **Search & Export**: Filter logs and export as JSON
- **Compliance Ready**: Track all activities for transparency
- **Custom Events**: Log business events (policy created, opportunity saved, etc.)

### 📱 **Admin Dashboard**
- **User Management**: Approve/reject user registrations
- **Audit Viewer**: Search and export activity logs
- **Dashboard Analytics**: View system statistics and metrics

---

## 🧠 How It Works

```
User Input (Search Query)
     ↓
AI Agent Analysis (Understand intent)
     ↓
Search Across Platforms (Unstop, Devfolio, LinkedIn, etc.)
     ↓
Apply Policies (Filter using AI-generated rules)
     ↓
Rank & Recommend (Sort by relevance)
     ↓
Display Results + Insights
```

### Example Flow:
```
User: "Find me Python hackathons happening next month"
      ↓
Upfolio AI: Understands intent, searches 5 platforms simultaneously
      ↓
Applies Policies: Only show verified hackathons, exclude past dates
      ↓
Generates Insights: "3 new hackathons match your skills"
      ↓
Shows Results: Direct links to opportunities with AI-generated summaries
```

---

## 💻 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Python 3.11 + FastAPI |
| **Frontend** | Next.js 14 + React 18 + TypeScript |
| **AI Engine** | Google Gemini 2.0-flash |
| **Database** | PostgreSQL 15 |
| **Auth** | NextAuth.js + JWT |
| **Styling** | Tailwind CSS |
| **Deployment** | Docker + Docker Compose |

---

## 🚀 Quick Start

Get Upfolio running locally in 5 minutes.

### Prerequisites

- **Docker Desktop** - [Download](https://docker.com)
- **Git** - [Download](https://git-scm.com)
- **Gemini API Key** (optional) - [Get Free Key](https://aistudio.google.com/apikey)

### Step 1: Clone Repository

```bash
git clone https://github.com/dhruvi-git/atlas-template-dhruvi.git
cd atlas-template-dhruvi
```

### Step 2: Setup Environment

```bash
# Copy environment template
cp .env.example .env

# Generate secrets (macOS/Linux)
openssl rand -base64 32

# On Windows PowerShell, use this value for both:
# (or any 32+ character random string)
```

### Step 3: Configure Secrets

Edit `.env` and set:

```bash
# Required: Paste the generated secret
SECRET_KEY=<your-generated-secret>
NEXTAUTH_SECRET=<your-generated-secret>

# Optional but recommended: Enable AI features
GEMINI_API_KEY=<your-api-key>

# Email domains to auto-approve
APPROVED_EMAIL_DOMAINS=example.com,yourschool.edu
```

### Step 4: Start Services

```bash
docker-compose up -d --build
```

Wait 30-60 seconds for services to start.

### Step 5: Access Application

| Service | URL |
|---------|-----|
| **Upfolio Frontend** | http://localhost:3000 |
| **API Documentation** | http://localhost:8000/docs |
| **Database Admin** | (via Docker) |

### Step 6: Default Login

```
Email: admin@atlasuniversity.edu.in
Password: admin123
```

---

## ⚙️ Configuration

### Essential Environment Variables

```bash
# API Configuration
APP_NAME=Upfolio
APP_ENV=development
DEBUG=False

# Database
DATABASE_URL=postgresql+asyncpg://atlas:atlas_secret@db:5432/atlas_db

# Security
SECRET_KEY=<generate-with-openssl>
NEXTAUTH_SECRET=<same-or-different>
ALGORITHM=HS256

# AI Features
GEMINI_API_KEY=<your-api-key>         # Required for policies, insights, chat
AI_MODEL=gemini-2.0-flash-exp

# Authentication
CORS_ORIGINS=http://localhost:3000
APPROVED_EMAIL_DOMAINS=example.com

# Frontend
NEXTAUTH_URL=http://localhost:3000
```

### Production Checklist

- ✅ Generate new `SECRET_KEY` and `NEXTAUTH_SECRET`
- ✅ Change database password
- ✅ Set `APP_ENV=production`
- ✅ Update `CORS_ORIGINS` with production domain
- ✅ Configure `GEMINI_API_KEY`
- ✅ Enable HTTPS
- ✅ Setup database backups

---

## 📖 Usage

### 1. Search for Opportunities

1. Navigate to **Upfolio** from sidebar
2. Enter search query: "Python internship", "hackathon", etc.
3. Select platforms to search
4. View results with direct links

### 2. Create Policies

1. Go to **AI → Policies**
2. Click "New Policy"
3. Write in plain English: *"Only show verified opportunities"*
4. AI translates to executable rules
5. Set priority and activate

### 3. Get AI Insights

1. Navigate to **AI → Insights**
2. View AI-generated recommendations
3. Check severity levels (Critical, Warning, Suggestion)
4. See impact estimates

### 4. Chat with AI Assistant

1. Click **🤖** button (top right)
2. Ask questions naturally
3. Get context-aware answers
4. AI can search logs, fetch stats, etc.

### 5. Admin Features

**User Management** (`/admin/users`):
- Approve/reject pending users
- View user details
- Delete accounts

**Audit Logs** (`/admin/audit`):
- View all system activity
- Filter by timestamp, user, action
- Export logs as JSON

---

## 📚 Full Documentation

For comprehensive documentation including:
- Complete API reference
- System architecture
- Deployment guides (Cloud Run, Kubernetes)
- Development setup
- Database migrations
- Contributing guidelines

See [README_UPFOLIO.md](README_UPFOLIO.md) ⭐

---

## 🔌 API Endpoints

### Opportunity Discovery
```
GET  /api/ai/upfolio/search      - Search opportunities
POST /api/ai/upfolio/match       - Match by profile
```

### AI Policies
```
GET  /api/ai/policies            - List policies
POST /api/ai/policies            - Create policy
PUT  /api/ai/policies/{id}       - Update policy
POST /api/ai/policies/translate  - Convert NLP to DSL
```

### AI Chat & Insights
```
POST /api/ai/chat                - Chat with AI
GET  /api/ai/insights            - Get insights
POST /api/ai/insights/generate   - Generate new insights
```

### Admin
```
GET  /api/admin/users            - List users
POST /api/admin/users/{id}/approve - Approve registration
GET  /api/admin/audit            - View audit logs
```

See [API Docs](http://localhost:8000/docs) for full details.

---

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d --build

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Remove all data
docker-compose down -v
```

---

## 🛠️ Development

### Local Setup (Without Docker)

```bash
# Backend
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

### Useful Commands

```bash
# Format code
cd backend && black .
cd frontend && npm run format

# Run linter
cd backend && flake8 .
cd frontend && npm run lint

# Run tests
cd backend && pytest
cd frontend && npm test
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/your-feature`
3. **Make** changes and test locally
4. **Commit**: `git commit -m "Add your feature"`
5. **Push**: `git push origin feature/your-feature`
6. **Submit** Pull Request

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 🎯 Roadmap

- ✅ Core opportunity discovery
- ✅ AI policy engine
- ✅ AI insights & recommendations
- ✅ AI chatbot (function calling)
- ✅ Audit & compliance logging
- 🔄 Mobile app (React Native)
- 🔄 Email reminders & notifications
- 🔄 Advanced analytics dashboard
- 🔄 Integration marketplace

---

## 📞 Support

**Documentation**: [README_UPFOLIO.md](README_UPFOLIO.md)  
**API Docs**: http://localhost:8000/docs  
**Issue Tracker**: [GitHub Issues](https://github.com/dhruvi-git/atlas-template-dhruvi/issues)

---

Built with ❤️ | [Live on GitHub](https://github.com/dhruvi-git/atlas-template-dhruvi)
