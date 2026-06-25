"use client";

import React from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface TimelineStep {
  id: string;
  name: string;
  desc: string;
}

interface LiveTimelineProps {
  activeNode: string;
  logs: string[];
}

export default function LiveTimeline({ activeNode, logs }: LiveTimelineProps) {
  const steps: TimelineStep[] = [
    { id: "research_company", name: "Company Profile Research", desc: "Industry positioning, business model, and competitor mapping." },
    { id: "analyze_financials", name: "Financial Statement Audit", desc: "Analyzing revenue growth, margins, leverage, and ROE ratios." },
    { id: "sentiment_analysis", name: "Market Sentiment Assessment", desc: "Crawling news RSS feeds and social media boards for optimism ratios." },
    { id: "risk_analysis", name: "Downside Risk Stress Test", desc: "Regulatory, industry-wide, and macroeconomic tail risks check." },
    { id: "evaluate_buffett", name: "AI Hedge Fund Evaluation Swarm", desc: "Buffett, Lynch, Dalio, and Wood independent investment memo generation." },
    { id: "debate_committee", name: "Hedge Fund Debate Arena", desc: "Specialist debates compile final Pros vs Cons matrices." },
    { id: "decision_engine", name: "Decision Engine consensus", desc: "Synthesizing scores into final combined rating recommendation." }
  ];

  const getStepStatus = (stepId: string) => {
    const stepOrder = [
      "research_company",
      "analyze_financials",
      "sentiment_analysis",
      "risk_analysis",
      "evaluate_buffett",
      "evaluate_lynch",
      "evaluate_dalio",
      "evaluate_wood",
      "evaluate_risk_manager",
      "debate_committee",
      "decision_engine"
    ];

    const stepIdx = stepOrder.indexOf(stepId);
    const activeIdx = stepOrder.indexOf(activeNode);

    // Group all persona evaluations together as "evaluate_buffett" in the UI step list
    if (stepId === "evaluate_buffett") {
      const buffetIdx = stepOrder.indexOf("evaluate_buffett");
      const riskMgrIdx = stepOrder.indexOf("evaluate_risk_manager");
      
      if (activeIdx >= buffetIdx && activeIdx <= riskMgrIdx) {
        return "active";
      }
      if (activeIdx > riskMgrIdx) {
        return "done";
      }
      return "idle";
    }

    if (stepId === activeNode) return "active";
    if (activeIdx === -1 && activeNode === "done") return "done";
    if (stepIdx < activeIdx) return "done";
    return "idle";
  };

  return (
    <div className="glass-panel p-6 rounded-xl border-border space-y-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <h3 className="text-sm font-mono font-bold tracking-wider text-white uppercase">
          Autonomous Research Timeline
        </h3>
        {activeNode !== "done" && activeNode !== "" && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 border border-primary/30 rounded bg-primary/10 text-[10px] font-mono text-primary uppercase animate-pulse">
            <Loader2 className="h-2.5 w-2.5 animate-spin" />
            SWARM RUNNING
          </div>
        )}
      </div>

      {/* Visual Timeline Steps */}
      <div className="space-y-4">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const isActive = status === "active";
          const isDone = status === "done";

          return (
            <div key={step.id} className="flex gap-4 items-start relative">
              {/* Status circle badge */}
              <div className="pt-1 z-10">
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-primary fill-primary/10" />
                ) : isActive ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/30" />
                )}
              </div>

              {/* Text content details */}
              <div className="flex-1 space-y-0.5">
                <h4 className={`text-xs font-mono font-bold ${isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.name}
                </h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Live Text Logs */}
      <div className="border-t border-border/60 pt-4 space-y-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
          Agent Execution Console Output:
        </span>
        <div className="bg-[#030712] border border-border/80 rounded-lg p-3 h-40 overflow-y-auto font-mono text-xs space-y-1.5 text-muted-foreground">
          {logs.map((log, index) => (
            <div key={index} className="terminal-row pl-2 text-emerald-400">
              {log}
            </div>
          ))}
          {activeNode !== "done" && activeNode !== "" && (
            <div className="flex items-center gap-1.5 pl-2 text-accent text-xs animate-pulse">
              <span className="animate-ping font-bold">&gt;</span>
              <span>Swarm processing agent decision channels...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
