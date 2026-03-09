# VibeShop Advisor 🛒✨

AI-powered tech product recommendation system that helps users find the perfect smartphone, laptop, or gaming gear based on their budget and usage needs. Features a ChatGPT-style AI assistant for follow-up questions.

![VibeShop Advisor](https://img.shields.io/badge/VibeShop-Advisor-8b5cf6?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🤖 AI-Powered Recommendations
- **Smart Product Scoring** - Products scored based on budget fit (30%), usage match (30%), performance (20%), battery (10%), and weight (10%)
- **GPT-4 Integration** - AI-generated explanations with pros/cons for each product
- **Budget Guardrails** - Products exceeding budget by more than 15% are excluded

### 💬 AI Chat Assistant
- **ChatGPT-Style Interface** - Floating chat panel for asking questions about recommendations
- **Context-Aware Responses** - AI answers based on your specific recommendations
- **Suggested Questions** - Quick-access buttons for common queries
- **Product-Specific Chat** - Ask detailed questions about individual products

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Floating pill navbar with backdrop blur
- **Animated Backgrounds** - Gradient animations and floating icons
- **Step-by-Step Form** - 4-step wizard with progress indicator
- **Smooth Animations** - Framer Motion powered transitions

### 📊 Analytics Dashboard
- Recommendation requests over time
- Product category popularity
- Usage type distribution
- Budget range analysis

### 🛠 Admin Features
- **Human-in-the-Loop** - Admin mode for editing AI recommendations
- **Feedback Tracking** - Record user selections and rejections
- **History Management** - View past recommendations with filters

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Set up the database
bun run db:push

# Seed product data
bun run prisma/seed.ts

# Start development server
bun run dev
```

## 📁 Project Structure

```
vibeshop-advisor/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── seed.ts            # Product seeding script
│   └── seeds/
│       └── products.ts    # 36 product dataset
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── submit/    # Recommendation API
│   │   │   ├── history/   # History API
│   │   │   ├── feedback/  # Feedback API
│   │   │   └── products/  # Products API
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx       # Main application
│   ├── components/
│   │   ├── ui/            # ShadCN UI components
│   │   └── vibeshop/
│   │       ├── GlassNavbar.tsx
│   │       ├── HomePage.tsx
│   │       ├── RecommendationForm.tsx
│   │       ├── LoadingExperience.tsx
│   │       ├── ResultsPage.tsx
│   │       ├── ProductCard.tsx
│   │       ├── ChatPanel.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── HistoryPage.tsx
│   │       └── DashboardPage.tsx
│   └── lib/
│       ├── ai.ts          # OpenAI integration
│       ├── scoring.ts     # Product scoring system
│       ├── store.ts       # Zustand state management
│       ├── db.ts          # Prisma client
│       └── utils.ts       # Utility functions
├── .env.local.example     # Environment template
└── README.md
```

## 🗄️ Database Schema

### Product
| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| name | String | Product name |
| brand | String | Brand name |
| category | String | smartphone, laptop, gaming |
| price | Float | Product price |
| specs | JSON | Specifications |
| battery | Int | Battery life (hours) |
| performanceLevel | Int | 1-10 scale |
| weight | Float | Weight in kg |

### Request
| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| productType | String | Requested category |
| budget | Float | User's budget |
| usage | String | gaming, work, general |
| preferences | JSON | Optional preferences |

### Recommendation
| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| requestId | String | Link to request |
| productName | String | Recommended product |
| price | Float | Product price |
| specs | JSON | Specifications |
| reason | String | AI explanation |
| pros | JSON | Array of advantages |
| cons | JSON | Array of disadvantages |
| badge | String | best_performance, best_budget, balanced_choice |
| score | Float | Computed match score |

## 🔌 API Endpoints

### POST /api/submit
Submit a recommendation request.

**Request:**
```json
{
  "productType": "smartphone",
  "budget": 800,
  "usage": "work",
  "preferences": {
    "batteryImportant": true,
    "lightweight": true,
    "highPerformance": false,
    "preferredBrand": "Apple"
  }
}
```

**Response:**
```json
{
  "requestId": "abc123",
  "recommendations": [
    {
      "id": "rec1",
      "productName": "iPhone 15",
      "brand": "Apple",
      "price": 799,
      "reason": "Perfect for work with excellent productivity apps...",
      "pros": ["Great battery", "Premium build", "iOS ecosystem"],
      "cons": ["No expandable storage", "Lightning port only"],
      "badge": "balanced_choice",
      "score": 85.5
    }
  ],
  "disclaimer": "AI recommendations are based on..."
}
```

### GET /api/history
Get recommendation history.

**Query Parameters:**
- `limit` - Results per page (default: 20)
- `offset` - Pagination offset
- `productType` - Filter by category
- `usage` - Filter by usage type

### POST /api/feedback
Submit user feedback.

**Request:**
```json
{
  "recommendationId": "rec1",
  "feedbackType": "selected"
}
```

## 🎯 Product Scoring

### Weights
| Factor | Weight | Description |
|--------|--------|-------------|
| Budget Fit | 30% | How well price matches budget |
| Usage Match | 30% | Suitability for stated usage |
| Performance | 20% | Performance level rating |
| Battery | 10% | Battery life score |
| Weight | 10% | Portability score |

### Usage Profiles
| Usage | Performance Priority | Battery Priority | Weight Priority |
|-------|---------------------|------------------|-----------------|
| Gaming | 100% | 30% | 20% |
| Work/Study | 60% | 80% | 70% |
| General | 50% | 60% | 50% |

### Badges
- **Best Performance** 🚀 - Highest performance among recommendations
- **Best Budget** 💰 - Best value for money
- **Balanced Choice** ⚖️ - Well-rounded option

## 📱 Product Dataset

36 products across 3 categories:

### Smartphones (12)
iPhone 15 Pro Max, iPhone 15, Samsung Galaxy S24 Ultra, S24, A54, Google Pixel 8 Pro, 7a, OnePlus 12, Nord N30, Xiaomi 14 Ultra, Redmi Note 13 Pro, Sony Xperia 1 V

### Laptops (12)
MacBook Pro 16" M3 Max, MacBook Air 15" M3, MacBook Air 13" M2, Dell XPS 15, XPS 13 Plus, ASUS ROG Zephyrus G16, ZenBook 14, Lenovo ThinkPad X1 Carbon, Legion Pro 7i, HP Spectre x360, Razer Blade 15, Microsoft Surface Laptop 5

### Gaming Gear (12)
PlayStation 5, Xbox Series X, Nintendo Switch OLED, Steam Deck OLED, ASUS ROG Ally, Logitech G Pro X Superlight 2, G915 TKL, Razer DeathAdder V3 Pro, BlackWidow V4 Pro, SteelSeries Arctis Nova Pro, Xbox Elite Controller, PlayStation DualSense Edge

## 🤖 AI Features

### Product Recommendation AI
Generates personalized explanations for each product:
- Why it fits your needs
- Specific advantages (3 pros)
- Honest limitations (2 cons)

### Chat Assistant
Answer questions like:
- "Which one is best for gaming?"
- "Compare options 1 and 2"
- "Which has the best battery?"
- "Is this good for video editing?"

### Suggested Questions
Quick-access buttons for common queries that auto-submit to AI.

## 🔧 Environment Variables

```env
# Required - OpenAI API Key (handled by z-ai-web-dev-sdk)
# The SDK handles API keys internally

# Database
DATABASE_URL="file:./db/custom.db"

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=VibeShop Advisor
```

## ⚠️ Important Notices

- AI recommendations are based on general product information
- Always verify specifications and prices before purchase
- Products exceeding budget by more than 15% are automatically excluded
- Demo flow completes in under 3 minutes

## 📝 License

MIT License - Feel free to use for learning and development.

---

Built with ❤️ using Next.js, Tailwind CSS, and OpenAI

## Run Instructions (Short)

1. Clone the repository  
2. Install dependencies with `bun install` or `npm install`  
3. Set up environment variables in `.env.local`  
4. Initialize the database with `bun run db:push`  
5. Seed product data with `bun run prisma/seed.ts`  
6. Start the development server with `bun run dev`  
7. Open http://localhost:3000 in your browser  

## Team Contribution Log

- **Peerapat Thinsorn** – Project setup, backend API development, database architecture  
- **Montri Pimpa** – Frontend UI development, component design, page layout  
- **Arthit Thongpaibun** – System testing and analytics dashboard implementation  
- **Yossawat Siriwattananon** – Feedback system implementation and data testing  
- **Pongpawee Pongngam** – UI improvements, frontend components, and README documentation  