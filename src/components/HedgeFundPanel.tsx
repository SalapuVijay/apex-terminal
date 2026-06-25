"use client";

import React from "react";
import { UserCheck, ShieldAlert, Award, Compass, Zap } from "lucide-react";

interface AnalystOpinion {
  rating: string;
  score: number;
  reasoning: string;
}

interface HedgeFundPanelProps {
  opinions: {
    warrenBuffett: AnalystOpinion;
    peterLynch: AnalystOpinion;
    rayDalio: AnalystOpinion;
    cathieWood: AnalystOpinion;
    riskManager: AnalystOpinion;
  };
}

export default function HedgeFundPanel({ opinions }: HedgeFundPanelProps) {
  const ratingColors: Record<string, string> = {
    "STRONG BUY": "text-emerald-400 bg-emerald-950/20 border-emerald-500/25",
    "BUY": "text-green-400 bg-green-950/15 border-green-500/20",
    "HOLD": "text-yellow-400 bg-yellow-950/15 border-yellow-500/20",
    "PASS": "text-rose-450 bg-rose-950/15 border-rose-500/20",
    "STRONG PASS": "text-rose-400 bg-rose-950/20 border-rose-500/25",
  };

  const fundMembers = [
    {
      key: "rayDalio",
      name: "Ray Dalio",
      title: "Macro Strategist",
      avatar: UserCheck,
      style: "border-blue-500/20 text-blue-400 bg-blue-500/5",
      avatarColor: "text-blue-400 bg-blue-950/30 border-blue-550/20",
      description: "Appraises economic debt cycles, liquidity exposures, systemic risks, and currency fluctuations."
    },
    {
      key: "warrenBuffett",
      name: "Warren Buffett",
      title: "Value Advisor",
      avatar: Award,
      style: "border-amber-500/20 text-amber-400 bg-amber-500/5",
      avatarColor: "text-amber-400 bg-amber-950/30 border-amber-550/20",
      description: "Evaluates moat sustainability, margins consistency, capital allocation (ROE), and pricing safety margins."
    },
    {
      key: "peterLynch",
      name: "Peter Lynch",
      title: "Growth Advisor",
      avatar: Compass,
      style: "border-emerald-500/20 text-emerald-400 bg-emerald-500/5",
      avatarColor: "text-emerald-400 bg-emerald-950/30 border-emerald-550/20",
      description: "Analyzes earnings consistency, PEG ratios, inventory management, and business model simplicity."
    },
    {
      key: "cathieWood",
      name: "Cathie Wood",
      title: "Disruptive Growth",
      avatar: Zap,
      style: "border-purple-500/20 text-purple-400 bg-purple-500/5",
      avatarColor: "text-purple-400 bg-purple-950/30 border-purple-550/20",
      description: "Tracks technological curves, total addressable markets, autonomous models, and disruption velocity."
    },
    {
      key: "riskManager",
      name: "Risk Control Officer",
      avatar: ShieldAlert,
      title: "Risk Officer",
      style: "border-rose-500/20 text-rose-450 bg-rose-500/5",
      avatarColor: "text-rose-400 bg-rose-950/30 border-rose-555/20",
      description: "Calculates maximum drawdowns, models margin stresses, and outlines position size bounds."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Panel description header */}
      <div className="flex flex-col gap-1 border-b border-border/10 pb-3">
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">
          AI Hedge Fund Committee Opinions
        </h3>
        <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
          Independent quantitative reviews from specialized advisor personas
        </p>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fundMembers.map((member) => {
          const opinion = opinions[member.key as keyof typeof opinions];
          if (!opinion) return null;
          const AvatarIcon = member.avatar;

          return (
            <div 
              key={member.key}
              className="glass-panel p-6 rounded-xl border-border/40 flex flex-col justify-between hover:border-primary/20 hover:scale-[1.01] transition-all relative overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Header with avatar & name */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-full border ${member.avatarColor}`}>
                      <AvatarIcon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-wide leading-none mb-1">
                        {member.name}
                      </h4>
                      <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
                        {member.title}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[9px] px-2 py-0.5 border rounded-lg font-mono font-black uppercase tracking-wider ${ratingColors[opinion.rating] || "text-gray-400 border-border"}`}>
                      {opinion.rating}
                    </span>
                    <span className="text-[10px] font-mono font-bold block mt-1.5 text-muted-foreground">
                      Grade: <span className="text-white font-black">{opinion.score}/100</span>
                    </span>
                  </div>
                </div>

                {/* reasoning text block */}
                <div className="border-t border-border/10 pt-3.5">
                  <p className="text-xs font-sans text-slate-300 leading-relaxed font-light italic">
                    &ldquo;{opinion.reasoning}&rdquo;
                  </p>
                </div>
              </div>

              {/* Strategy Details footnote */}
              <div className="border-t border-border/10 pt-3.5 mt-5">
                <span className="text-[9px] font-sans text-muted-foreground/60 leading-normal block font-light">
                  {member.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
