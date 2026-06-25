"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeftRight, Check, Sparkles, Building2 } from "lucide-react";
import { getSimulatedReport } from "@/lib/finance/mock";
import { IResearchReport } from "@/lib/db/models";

export default function CompareArena() {
  const [symA, setSymA] = useState("TSLA");
  const [symB, setSymB] = useState("NVDA");
  const [reportA, setReportA] = useState<IResearchReport | null>(null);
  const [reportB, setReportB] = useState<IResearchReport | null>(null);

  const stockOptions = ["TSLA", "NVDA", "AAPL", "MSFT", "RELIANCE", "TCS"];

  useEffect(() => {
    // Load baseline data on load
    setTimeout(() => {
      setReportA(getSimulatedReport(symA));
      setReportB(getSimulatedReport(symB));
    }, 0);
  }, [symA, symB]);

  const ratingColors: Record<string, string> = {
    "STRONG BUY": "text-emerald-400 bg-emerald-950/20 border-emerald-500/20",
    "BUY": "text-green-400 bg-green-950/15 border-green-500/20",
    "HOLD": "text-yellow-400 bg-yellow-950/15 border-yellow-500/20",
    "PASS": "text-rose-450 bg-rose-950/15 border-rose-500/20",
    "STRONG PASS": "text-rose-400 bg-rose-950/20 border-rose-500/25",
  };

  // Compare helper to highlight winning metrics
  const isWinning = (metric: string, valA: number, valB: number, isA: boolean) => {
    if (metric === "debtToEquity") {
      // Lower debt to equity is better
      return isA ? valA < valB : valB < valA;
    }
    // Higher is better for all other metrics
    return isA ? valA > valB : valB > valA;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-border/20 pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
              Company Comparison Arena
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Compare asset profiles side-by-side on financials, SWOT, and hedge fund opinions
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>

        {/* Selection Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 bg-[#080d1a]/60 p-5 border border-border/30 rounded-xl backdrop-blur-md">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[9px] font-mono font-black text-muted-foreground tracking-widest uppercase block">
              ASSET A (PRIMARY)
            </label>
            <select
              value={symA}
              onChange={(e) => setSymA(e.target.value)}
              className="w-full bg-[#020617] border border-border/40 focus:border-primary/40 text-foreground font-mono text-xs rounded-lg p-3 outline-none cursor-pointer hover:border-border/80 transition-colors"
            >
              {stockOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="md:col-span-1 text-center justify-center hidden md:flex">
            <ArrowLeftRight className="h-5 w-5 text-primary/50" />
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[9px] font-mono font-black text-muted-foreground tracking-widest uppercase block">
              ASSET B (COMPARISON)
            </label>
            <select
              value={symB}
              onChange={(e) => setSymB(e.target.value)}
              className="w-full bg-[#020617] border border-border/40 focus:border-primary/40 text-foreground font-mono text-xs rounded-lg p-3 outline-none cursor-pointer hover:border-border/80 transition-colors"
            >
              {stockOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Comparison Tables Columns */}
        <AnimatePresence mode="wait">
          {reportA && reportB && (
            <motion.div 
              key={symA + symB}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              
              {/* Asset A Primary Column */}
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border-border/40 shadow-lg relative overflow-hidden">
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <Building2 className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest font-black bg-primary/5 px-2 py-0.5 border border-primary/10 rounded">ASSET A INDEX Dossier</span>
                  <h2 className="text-xl font-bold text-white mt-3 leading-none">{reportA.name}</h2>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1.5 uppercase tracking-wider">{reportA.overview.industry}</p>
                  
                  <div className="flex items-center gap-6 mt-5 bg-[#030712]/50 p-4 rounded-lg border border-border/20">
                    <div className="space-y-1">
                      <span className="text-[8px] text-muted-foreground font-mono uppercase tracking-wider block">RECOMMENDATION</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-lg border font-mono font-black block w-max uppercase ${ratingColors[reportA.recommendation]}`}>
                        {reportA.recommendation}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-muted-foreground font-mono uppercase tracking-wider block">DECISION SCORE</span>
                      <span className="text-md font-mono font-black text-white block">{reportA.combinedScore} / 100</span>
                    </div>
                  </div>
                </div>

                {/* Financial metrics list */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5">Financial Metrics Audit</h3>
                  <div className="space-y-3 text-xs font-mono">
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("revenueGrowthYOY", reportA.financials.metrics.revenueGrowthYOY, reportB.financials.metrics.revenueGrowthYOY, true) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Revenue Growth YOY</span>
                      <span className="text-white font-bold">{reportA.financials.metrics.revenueGrowthYOY}%</span>
                    </div>
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("operatingMargin", reportA.financials.metrics.operatingMargin, reportB.financials.metrics.operatingMargin, true) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Operating Margin</span>
                      <span className="text-white font-bold">{reportA.financials.metrics.operatingMargin}%</span>
                    </div>
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("debtToEquity", reportA.financials.metrics.debtToEquity, reportB.financials.metrics.debtToEquity, true) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Debt-to-Equity Ratio</span>
                      <span className="text-white font-bold">{reportA.financials.metrics.debtToEquity}</span>
                    </div>
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("roe", reportA.financials.metrics.roe, reportB.financials.metrics.roe, true) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Return on Equity (ROE)</span>
                      <span className="text-white font-bold">{reportA.financials.metrics.roe}%</span>
                    </div>
                    <div className={`flex justify-between pb-2 px-2 rounded ${isWinning("freeCashFlow", reportA.financials.metrics.freeCashFlow, reportB.financials.metrics.freeCashFlow, true) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Free Cash Flow</span>
                      <span className="text-white font-bold">$ {reportA.financials.metrics.freeCashFlow} M</span>
                    </div>
                  </div>
                </div>

                {/* SWOT Highlights */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5">SWOT Summary Highlights</h3>
                  <div className="space-y-4 text-xs leading-relaxed">
                    <div className="space-y-1">
                      <span className="text-emerald-400 font-mono font-bold block uppercase tracking-wider text-[10px]">Core Moat Strengths</span>
                      <p className="text-slate-300 font-light italic leading-relaxed">&ldquo;{reportA.swot.strengths[0]}&rdquo;</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-rose-400 font-mono font-bold block uppercase tracking-wider text-[10px]">Vulnerabilities & Threats</span>
                      <p className="text-slate-300 font-light italic leading-relaxed">&ldquo;{reportA.swot.threats[0]}&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* Hedge Fund Opinion Summary */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5">Committee opinions Summary</h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Warren Buffett (Value)</span>
                      <span className="text-white font-bold">{reportA.hedgeFundOpinions.warrenBuffett.rating} ({reportA.hedgeFundOpinions.warrenBuffett.score}/100)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Peter Lynch (Growth)</span>
                      <span className="text-white font-bold">{reportA.hedgeFundOpinions.peterLynch.rating} ({reportA.hedgeFundOpinions.peterLynch.score}/100)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Ray Dalio (Macro)</span>
                      <span className="text-white font-bold">{reportA.hedgeFundOpinions.rayDalio.rating} ({reportA.hedgeFundOpinions.rayDalio.score}/100)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Cathie Wood (Innovation)</span>
                      <span className="text-white font-bold">{reportA.hedgeFundOpinions.cathieWood.rating} ({reportA.hedgeFundOpinions.cathieWood.score}/100)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset B Primary Column */}
              <div className="space-y-6">
                <div className="glass-panel p-6 rounded-xl border-border/40 shadow-lg relative overflow-hidden">
                  <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center">
                    <Building2 className="h-4.5 w-4.5 text-cyan-400" />
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-black bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/10 rounded">ASSET B INDEX Dossier</span>
                  <h2 className="text-xl font-bold text-white mt-3 leading-none">{reportB.name}</h2>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1.5 uppercase tracking-wider">{reportB.overview.industry}</p>
                  
                  <div className="flex items-center gap-6 mt-5 bg-[#030712]/50 p-4 rounded-lg border border-border/20">
                    <div className="space-y-1">
                      <span className="text-[8px] text-muted-foreground font-mono uppercase tracking-wider block">RECOMMENDATION</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-lg border font-mono font-black block w-max uppercase ${ratingColors[reportB.recommendation]}`}>
                        {reportB.recommendation}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-muted-foreground font-mono uppercase tracking-wider block">DECISION SCORE</span>
                      <span className="text-md font-mono font-black text-white block">{reportB.combinedScore} / 100</span>
                    </div>
                  </div>
                </div>

                {/* Financial metrics list */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5">Financial Metrics Audit</h3>
                  <div className="space-y-3 text-xs font-mono">
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("revenueGrowthYOY", reportA.financials.metrics.revenueGrowthYOY, reportB.financials.metrics.revenueGrowthYOY, false) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Revenue Growth YOY</span>
                      <span className="text-white font-bold">{reportB.financials.metrics.revenueGrowthYOY}%</span>
                    </div>
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("operatingMargin", reportA.financials.metrics.operatingMargin, reportB.financials.metrics.operatingMargin, false) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Operating Margin</span>
                      <span className="text-white font-bold">{reportB.financials.metrics.operatingMargin}%</span>
                    </div>
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("debtToEquity", reportA.financials.metrics.debtToEquity, reportB.financials.metrics.debtToEquity, false) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Debt-to-Equity Ratio</span>
                      <span className="text-white font-bold">{reportB.financials.metrics.debtToEquity}</span>
                    </div>
                    <div className={`flex justify-between border-b border-border/10 pb-2 px-2 rounded ${isWinning("roe", reportA.financials.metrics.roe, reportB.financials.metrics.roe, false) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Return on Equity (ROE)</span>
                      <span className="text-white font-bold">{reportB.financials.metrics.roe}%</span>
                    </div>
                    <div className={`flex justify-between pb-2 px-2 rounded ${isWinning("freeCashFlow", reportA.financials.metrics.freeCashFlow, reportB.financials.metrics.freeCashFlow, false) ? "bg-emerald-950/15 border-l-2 border-l-emerald-500" : ""}`}>
                      <span className="text-muted-foreground">Free Cash Flow</span>
                      <span className="text-white font-bold">$ {reportB.financials.metrics.freeCashFlow} M</span>
                    </div>
                  </div>
                </div>

                {/* SWOT Highlights */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5">SWOT Summary Highlights</h3>
                  <div className="space-y-4 text-xs leading-relaxed">
                    <div className="space-y-1">
                      <span className="text-emerald-400 font-mono font-bold block uppercase tracking-wider text-[10px]">Core Moat Strengths</span>
                      <p className="text-slate-300 font-light italic leading-relaxed">&ldquo;{reportB.swot.strengths[0]}&rdquo;</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-rose-400 font-mono font-bold block uppercase tracking-wider text-[10px]">Vulnerabilities & Threats</span>
                      <p className="text-slate-300 font-light italic leading-relaxed">&ldquo;{reportB.swot.threats[0]}&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* Hedge Fund Opinion Summary */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5">Committee opinions Summary</h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Warren Buffett (Value)</span>
                      <span className="text-white font-bold">{reportB.hedgeFundOpinions.warrenBuffett.rating} ({reportB.hedgeFundOpinions.warrenBuffett.score}/100)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Peter Lynch (Growth)</span>
                      <span className="text-white font-bold">{reportB.hedgeFundOpinions.peterLynch.rating} ({reportB.hedgeFundOpinions.peterLynch.score}/100)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Ray Dalio (Macro)</span>
                      <span className="text-white font-bold">{reportB.hedgeFundOpinions.rayDalio.rating} ({reportB.hedgeFundOpinions.rayDalio.score}/100)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/10 pb-2">
                      <span className="text-muted-foreground">Cathie Wood (Innovation)</span>
                      <span className="text-white font-bold">{reportB.hedgeFundOpinions.cathieWood.rating} ({reportB.hedgeFundOpinions.cathieWood.score}/100)</span>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
