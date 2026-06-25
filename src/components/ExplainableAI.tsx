"use client";

import { Info } from "lucide-react";

interface ExplainableAIProps {
  scores: {
    financials: number;
    growth: number;
    sentiment: number;
    competitive: number;
    risk: number;
  };
  combinedScore: number;
  recommendation: string;
}

export default function ExplainableAI({ scores, combinedScore, recommendation }: ExplainableAIProps) {
  // Risk Protection Score is 100 - risk
  const riskProtection = 100 - scores.risk;

  const weights = [
    { name: "Financial Health", weight: 35, score: scores.financials, desc: "Leverage debt, margins, ROE, cash flows.", color: "from-emerald-500 to-teal-400" },
    { name: "Growth Potential", weight: 20, score: scores.growth, desc: "YoY revenue expansion and EPS compound rate.", color: "from-blue-500 to-cyan-400" },
    { name: "Market Sentiment", weight: 15, score: scores.sentiment, desc: "News headlines and social retail volume indexes.", color: "from-amber-500 to-yellow-450" },
    { name: "Competitive Moat", weight: 15, score: scores.competitive, desc: "CUDA software, brand premium, network locks.", color: "from-purple-500 to-pink-400" },
    { name: "Risk Protection", weight: 15, score: riskProtection, desc: "Downside stress limits, regulatory safety buffer.", color: "from-rose-500 to-red-400" }
  ];

  return (
    <div className="glass-panel p-6 rounded-xl border-border/40 space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/10 pb-3">
        <Info className="h-4.5 w-4.5 text-primary" />
        <div>
          <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase leading-none mb-1">
            Explainable AI decision Engine
          </h3>
          <p className="text-[9px] text-muted-foreground uppercase font-mono tracking-wider">
            Consensus rating formula parameters
          </p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {weights.map((w, index) => {
          const contrib = Math.round((w.score * (w.weight / 100)) * 10) / 10;
          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                <span className="text-muted-foreground uppercase">
                  {w.name} <span className="text-white/20">({w.weight}%)</span>
                </span>
                <span className="text-white">
                  {w.score}/100 <span className="text-primary ml-1">(+{contrib})</span>
                </span>
              </div>
              
              {/* Progress bar with custom gradient */}
              <div className="h-2 bg-[#020617] border border-border/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${w.color} transition-all duration-700 ease-out`} 
                  style={{ width: `${w.score}%` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground/60 block leading-tight font-light font-sans">
                {w.desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decision Summary Formula Ledger */}
      <div className="bg-[#020617] border border-border/40 rounded-lg p-4 text-center font-mono space-y-3 shadow-inner">
        <span className="text-[9px] text-muted-foreground tracking-widest uppercase block font-black">
          Decision Consensus Formula
        </span>
        
        {/* Math equation renderer */}
        <div className="text-[10px] text-cyan-400 py-1.5 overflow-x-auto border-y border-border/10 bg-[#020617]/40 leading-relaxed select-all">
          {"\\[\\text{Score} = 0.35 F + 0.20 G + 0.15 S + 0.15 M + 0.15 (100 - R)\\]"}
        </div>
        
        <div className="text-xs text-white pt-1">
          Final Weighted Score: <span className="text-primary font-black">{combinedScore} / 100</span>
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-primary/20 rounded bg-primary/5 text-[9px] font-black font-mono text-primary uppercase tracking-wider">
          Consensus: {recommendation}
        </div>
      </div>
    </div>
  );
}
