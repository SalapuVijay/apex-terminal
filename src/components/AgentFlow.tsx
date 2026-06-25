"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Wallet, 
  BarChart4, 
  AlertOctagon, 
  Scale, 
  FileText,
  UserCheck,
  Cpu,
  BrainCircuit,
  Maximize2
} from "lucide-react";

interface NodeProps {
  id: string;
  label: string;
  title: string;
  icon: React.ComponentType<any>;
  status: "idle" | "active" | "done";
  x: number;
  y: number;
  thoughts?: string;
}

interface AgentFlowProps {
  activeNode: string;
  opinions?: any;
  scores?: any;
}

export default function AgentFlow({ activeNode, opinions }: AgentFlowProps) {
  const [selectedNode, setSelectedNode] = useState<NodeProps | null>(null);

  // Define nodes and layout coordinates in SVG viewbox (800x420)
  const nodes: NodeProps[] = [
    // Layer 1: Data Collectors
    { id: "research_company", label: "Research", title: "Company Profile Agent", icon: Building2, status: "idle", x: 100, y: 70, thoughts: "Gathers company operations info, industry segments, primary competitors, and general business scope." },
    { id: "analyze_financials", label: "Financials", title: "Financial Analyst Agent", icon: Wallet, status: "idle", x: 280, y: 70, thoughts: "Parses earnings growth rates, EPS, operating margins, leverage profiles, and generates fundamental health scores." },
    { id: "sentiment_analysis", label: "Sentiment", title: "Market Sentiment Agent", icon: BarChart4, status: "idle", x: 460, y: 70, thoughts: "Crawls news feeds and social discussions. Computes a composite optimism index." },
    { id: "risk_analysis", label: "Risk Officer", title: "Risk Assessment Agent", icon: AlertOctagon, status: "idle", x: 640, y: 70, thoughts: "Examines legal regulatory exposure, supply-chain liabilities, and evaluates downside volatility bands." },

    // Layer 2: Specialized Hedge Fund Persona Swarm
    { id: "evaluate_buffett", label: "Buffett", title: "Warren Buffett (Value Analyst)", icon: UserCheck, status: "idle", x: 100, y: 210, thoughts: opinions?.warrenBuffett?.reasoning || "Reviews cash flow consistency, capital efficiency metrics (ROE/ROA), and pricing power moats." },
    { id: "evaluate_lynch", label: "Lynch", title: "Peter Lynch (Growth Analyst)", icon: UserCheck, status: "idle", x: 240, y: 210, thoughts: opinions?.peterLynch?.reasoning || "Appraises PEG valuations, sales momentum, debt levels, and business model simplicity." },
    { id: "evaluate_dalio", label: "Dalio", title: "Ray Dalio (Macro Analyst)", icon: UserCheck, status: "idle", x: 380, y: 210, thoughts: opinions?.rayDalio?.reasoning || "Models credit leverage cycles, inflation adjustments, and geopolitical supply chain exposures." },
    { id: "evaluate_wood", label: "Wood", title: "Cathie Wood (Innovation Analyst)", icon: UserCheck, status: "idle", x: 520, y: 210, thoughts: opinions?.cathieWood?.reasoning || "Tracks disruptive technological vectors, scale-up curves, and long-term exponential growth potentials." },
    { id: "evaluate_risk_manager", label: "Risk Manager", title: "Risk Manager Agent", icon: Scale, status: "idle", x: 660, y: 210, thoughts: opinions?.riskManager?.reasoning || "Applies defensive portfolio guidelines, stress tests margins, and outlines protective hedges." },

    // Layer 3: Consensus Arena & Decision
    { id: "debate_committee", label: "Debate Panel", title: "Committee Debate Arena", icon: BrainCircuit, status: "idle", x: 280, y: 350, thoughts: "Simulates live dialogue contrasting value moats with innovation growth. Generates a pros/cons matrix." },
    { id: "decision_engine", label: "Decision Engine", title: "Consensus Decision Committee", icon: FileText, status: "idle", x: 480, y: 350, thoughts: "Consolidates individual specialist scorecards, weighs indicators, and compiles the final recommendation rating." },
  ];

  // Map active status dynamically based on current active node in LangGraph
  const nodeOrder = [
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

  const activeIndex = nodeOrder.indexOf(activeNode);
  
  const mappedNodes = nodes.map(node => {
    const nodeIdx = nodeOrder.indexOf(node.id);
    let status: NodeProps["status"] = "idle";
    
    if (nodeIdx === activeIndex) {
      status = "active";
    } else if (nodeIdx < activeIndex && activeIndex !== -1) {
      status = "done";
    } else if (activeIndex === -1 && activeNode === "done") {
      status = "done";
    }
    
    return { ...node, status };
  });

  return (
    <div className="relative w-full h-[380px] border border-border/30 rounded-xl bg-[#080d1a]/40 backdrop-blur-md p-4 overflow-hidden z-10">
      
      {/* Visualizer Title */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Cpu className="h-4.5 w-4.5 text-primary animate-pulse" />
        <span className="text-[10px] font-mono font-black text-muted-foreground uppercase tracking-widest">
          LangGraph Multi-Agent Flow visualizer
        </span>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-muted-foreground">
        <Maximize2 className="h-3 w-3" />
        <span className="text-[9px] font-mono tracking-wider uppercase select-none">
          Click nodes for analyst logs
        </span>
      </div>

      {/* SVG Canvas Map */}
      <svg className="w-full h-full pt-6" viewBox="0 0 800 420" preserveAspectRatio="xMidYMid meet">
        {/* Connections Layer (Lines) */}
        <g strokeWidth="2">
          {/* Layer 1 Connections */}
          <line x1="100" y1="70" x2="280" y2="70" 
            className={activeIndex > 0 ? "stroke-primary animate-dash" : "stroke-slate-800"} 
          />
          <line x1="280" y1="70" x2="460" y2="70" 
            className={activeIndex > 1 ? "stroke-primary animate-dash" : "stroke-slate-800"} 
          />
          <line x1="460" y1="70" x2="640" y2="70" 
            className={activeIndex > 2 ? "stroke-primary animate-dash" : "stroke-slate-800"} 
          />

          {/* Splitting Layer 1 Risk into Layer 2 Personas */}
          <line x1="640" y1="70" x2="100" y2="210" 
            className={activeIndex > 3 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-800"} 
          />
          <line x1="640" y1="70" x2="240" y2="210" 
            className={activeIndex > 3 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-800"} 
          />
          <line x1="640" y1="70" x2="380" y2="210" 
            className={activeIndex > 3 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-800"} 
          />
          <line x1="640" y1="70" x2="520" y2="210" 
            className={activeIndex > 3 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-800"} 
          />
          <line x1="640" y1="70" x2="660" y2="210" 
            className={activeIndex > 3 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-800"} 
          />

          {/* Converging Layer 2 Personas into Debate Committee */}
          <line x1="100" y1="210" x2="280" y2="350" 
            className={activeIndex > 8 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-850"} 
          />
          <line x1="240" y1="210" x2="280" y2="350" 
            className={activeIndex > 8 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-850"} 
          />
          <line x1="380" y1="210" x2="280" y2="350" 
            className={activeIndex > 8 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-850"} 
          />
          <line x1="520" y1="210" x2="280" y2="350" 
            className={activeIndex > 8 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-850"} 
          />
          <line x1="660" y1="210" x2="280" y2="350" 
            className={activeIndex > 8 ? "stroke-cyan-500/40 animate-dash" : "stroke-slate-850"} 
          />

          {/* Debate to Decision Engine */}
          <line x1="280" y1="350" x2="480" y2="350" 
            className={activeIndex > 9 ? "stroke-primary animate-dash" : "stroke-slate-800"} 
          />
        </g>

        {/* Nodes Layer */}
        {mappedNodes.map((node) => {
          const NodeIcon = node.icon;
          const isActive = node.status === "active";
          const isDone = node.status === "done";

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              className="cursor-pointer group"
              onClick={() => setSelectedNode(node)}
            >
              {/* Pulsing Backing ring for active states */}
              {isActive && (
                <circle
                  r="28"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  className="animate-ping opacity-50"
                />
              )}

              {/* Glowing Outline backplate */}
              <circle
                r="20"
                fill={isActive ? "#10b981" : isDone ? "#064e3b" : "#0f172a"}
                stroke={isActive ? "#34d399" : isDone ? "#10b981" : "#1e293b"}
                strokeWidth="1.5"
                className="transition-all duration-300 group-hover:stroke-cyan-400 group-hover:scale-105"
              />

              {/* lucide Icon overlay */}
              <g transform="translate(-8, -8)" className="pointer-events-none">
                <NodeIcon className={`h-4.5 w-4.5 ${isActive ? "text-[#020617]" : isDone ? "text-emerald-350" : "text-slate-400 group-hover:text-white"}`} />
              </g>

              {/* Label Tag */}
              <text
                y="35"
                textAnchor="middle"
                fill={isActive ? "#10b981" : isDone ? "#34d399" : "#64748b"}
                className="text-[9px] font-mono font-bold tracking-wider uppercase select-none group-hover:fill-white transition-all"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Thoughts Details Panel overlay */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="absolute bottom-4 left-4 right-4 bg-[#080d1a]/95 border border-primary/20 rounded-lg p-4 shadow-[0_0_20px_rgba(16,185,129,0.1)] z-30 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <h4 className="text-[10px] font-mono font-black text-primary uppercase tracking-widest">
                  {selectedNode.title} ACTIVE THOUGHT LOGS
                </h4>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-[9px] font-mono text-muted-foreground hover:text-white px-2 py-0.5 border border-border hover:border-white/20 rounded cursor-pointer"
              >
                CLOSE
              </button>
            </div>
            <p className="text-xs font-sans text-slate-200 leading-relaxed font-light italic">
              &ldquo;{selectedNode.thoughts}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
