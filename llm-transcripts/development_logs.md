# APEX Terminal - Developer Transcripts & Design Discussions

This directory compiles design, architecture, and debugging transcripts logged during the development of the APEX Autonomous Multi-Agent Investment Terminal.

---

## Session 1: Multi-Agent Swarm Design & Persona Modeling
**Objective**: Establish the core analysis workflow and model specialist analyst personas.

### Discussion Notes:
- **Heuristic Weights**: The final Scoring Engine must avoid simple average models. We decided to structure the consensus score around a weighted index representing distinct fundamental factors:
  - Financial Health: 35%
  - Growth Potential: 20%
  - News Sentiment: 15%
  - Competitive Moat: 15%
  - Downside Risk Protection: 15% (Modeled as \(100 - \text{Risk Score}\)).
- **Persona Architecture**: We wanted a committee mode reflecting distinct investment methodologies:
  1. *Warren Buffett*: Evaluates high return on equity (ROE > 15%), low leverage, and clear operational moats.
  2. *Peter Lynch*: Evaluates price-to-earnings growth (PEG) ratios, low relative debt, and simplicity of business.
  3. *Ray Dalio*: Evaluates credit cycle leverage, supply chain dependencies, and macroeconomic interest rate headwinds.
  4. *Cathie Wood*: Evaluates disruptive potential, compute scale, and exponential tech curves.
  5. *Risk Manager*: Establishes stop-loss bounds, checks regulatory warnings, and sets position size thresholds.

---

## Session 2: Backend Architecture & Real-Time Log Streaming
**Objective**: Design the log delivery mechanism for deep research.

### Technical Decision:
- **SSE vs WebSockets**: WebSockets introduce substantial server overhead, state connection pools, and edge execution limits on serverless providers like Vercel. We decided to build a **Server-Sent Events (SSE)** endpoint (`/api/research`) instead.
- SSE allows us to use standard HTTP connections, stream text data chunk-by-chunk using `ReadableStream` and `EventSource`, and easily close the connection when execution completes.
- We defined three SSE event channels:
  1. `step`: Emits the active node ID (e.g., `evaluate_buffett`) so the frontend visualizer knows which node to pulse.
  2. `log`: Emits console print lines (e.g., `✓ Warren Buffett evaluating Moat...`) for the Perplexity-style terminal log box.
  3. `done`: Emits the final completed `IResearchReport` JSON payload, triggering the dashboard charts render.

---

## Session 3: Visualizer Framework & React 19 Compatibility Debugging
**Objective**: Resolve package conflicts during visualizer creation.

### Debugging Log:
- **Symptom**: Attempting to install `@xyflow/react` or `reactflow` packages caused compilation errors due to peer dependency version clashes with **React 19** (Next.js 15 uses React 19 React Server Components).
- **Options Evaluated**:
  1. Forcing installs with `--legacy-peer-deps`. (High risk of runtime crashes or hydrations errors).
  2. Implementing a separate frontend branch. (Adds repository clutter).
  3. Creating a custom interactive canvas using **glowing SVGs and Framer Motion**.
- **Resolution**: Option 3 was implemented. By creating an SVG coordinate layout, we drew the graph pipelines, linked nodes using color-coded line vectors (idle, active, done), and added click state handlers that reveal analyst thoughts. This removed all external library dependencies, guaranteed type safety, and eliminated compilation warning messages.

---

## Session 4: Storage Fallbacks & Client-Side PDF Generation
**Objective**: Ensure zero-dependency installation out-of-the-box.

### Key Implementation Decisions:
- **Database Fallback**: MongoDB Atlas is the standard storage. To allow recruiters to run the code without configuring a MongoDB URI, we wrote `src/lib/db/db-service.ts` to automatically detect connection statuses. If MONGODB_URI is not set, it writes and reads to a local `local_db.json` file on the server.
- **Client-Side PDF Generation**: Using Puppeteer on serverless functions is notoriously error-prone due to Chromium binary size limits. We resolved this by implementing client-side PDF generation using **jsPDF**. The export script programmatically builds a multi-page A4 PDF memo with grids, borders, metadata sections, and signature seals.
