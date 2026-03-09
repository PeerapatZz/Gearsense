# GearSense AI 🛒✨

AI-powered tech product recommendation system that helps users find the perfect smartphone, laptop, or gaming gear based on their budget and usage needs. Features a chat-style AI assistant for follow-up questions powered by Google Gemini and Groq.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

## ✨ Features

### 🤖 AI-Powered Recommendations
- **Smart Product Scoring** - Products scored based on budget fit, usage match, performance, battery, and weight
- **Gemini / Groq Integration** - AI-generated explanations with pros/cons for each product
- **Budget Guardrails** - Products exceeding budget by more than 15% are excluded

### 💬 AI Chat Assistant
- **Floating Chat Panel** - Ask follow-up questions about recommendations seamlessly
- **Context-Aware Responses** - AI answers based on your specific recommendations
- **Suggested Questions** - Quick-access buttons for common queries

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Floating pill navbar with backdrop blur
- **Animated Backgrounds** - Gradient animations and floating icons
- **Step-by-Step Form** - Wizard style form to get your product requirements

## � Quick Start / How to Run

Follow these instructions to run the project locally.

### 1. Prerequisites
- **Node.js**: `v18` or higher
- **npm**, **yarn**, **pnpm**, or **bun** installed

### 2. Clone and Install Dependencies

```bash
# Using bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of the project by copying the example, or add the following keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Providers
GOOGLE_AI_API_KEY=your_google_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup (Prisma)

Push the database schema and generate the client.

```bash
# Push database changes
bun run db:push
# OR
npm run db:push

# Generate Prisma Client
bun run db:generate
# OR
npm run db:generate
```

### 5. Start the Development Server

```bash
bun run dev
# OR
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
gearsense/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/               # Next.js App Router (pages and API routes)
│   ├── components/        # React components (UI and custom)
│   └── lib/               # Utility functions, DB setup, AI clients
├── .env.local             # Environment credentials
├── package.json
└── README.md
```

## ⚠️ Important Notices

- AI recommendations are based on general product information
- Always verify specifications and prices before purchase
- Products exceeding budget by more than 15% are automatically excluded

## 📝 License

MIT License - Feel free to use for learning and development.

## Run Instructions (Short)

1. Clone the repository  
2. Install dependencies with `bun install` or `npm install`  
3. Set up environment variables in `.env.local`  
4. Initialize the database with `bun run db:push`  
5. Seed product data with `bun run prisma/seed.ts`  
6. Start the development server with `bun run dev`  
7. Open http://localhost:3000 in your browser  

## Team Contribution Log

- **Peerapat Thinsorn** – Project lead, backend API development, database schema design, AI recommendation integration  
- **Montri Pimpa** – Frontend UI/UX development, page layout, recommendation result interface  
- **Arthit Thongpaibun** – Analytics dashboard implementation, KPI tracking, system testing  
- **Yossawat Siriwattananon** – Feedback system, history management, data validation and testing  
- **Pongpawee Pongngam** – Frontend components, UI improvements, documentation and README preparation  