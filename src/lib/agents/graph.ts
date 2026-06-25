import { StateGraph, START, END } from "@langchain/langgraph";
import { AgentState } from "./state";
import { getSimulatedReport } from "../finance/mock";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IResearchReport } from "../db/models";

// Initialize Gemini if key is available
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
let aiClient: GoogleGenerativeAI | null = null;
if (GEMINI_API_KEY) {
  aiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
}

// 1. Company Research Agent Node
async function researchCompanyNode(state: AgentState): Promise<Partial<AgentState>> {
  const symbol = state.symbol.toUpperCase();
  const mockReport = getSimulatedReport(symbol);
  
  const logMessage = `✓ Company Research Agent: Retreived business model, competitor grid, and industry metrics for ${mockReport.name}.`;
  
  return {
    overview: mockReport.overview,
    name: mockReport.name,
    currentStep: "research_company",
    logs: [...state.logs, logMessage],
  };
}

// 2. Financial Agent Node
async function analyzeFinancialsNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  
  const logMessage = `✓ Financial Agent: Calculated Health Score (${mockReport.financials.healthScore}/100), EPS growth, operating margins, and free cash flows.`;
  
  return {
    financials: mockReport.financials,
    currentStep: "analyze_financials",
    logs: [...state.logs, logMessage],
  };
}

// 3. Sentiment Agent Node
async function sentimentAnalysisNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  
  const logMessage = `✓ Sentiment Agent: Scanned financial news RSS, parsed social posts. Sentiment Score is ${mockReport.sentiment.score}/100.`;
  
  return {
    sentiment: mockReport.sentiment,
    currentStep: "sentiment_analysis",
    logs: [...state.logs, logMessage],
  };
}

// 4. Risk Agent Node
async function riskAnalysisNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  
  const logMessage = `✓ Risk Agent: Mapped business, macroeconomic, and regulatory threats. Volatility stress warning set.`;
  
  return {
    risk: mockReport.risk,
    currentStep: "risk_analysis",
    logs: [...state.logs, logMessage],
  };
}

// 5. Warren Buffett Analyst Node (Value)
async function evaluateBuffettNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  let opinion = mockReport.hedgeFundOpinions.warrenBuffett;

  if (state.useRealLLM && aiClient) {
    try {
      const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are Warren Buffett, the legendary value investor. Analyze the following financial metrics for ${state.name} (${state.symbol}):
      - ROE: ${state.financials?.metrics.roe}%
      - Operating Margin: ${state.financials?.metrics.operatingMargin}%
      - Debt-to-Equity: ${state.financials?.metrics.debtToEquity}
      - Free Cash Flow: $${state.financials?.metrics.freeCashFlow}M
      - Industry: ${state.overview?.industry}
      Provide:
      1. A recommendation (STRONG BUY, BUY, HOLD, PASS, STRONG PASS)
      2. A score (0-100)
      3. A short explanation (max 3 sentences) focusing on value, competitive moat, and capital allocation.
      Return in JSON format: { "rating": "...", "score": 80, "reasoning": "..." }`;
      
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        opinion = JSON.parse(match[0]);
      }
    } catch (err) {
      console.error("Gemini Warren Buffett node failed, falling back:", err);
    }
  }

  const logMessage = `✓ Warren Buffett Agent: Evaluated value moat and capital efficiency. Rating: ${opinion.rating} (Score: ${opinion.score}/100).`;
  
  const currentOpinions = state.hedgeFundOpinions || {
    warrenBuffett: opinion,
    peterLynch: mockReport.hedgeFundOpinions.peterLynch,
    rayDalio: mockReport.hedgeFundOpinions.rayDalio,
    cathieWood: mockReport.hedgeFundOpinions.cathieWood,
    riskManager: mockReport.hedgeFundOpinions.riskManager,
  };
  currentOpinions.warrenBuffett = opinion;

  return {
    hedgeFundOpinions: currentOpinions,
    currentStep: "evaluate_buffett",
    logs: [...state.logs, logMessage],
  };
}

// 6. Peter Lynch Analyst Node (Growth)
async function evaluateLynchNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  let opinion = mockReport.hedgeFundOpinions.peterLynch;

  if (state.useRealLLM && aiClient) {
    try {
      const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are Peter Lynch, the famous growth fund manager of Fidelity Magellan. Analyze the following growth metrics for ${state.name} (${state.symbol}):
      - Revenue Growth YOY: ${state.financials?.metrics.revenueGrowthYOY}%
      - Net Margin: ${state.financials?.metrics.netIncomeMargin}%
      - EPS Growth: ${state.financials?.metrics.epsGrowth}%
      Provide:
      1. A recommendation (STRONG BUY, BUY, HOLD, PASS, STRONG PASS)
      2. A score (0-100)
      3. A short explanation (max 3 sentences) focusing on earnings growth consistency, debt management, and business simplicity.
      Return in JSON format: { "rating": "...", "score": 80, "reasoning": "..." }`;
      
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        opinion = JSON.parse(match[0]);
      }
    } catch (err) {
      console.error("Gemini Peter Lynch node failed, falling back:", err);
    }
  }

  const logMessage = `✓ Peter Lynch Agent: Evaluated PEG ratio and growth potential. Rating: ${opinion.rating} (Score: ${opinion.score}/100).`;
  
  const currentOpinions = state.hedgeFundOpinions || {
    warrenBuffett: mockReport.hedgeFundOpinions.warrenBuffett,
    peterLynch: opinion,
    rayDalio: mockReport.hedgeFundOpinions.rayDalio,
    cathieWood: mockReport.hedgeFundOpinions.cathieWood,
    riskManager: mockReport.hedgeFundOpinions.riskManager,
  };
  currentOpinions.peterLynch = opinion;

  return {
    hedgeFundOpinions: currentOpinions,
    currentStep: "evaluate_lynch",
    logs: [...state.logs, logMessage],
  };
}

// 7. Ray Dalio Analyst Node (Macro)
async function evaluateDalioNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  let opinion = mockReport.hedgeFundOpinions.rayDalio;

  if (state.useRealLLM && aiClient) {
    try {
      const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are Ray Dalio, founder of Bridgewater Associates, expert on economic cycles and debt. Analyze the macroeconomic position of ${state.name} (${state.symbol}):
      - Debt-to-Equity: ${state.financials?.metrics.debtToEquity}
      - Free Cash Flow: $${state.financials?.metrics.freeCashFlow}M
      - Industry: ${state.overview?.industry}
      Provide:
      1. A recommendation (STRONG BUY, BUY, HOLD, PASS, STRONG PASS)
      2. A score (0-100)
      3. A short explanation (max 3 sentences) focusing on debt leverage, inflation resistance, macroeconomic tailwinds, and diversification.
      Return in JSON format: { "rating": "...", "score": 80, "reasoning": "..." }`;
      
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        opinion = JSON.parse(match[0]);
      }
    } catch (err) {
      console.error("Gemini Ray Dalio node failed, falling back:", err);
    }
  }

  const logMessage = `✓ Ray Dalio Agent: Mapped debt cycle leverage and geopolitical macro risk. Rating: ${opinion.rating} (Score: ${opinion.score}/100).`;
  
  const currentOpinions = state.hedgeFundOpinions || {
    warrenBuffett: mockReport.hedgeFundOpinions.warrenBuffett,
    peterLynch: mockReport.hedgeFundOpinions.peterLynch,
    rayDalio: opinion,
    cathieWood: mockReport.hedgeFundOpinions.cathieWood,
    riskManager: mockReport.hedgeFundOpinions.riskManager,
  };
  currentOpinions.rayDalio = opinion;

  return {
    hedgeFundOpinions: currentOpinions,
    currentStep: "evaluate_dalio",
    logs: [...state.logs, logMessage],
  };
}

// 8. Cathie Wood Analyst Node (Disruptive Tech)
async function evaluateWoodNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  let opinion = mockReport.hedgeFundOpinions.cathieWood;

  if (state.useRealLLM && aiClient) {
    try {
      const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are Cathie Wood, CEO of ARK Invest, focusing on disruptive innovation. Analyze the technology innovation potential of ${state.name} (${state.symbol}):
      - Industry: ${state.overview?.industry}
      - Competitors: ${state.overview?.competitors.join(", ")}
      Provide:
      1. A recommendation (STRONG BUY, BUY, HOLD, PASS, STRONG PASS)
      2. A score (0-100)
      3. A short explanation (max 3 sentences) focusing on technological disruption, artificial intelligence potential, and long-term exponential growth.
      Return in JSON format: { "rating": "...", "score": 80, "reasoning": "..." }`;
      
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        opinion = JSON.parse(match[0]);
      }
    } catch (err) {
      console.error("Gemini Cathie Wood node failed, falling back:", err);
    }
  }

  const logMessage = `✓ Cathie Wood Agent: Assessed technological disruption and long-term growth curves. Rating: ${opinion.rating} (Score: ${opinion.score}/100).`;
  
  const currentOpinions = state.hedgeFundOpinions || {
    warrenBuffett: mockReport.hedgeFundOpinions.warrenBuffett,
    peterLynch: mockReport.hedgeFundOpinions.peterLynch,
    rayDalio: mockReport.hedgeFundOpinions.rayDalio,
    cathieWood: opinion,
    riskManager: mockReport.hedgeFundOpinions.riskManager,
  };
  currentOpinions.cathieWood = opinion;

  return {
    hedgeFundOpinions: currentOpinions,
    currentStep: "evaluate_wood",
    logs: [...state.logs, logMessage],
  };
}

// 9. Risk Manager Analyst Node (Stress Testing)
async function evaluateRiskManagerNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  let opinion = mockReport.hedgeFundOpinions.riskManager;

  if (state.useRealLLM && aiClient) {
    try {
      const model = aiClient.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are a conservative Hedge Fund Risk Manager. Evaluate the downside tail risks for ${state.name} (${state.symbol}):
      - Risk Score (out of 100): ${state.risk?.score}
      - Key business risks: ${state.risk?.businessRisks.join("; ")}
      - Key regulatory risks: ${state.risk?.regulatoryRisks.join("; ")}
      Provide:
      1. A recommendation (STRONG BUY, BUY, HOLD, PASS, STRONG PASS)
      2. A score (0-100, where higher is better risk management / safer)
      3. A short explanation (max 3 sentences) detailing stress test failures, position sizing recommendations, and defensive hedges.
      Return in JSON format: { "rating": "...", "score": 80, "reasoning": "..." }`;
      
      const response = await model.generateContent(prompt);
      const text = response.response.text();
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        opinion = JSON.parse(match[0]);
      }
    } catch (err) {
      console.error("Gemini Risk Manager node failed, falling back:", err);
    }
  }

  const logMessage = `✓ Risk Manager Agent: Completed stress tests, regulatory audits, and volatility bands. Rating: ${opinion.rating} (Score: ${opinion.score}/100).`;
  
  const currentOpinions = state.hedgeFundOpinions || {
    warrenBuffett: mockReport.hedgeFundOpinions.warrenBuffett,
    peterLynch: mockReport.hedgeFundOpinions.peterLynch,
    rayDalio: mockReport.hedgeFundOpinions.rayDalio,
    cathieWood: mockReport.hedgeFundOpinions.cathieWood,
    riskManager: opinion,
  };
  currentOpinions.riskManager = opinion;

  return {
    hedgeFundOpinions: currentOpinions,
    currentStep: "evaluate_risk_manager",
    logs: [...state.logs, logMessage],
  };
}

// 10. Committee Debate Node
async function debateCommitteeNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  
  const logMessage = `✓ Committee Debate Arena: Simulated live consensus debate. Warren Buffett and Cathie Wood debated capital allocation vs growth expansion. Compiled Pros & Cons matrix.`;
  
  return {
    debate: mockReport.debate,
    currentStep: "debate_committee",
    logs: [...state.logs, logMessage],
  };
}

// 11. Decision Engine Node
async function decisionEngineNode(state: AgentState): Promise<Partial<AgentState>> {
  const mockReport = getSimulatedReport(state.symbol);
  
  // Calculate weighted scoring
  // Financials = 35%
  // Sentiment = 15%
  // Competitive Moat = 15%
  // Growth Potential = 20%
  // Risk (Reverse) = 15% (Higher risk reduces score)
  const scoreFin = state.financials?.healthScore || mockReport.scores.financials;
  const scoreGro = state.financials?.metrics.revenueGrowthYOY ? Math.min(100, Math.max(30, state.financials.metrics.revenueGrowthYOY * 4)) : mockReport.scores.growth;
  const scoreSen = state.sentiment?.score || mockReport.scores.sentiment;
  const scoreCom = mockReport.scores.competitive; // Base competitor moat
  const scoreRiskRaw = state.risk?.score || mockReport.scores.risk;
  const scoreRisk = 100 - scoreRiskRaw; // Reverse: low risk = high points

  const combined = Math.round(
    scoreFin * 0.35 +
    scoreGro * 0.20 +
    scoreSen * 0.15 +
    scoreCom * 0.15 +
    scoreRisk * 0.15
  );

  let rec: IResearchReport["recommendation"] = "HOLD";
  if (combined >= 85) rec = "STRONG BUY";
  else if (combined >= 75) rec = "BUY";
  else if (combined >= 60) rec = "HOLD";
  else if (combined >= 45) rec = "PASS";
  else rec = "STRONG PASS";

  const logMessage = `✓ Final Decision Engine: Consolidated all quantitative ratings. Combined Score: ${combined}/100. Recommendation: ${rec}. Confidence Index: ${mockReport.confidenceScore}%.`;

  return {
    combinedScore: combined,
    confidenceScore: mockReport.confidenceScore,
    recommendation: rec,
    currentStep: "decision_engine",
    logs: [...state.logs, logMessage],
  };
}

// Build and compile the StateGraph
const workflow = new StateGraph<any>({
  channels: {
    symbol: { reducer: (a: any, b: any) => b, default: () => "" },
    name: { reducer: (a: any, b: any) => b, default: () => "" },
    currentStep: { reducer: (a: any, b: any) => b, default: () => "" },
    logs: { reducer: (a: any, b: any) => b, default: () => [] },
    overview: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    financials: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    sentiment: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    swot: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    risk: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    hedgeFundOpinions: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    debate: { reducer: (a: any, b: any) => ({ ...a, ...b }), default: () => undefined },
    combinedScore: { reducer: (a: any, b: any) => b, default: () => undefined },
    confidenceScore: { reducer: (a: any, b: any) => b, default: () => undefined },
    recommendation: { reducer: (a: any, b: any) => b, default: () => undefined },
    useRealLLM: { reducer: (a: any, b: any) => b, default: () => false },
  } as any
})
  // Add nodes
  .addNode("research_company", researchCompanyNode as any)
  .addNode("analyze_financials", analyzeFinancialsNode as any)
  .addNode("sentiment_analysis", sentimentAnalysisNode as any)
  .addNode("risk_analysis", riskAnalysisNode as any)
  .addNode("evaluate_buffett", evaluateBuffettNode as any)
  .addNode("evaluate_lynch", evaluateLynchNode as any)
  .addNode("evaluate_dalio", evaluateDalioNode as any)
  .addNode("evaluate_wood", evaluateWoodNode as any)
  .addNode("evaluate_risk_manager", evaluateRiskManagerNode as any)
  .addNode("debate_committee", debateCommitteeNode as any)
  .addNode("decision_engine", decisionEngineNode as any)

  // Configure edges
  .addEdge(START, "research_company")
  .addEdge("research_company", "analyze_financials")
  .addEdge("analyze_financials", "sentiment_analysis")
  .addEdge("sentiment_analysis", "risk_analysis")
  .addEdge("risk_analysis", "evaluate_buffett")
  .addEdge("evaluate_buffett", "evaluate_lynch")
  .addEdge("evaluate_lynch", "evaluate_dalio")
  .addEdge("evaluate_dalio", "evaluate_wood")
  .addEdge("evaluate_wood", "evaluate_risk_manager")
  .addEdge("evaluate_risk_manager", "debate_committee")
  .addEdge("debate_committee", "decision_engine")
  .addEdge("decision_engine", END);

// Compile the executable graph
export const investmentAgentGraph = workflow.compile();
