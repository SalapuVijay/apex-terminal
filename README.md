# APEX Terminal - Autonomous Multi-Agent Investment Intelligence Terminal

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Live-brightgreen?style=for-the-badge&logo=vercel)](https://apex-terminal-ten.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/SalapuVijay/apex-terminal.git)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.2-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![LangGraph.js](https://img.shields.io/badge/LangGraph.js-0.0.40-orange?style=for-the-badge)](https://github.com/langchain-ai/langgraphjs)

APEX Terminal is an institutional-grade, multi-agent financial research workstation designed to evaluate equities and generate investment briefs. Running on parallel **LangGraph.js** decision pipelines, the terminal simulates an AI Hedge Fund Committee debate to evaluate equities, stream real-time logs, chart technical balance sheets, and export PDF research memos.

---

## 🌐 Live Production Links

* **Live Workstation URL**: [https://apex-terminal-ten.vercel.app](https://apex-terminal-ten.vercel.app)
* **GitHub Repository**: [https://github.com/SalapuVijay/apex-terminal.git](https://github.com/SalapuVijay/apex-terminal.git)

---

## ⚡ System Architecture

```mermaid
graph TD
    Client[Next.js 15 Client UI] <-->|Server-Sent Events & HTTPS| API[Next.js API Engine]
    
    subgraph Multi-Agent Swarm (LangGraph)
        API -->|Invoke Flow| Graph[LangGraph Dispatcher]
        
        Graph -->|Step 1| CompRes[Company Research Agent]
        CompRes -->|Step 2| FinRes[Financial Statement Agent]
        FinRes -->|Step 3| SentRes[Market Sentiment Agent]
        SentRes -->|Step 4| RiskRes[Risk Officer Agent]
        
        RiskRes -->|Step 5: Swarm Persona Evaluations| BuffetAgent[Warren Buffett Agent]
        RiskRes -->|Step 5: Swarm Persona Evaluations| LynchAgent[Peter Lynch Agent]
        RiskRes -->|Step 5: Swarm Persona Evaluations| DalioAgent[Ray Dalio Agent]
        RiskRes -->|Step 5: Swarm Persona Evaluations| WoodAgent[Cathie Wood Agent]
        RiskRes -->|Step 5: Swarm Persona Evaluations| RiskManager[Risk Manager Agent]
        
        BuffetAgent -->|Step 6: Debate| DebateNode[Debate Committee Arena]
        LynchAgent --> DebateNode
        DalioAgent --> DebateNode
        WoodAgent --> DebateNode
        RiskManager --> DebateNode
        
        DebateNode -->|Step 7: Consensus| DecisionEngine[Decision Scoring Engine]
    end
    
    subgraph Storage Layer
        DecisionEngine -->|Save Report| Mongo[(MongoDB Atlas / Local JSON)]
    end

    API -->|Read History| Mongo
```

---

## 🚀 Key Features

1. **AI Hedge Fund Committee Mode**: Simulates active debates among 5 specialized investor personas (Warren Buffett, Peter Lynch, Ray Dalio, Cathie Wood, and a conservative Risk Manager) with scoring justifications.
2. **Real-Time Research Streaming**: Powered by Server-Sent Events (SSE). Watch active log logs stream and visual timeline nodes transition live (thinking -> completed).
3. **Interactive Agent Flow Canvas**: Renders a glowing SVG and Framer Motion vector map of the active agent workflow. Click any node to read specific analyst thought logs.
4. **Bloomberg-Style Trading Grid**: Modern dashboard using curated color schemes, glassmorphic grids, Recharts, and animated gauges.
5. **Portfolio Simulator**: Input capital values in INR/USD to compute diversified allocation weights based on Moat, Growth, and Risk metrics.
6. **One-Click PDF Export**: Download formatted investment banking-grade reports containing executive summaries, SWOT assessments, and signature seals.
7. **Database Resiliency & Failover**: Built-in 2-second timeout connections. If MongoDB Atlas has firewall blocks or is offline, the backend instantly fails over to local database storage (`local_db.json`) ensuring uninterrupted user experiences.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend Services**: Next.js API Routes (Server-Sent Events).
- **AI Agent Orchestrator**: LangGraph.js, LangChain.js.
- **LLM Engine**: Gemini 2.5 Pro (via Google Generative AI SDK).
- **Database**: MongoDB Atlas via Mongoose (with local `local_db.json` file fallback).
- **PDF Generation**: jsPDF.
- **Analytics & Tracking**: Google Analytics 4 & Microsoft Clarity.

---

## 📈 Telemetry, Session Tracking & Analytics

To facilitate growth monitoring and track recruiter behaviors, APEX Terminal integrates advanced user telemetry:

* **Google Analytics 4**: Configured via Tag ID `G-2MPHQR6L39` to measure geographic traffic, acquisition channels, active sessions, and event interactions.
  * **View Reports**: [Google Analytics Console](https://analytics.google.com/)
* **Microsoft Clarity**: Connected via Project ID `xcgw4tte9o` to record complete user sessions, mouse movement patterns, scroll depths, and interface friction hotspots.
  * **View Session Recordings & Heatmaps**: [Microsoft Clarity Console](https://clarity.microsoft.com/)

---

## 📦 Installation & Setup

Ensure you have **Node.js 20+** installed.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/SalapuVijay/apex-terminal.git
cd apex-terminal

# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
# AI API Key (Optional: Falls back to Simulation Mode if omitted)
GEMINI_API_KEY=your_gemini_api_key

# Database Connection (Optional: Falls back to local_db.json file if omitted)
MONGODB_URI=your_mongodb_connection_string

# Telemetry IDs
NEXT_PUBLIC_GA_ID=G-2MPHQR6L39
NEXT_PUBLIC_CLARITY_ID=xcgw4tte9o
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## ⚙️ How It Works & LangGraph Flow

1. **Data Ingestion**: The company name is researched to scrape sector listings, competitors, and fundamentals.
2. **Specialist Evaluation**: 
   - *Financial*: Audits operating margins, EPS, ROE, debt leverage.
   - *Sentiment*: Scores RSS news articles and social media optimism.
   - *Risk*: Groups threat profiles (regulatory, macro, sector).
3. **Swarm Debate**: Personas evaluate the metrics based on value/growth philosophies.
4. **Final Scoring Model**:
   $$\text{Final Score} = 0.35 F + 0.20 G + 0.15 S + 0.15 M + 0.15 (100 - R)$$
   Where:
   - $F$ = Financial Health Score
   - $G$ = Growth Potential Score
   - $S$ = Sentiment Score
   - $M$ = Competitive Moat Score
   - $R$ = Risk Rating Score (lower risk increases points)

---

## 🛠️ Key Trade-offs & Future Iterations

- **Client-Side vs. Server-Side PDF**: We utilized client-side `jsPDF` rather than Puppeteer. Puppeteer requires heavy server headless browser installations which frequently crash on Serverless function platforms like Vercel. Client-side compilation is highly reliable and fast.
- **SVG vs. React Flow**: We chose a custom SVG Framer Motion visualizer over React Flow. React Flow has peer-dependency mismatches with React 19, whereas SVG provides zero package dependency overhead, full responsiveness, and smooth rendering animations.
- **Resilient MongoDB Connectors**: Configured `connectTimeoutMS: 2000` to prevent function cold starts from hanging indefinitely due to Atlas network firewalls.
- **Future Roadmap**:
  - Add Vector Search (RAG) using Pinecone/FAISS to chat with historical SEC 10-K filings.
  - Implement Webhook integrations to email investors when a stock crosses a BUY threshold.

