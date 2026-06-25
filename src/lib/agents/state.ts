import { IResearchReport } from "../db/models";

export interface AgentState {
  [key: string]: any;
  symbol: string;
  name: string;
  currentStep: string;
  logs: string[]; // Live execution log trace (e.g. "Warren Buffett starting analysis...")
  
  // Data accumulated by nodes
  overview?: IResearchReport["overview"];
  financials?: IResearchReport["financials"];
  sentiment?: IResearchReport["sentiment"];
  swot?: IResearchReport["swot"];
  risk?: IResearchReport["risk"];
  
  // Hedge Fund analyst opinions
  hedgeFundOpinions?: IResearchReport["hedgeFundOpinions"];
  
  // Debate results
  debate?: IResearchReport["debate"];
  
  // Final Consensus
  combinedScore?: number;
  confidenceScore?: number;
  recommendation?: IResearchReport["recommendation"];
  
  // Controls
  useRealLLM: boolean;
}

/**
 * Reducer function for state updates in LangGraph channels.
 */
export function updateLogs(existing: string[], incoming: string[]): string[] {
  return [...existing, ...incoming];
}
