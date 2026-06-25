import mongoose, { Schema, Document } from "mongoose";

// Interface definitions
export interface IReportScores {
  financials: number;
  growth: number;
  sentiment: number;
  competitive: number;
  risk: number;
}

export interface IHedgeFundOpinions {
  warrenBuffett: { rating: string; score: number; reasoning: string };
  peterLynch: { rating: string; score: number; reasoning: string };
  rayDalio: { rating: string; score: number; reasoning: string };
  cathieWood: { rating: string; score: number; reasoning: string };
  riskManager: { rating: string; score: number; reasoning: string };
}

export interface IResearchReport {
  symbol: string;
  name: string;
  recommendation: "STRONG BUY" | "BUY" | "HOLD" | "PASS" | "STRONG PASS";
  confidenceScore: number; // 0-100
  combinedScore: number; // 0-100
  scores: IReportScores;
  overview: {
    industry: string;
    businessModel: string;
    revenueSources: string[];
    marketPosition: string;
    competitors: string[];
  };
  financials: {
    healthScore: number;
    metrics: {
      revenueGrowthYOY: number;
      netIncomeMargin: number;
      operatingMargin: number;
      epsGrowth: number;
      debtToEquity: number;
      freeCashFlow: number;
      roe: number;
      roa: number;
    };
    chartData: Array<{ year: string; revenue: number; profit: number }>;
  };
  sentiment: {
    score: number;
    summary: string;
    sources: Array<{ source: string; title: string; sentiment: "positive" | "neutral" | "negative" }>;
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risk: {
    score: number;
    businessRisks: string[];
    industryRisks: string[];
    economicRisks: string[];
    regulatoryRisks: string[];
  };
  hedgeFundOpinions: IHedgeFundOpinions;
  debate: {
    pros: string[];
    cons: string[];
    summary: string;
  };
  createdAt: Date;
}

export interface IResearchReportDocument extends IResearchReport, Document {}

export interface IWatchlistItem {
  symbol: string;
  name: string;
  addedAt: Date;
}

export interface IWatchlistItemDocument extends IWatchlistItem, Document {}

export interface IPortfolioAllocation {
  capital: number;
  allocations: Array<{
    symbol: string;
    percentage: number;
    amount: number;
    reasoning: string;
  }>;
  createdAt: Date;
}

export interface IPortfolioAllocationDocument extends IPortfolioAllocation, Document {}

// Mongoose Schemas
const ResearchReportSchema = new Schema<IResearchReportDocument>({
  symbol: { type: String, required: true, index: true },
  name: { type: String, required: true },
  recommendation: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  combinedScore: { type: Number, required: true },
  scores: {
    financials: Number,
    growth: Number,
    sentiment: Number,
    competitive: Number,
    risk: Number,
  },
  overview: {
    industry: String,
    businessModel: String,
    revenueSources: [String],
    marketPosition: String,
    competitors: [String],
  },
  financials: {
    healthScore: Number,
    metrics: {
      revenueGrowthYOY: Number,
      netIncomeMargin: Number,
      operatingMargin: Number,
      epsGrowth: Number,
      debtToEquity: Number,
      freeCashFlow: Number,
      roe: Number,
      roa: Number,
    },
    chartData: [{ year: String, revenue: Number, profit: Number }],
  },
  sentiment: {
    score: Number,
    summary: String,
    sources: [{ source: String, title: String, sentiment: String }],
  },
  swot: {
    strengths: [String],
    weaknesses: [String],
    opportunities: [String],
    threats: [String],
  },
  risk: {
    score: Number,
    businessRisks: [String],
    industryRisks: [String],
    economicRisks: [String],
    regulatoryRisks: [String],
  },
  hedgeFundOpinions: {
    warrenBuffett: { rating: String, score: Number, reasoning: String },
    peterLynch: { rating: String, score: Number, reasoning: String },
    rayDalio: { rating: String, score: Number, reasoning: String },
    cathieWood: { rating: String, score: Number, reasoning: String },
    riskManager: { rating: String, score: Number, reasoning: String },
  },
  debate: {
    pros: [String],
    cons: [String],
    summary: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const WatchlistItemSchema = new Schema<IWatchlistItemDocument>({
  symbol: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const PortfolioAllocationSchema = new Schema<IPortfolioAllocationDocument>({
  capital: { type: Number, required: true },
  allocations: [{
    symbol: { type: String, required: true },
    percentage: { type: Number, required: true },
    amount: { type: Number, required: true },
    reasoning: { type: String, required: true },
  }],
  createdAt: { type: Date, default: Date.now },
});

// Export mongoose models safely (prevent overwrite errors during HMR)
export const ResearchReport = mongoose.models.ResearchReport || mongoose.model<IResearchReportDocument>("ResearchReport", ResearchReportSchema);
export const WatchlistItem = mongoose.models.WatchlistItem || mongoose.model<IWatchlistItemDocument>("WatchlistItem", WatchlistItemSchema);
export const PortfolioAllocation = mongoose.models.PortfolioAllocation || mongoose.model<IPortfolioAllocationDocument>("PortfolioAllocation", PortfolioAllocationSchema);
