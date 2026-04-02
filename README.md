# LiveMeet

A full-stack real-time meeting analyzer that uses an LLM to extract 
structured insights from meeting transcripts and broadcasts them live 
to the frontend in under 1 second.

## Screenshots

### Frontend Dashboard
<img width="927" height="481" alt="image" src="https://github.com/user-attachments/assets/2097c4ad-e6d3-4687-8c09-549ac483b220" />


### Backend Architecture
<img width="962" height="556" alt="image" src="https://github.com/user-attachments/assets/0bc49024-e399-4531-936e-1a1e5d169b7c" />


## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Real-time | WebSockets (ws library) |
| AI | Groq LLM API (llama-3.3-70b-versatile) |

## Features
- Submit transcript chunks via REST API (`POST /api/transcript`)
- Extracts 4 structured insight types: **summary, action items, decisions, topic**
- Broadcasts AI insights to all connected clients via WebSocket in **under 1 second**
- Decoupled AI service layer enabling independent scaling
- Persistent storage of meetings, transcripts, and insights in PostgreSQL

## Architecture
```
LiveMeet/
├── backend/
│   └── src/
│       ├── database/     # PostgreSQL connection (db.ts)
│       ├── routes/       # REST endpoints (meetings.ts)
│       └── services/     # Groq AI service (ai.ts)
└── frontend/
    └── app/              # Next.js pages and components
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Groq API key (free at console.groq.com)

### Setup
```bash
# Clone the repo
git clone https://github.com/MM871/LiveMeet.git
cd LiveMeet

# Backend
cd backend
npm install
cp .env.example .env        # fill in your credentials
npm run dev                 # runs on port 4000

# Frontend (new terminal)
cd frontend
npm install
npm run dev                 # runs on localhost:3000
```

## How It Works
1. User submits a transcript chunk via the frontend
2. Backend receives it via `POST /api/transcript` and stores it in PostgreSQL
3. The AI service sends it to Groq LLM which returns structured insights
4. Insights are broadcast to all connected WebSocket clients in real time
5. Frontend dashboard updates instantly with summary, action items, and decisions
