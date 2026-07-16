# 🚨 Sanket — Real-Time Incident Intelligence Platform

> **Sanket** (Sanskrit: *signal / indication*) is an AI-powered emergency incident monitoring dashboard that ingests live social media data from Bluesky, classifies incidents using LLMs, and presents them on a real-time command-center map.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🐦 **Bluesky Social Ingest** | Continuously polls the Bluesky AT Protocol for emergency keywords every 5 seconds |
| 🤖 **AI Classification** | Uses Google Genkit + Groq (Llama 3.1) to classify incident type, severity, and confidence |
| 🗺️ **Live Map Dashboard** | Interactive Leaflet map with color-coded incident markers by severity |
| 🔥 **Firebase Firestore** | Real-time cloud database for incident storage and deduplication |
| 🔐 **Firebase Auth** | Role-based access control (Admin / Authority / Read-Only) |
| 📊 **Incident Cards** | Detailed cards with AI summaries, source posts, and validation metrics |
| 🔄 **Deduplication** | Smart deduplication using post URIs to avoid repeated alerts |
| 📍 **Geoparsing** | Extracts and geocodes location references from post text |

---

## 🏗️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router) + React 19
- **Styling**: Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **AI/ML**: [Google Genkit](https://firebase.google.com/docs/genkit) + Groq (Llama 3.1-8B)
- **Social API**: [Bluesky AT Protocol](https://atproto.com/) (`@atproto/api`)
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Auth**: Firebase Authentication
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Backend Server**: Express.js + tsx (for the background poller)
- **Language**: TypeScript

---

## 📁 Project Structure

```
sanket/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   │   └── login/        # Login page
│   ├── ai/               # Genkit AI flows and config
│   ├── components/       # React UI components
│   ├── config/           # Incident keyword config
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Shared utilities and types
│   └── services/
│       ├── bluesky-poller.ts   # Background Bluesky polling service
│       └── incident-service.ts # Incident processing logic
├── docs/
│   └── blueprint.md      # Original project blueprint
├── scripts/              # Debug and utility scripts
├── firebase-admin.ts     # Firebase Admin SDK init
├── index.ts              # Express server entry point
├── next.config.ts        # Next.js configuration
├── apphosting.yaml       # Firebase App Hosting config
└── .env.example          # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A [Firebase](https://console.firebase.google.com/) project with Firestore and Authentication enabled
- A [Bluesky](https://bsky.app/) account and App Password
- A [Groq](https://console.groq.com/) API key (free tier available)

### 1. Clone the repository

```bash
git clone https://github.com/kanav232/Sanket.git
cd Sanket
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Then fill in your `.env`:

```env
# Firebase Service Account
GOOGLE_APPLICATION_CREDENTIALS="./service-account.json"

# Bluesky credentials
BLUESKY_IDENTIFIER=your-handle.bsky.social
BLUESKY_PASSWORD=your-app-password

# Groq / AI
GROQ_API_KEY=your-groq-api-key

# Google Gemini (optional, for multi-key rotation)
GOOGLE_GENAI_API_KEY=your-google-ai-key

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
GOOGLE_MAPS_API_KEY=your-google-maps-key
```

### 4. Add Firebase service account

Download your Firebase service account JSON from the Firebase Console → Project Settings → Service Accounts, and save it as `service-account.json` in the project root.

> ⚠️ **Never commit `service-account.json` or `.env` to version control.** Both are already in `.gitignore`.

### 5. Run the development server

```bash
# Start the Next.js frontend
npm run dev

# In a separate terminal, start the background polling server
npm run server
```

Open [http://localhost:9002](http://localhost:9002) to see the dashboard.

---

## 🧠 How It Works

```
Bluesky API
    │
    ▼  (every 5s, keyword-batched)
BlueskyPoller
    │  filters by keyword match threshold
    ▼
IncidentService
    │  deduplicates by post URI
    │  classifies via Genkit + Groq LLM
    │  geoparses location
    ▼
Firestore (incidents collection)
    │
    ▼
Next.js Dashboard (Server Component reads Firestore)
    │
    ▼
DashboardClient → Leaflet Map + Incident Cards
```

---

## 🌍 Deployment

This project is configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting):

```bash
# Build the production bundle
npm run build

# Deploy (requires Firebase CLI)
firebase deploy
```

See [`apphosting.yaml`](./apphosting.yaml) for hosting configuration.

---

## 🔧 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js dev server on port 9002 |
| `npm run server` | Start the Express background poller |
| `npm run build` | Production build |
| `npm run genkit:dev` | Start Genkit developer UI |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint |

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgements

- [Bluesky / ATProto](https://atproto.com/) for the open social protocol
- [Google Genkit](https://firebase.google.com/docs/genkit) for the AI orchestration layer
- [Groq](https://groq.com/) for ultra-fast LLM inference
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
