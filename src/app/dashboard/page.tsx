"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import AgentFlow from "@/components/AgentFlow";
import LiveTimeline from "@/components/LiveTimeline";
import HedgeFundPanel from "@/components/HedgeFundPanel";
import ExplainableAI from "@/components/ExplainableAI";
import FinancialCharts from "@/components/FinancialCharts";
import ConfidenceGauge from "@/components/ConfidenceGauge";
import PDFExportBtn from "@/components/PDFExportBtn";
import { 
  Search, 
  Plus, 
  Check, 
  AlertTriangle,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Layers,
  Activity,
  ArrowRight
} from "lucide-react";
import { IResearchReport } from "@/lib/db/models";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeNode, setActiveNode] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [report, setReport] = useState<IResearchReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const streamCompletedRef = useRef(false);
  
  // Watchlist status
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlists, setWatchlists] = useState<string[]>([]);

  // Suggested quick stocks
  const quickStocks = [
    { symbol: "TSLA", name: "Tesla" },
    { symbol: "NVDA", name: "Nvidia" },
    { symbol: "AAPL", name: "Apple" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "RELIANCE", name: "Reliance" },
    { symbol: "TCS", name: "TCS" }
  ];

  const fetchWatchlists = async () => {
    try {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      if (data.success) {
        setWatchlists(data.list.map((item: any) => item.symbol.toUpperCase()));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch current watchlists on load
  useEffect(() => {
    setTimeout(() => {
      fetchWatchlists();
    }, 0);
  }, []);

  // Update watchlist state when report changes
  useEffect(() => {
    if (report) {
      const isPresent = watchlists.includes(report.symbol.toUpperCase());
      if (isPresent !== inWatchlist) {
        setTimeout(() => {
          setInWatchlist(isPresent);
        }, 0);
      }
    }
  }, [report, watchlists, inWatchlist]);

  const handleWatchlistToggle = async () => {
    if (!report) return;
    const symbol = report.symbol.toUpperCase();
    
    if (inWatchlist) {
      // Remove
      try {
        const res = await fetch(`/api/watchlist?symbol=${symbol}`, { method: "DELETE" });
        const data = await res.json();
        if (data.success) {
          setInWatchlist(false);
          setWatchlists(prev => prev.filter(s => s !== symbol));
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Add
      try {
        const res = await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbol, name: report.name })
        });
        const data = await res.json();
        if (data.success) {
          setInWatchlist(true);
          setWatchlists(prev => [...prev, symbol]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const startResearch = (symbolToResearch: string) => {
    if (!symbolToResearch) return;
    streamCompletedRef.current = false;
    setLoading(true);
    setReport(null);
    setError(null);
    setLogs([]);
    setActiveNode("research_company");
    
    const useLLM = localStorage.getItem("useLLM") === "true";
    
    try {
      // Connect SSE stream
      const eventSource = new EventSource(`/api/research?symbol=${symbolToResearch}&useLLM=${useLLM}`);

      eventSource.addEventListener("step", (e) => {
        try {
          const data = JSON.parse(e.data);
          setActiveNode(data.activeNode);
        } catch (err) {
          console.error("Failed to parse step data:", err);
        }
      });

      eventSource.addEventListener("log", (e) => {
        setLogs((prev) => [...prev, e.data]);
      });

      eventSource.addEventListener("done", (e) => {
        try {
          streamCompletedRef.current = true;
          const finalReport = JSON.parse(e.data) as IResearchReport;
          setReport(finalReport);
          setLoading(false);
          setActiveNode("done");
          eventSource.close();
          fetchWatchlists(); // refresh
        } catch (err) {
          console.error("Failed to parse final report:", err);
          setError("Failed to parse the final research memo.");
          setLoading(false);
          setActiveNode("");
          eventSource.close();
        }
      });

      eventSource.addEventListener("error", (e) => {
        if (streamCompletedRef.current) {
          eventSource.close();
          return;
        }
        console.error("SSE stream error:", e);
        setError("Swarm connection interrupted. Please ensure dev server is running and try again.");
        setLogs((prev) => [...prev, "❌ Critical: Swarm error encountered. Closing execution channel."]);
        setLoading(false);
        setActiveNode("");
        eventSource.close();
      });
    } catch (err) {
      console.error("Failed to initialize EventSource:", err);
      setError("Failed to initialize the intelligence swarm channel.");
      setLoading(false);
      setActiveNode("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // 1. Check for quickResearch from watchlist
      const quick = localStorage.getItem("quickResearch");
      if (quick) {
        localStorage.removeItem("quickResearch");
        setQuery(quick);
        startResearch(quick);
        return;
      }

      // 2. Check for loadCachedReport from history
      const cached = localStorage.getItem("loadCachedReport");
      if (cached) {
        localStorage.removeItem("loadCachedReport");
        try {
          const parsed = JSON.parse(cached);
          setReport(parsed);
          setQuery(parsed.symbol);
          setActiveNode("done");
          return;
        } catch (e) {
          console.error(e);
        }
      }

      // 3. Check for query parameter
      const params = new URLSearchParams(window.location.search);
      const symParam = params.get("symbol");
      if (symParam) {
        setQuery(symParam);
        startResearch(symParam);
      }
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startResearch(query);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Top Ticker row & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-border/20 pb-6 relative z-10">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              Equity Research Terminal
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Search Tickers or Select a Shortcut to initiate multi-agent research
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search symbol (e.g. AAPL, TSLA, NVDA)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#030712] border border-border/40 focus:border-primary/40 focus:ring-1 focus:ring-primary/25 text-foreground font-mono text-xs rounded-lg pl-10 pr-4 py-3 outline-none transition-all"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query}
              className="px-6 py-3 bg-primary text-[#020617] font-mono text-xs font-bold rounded-lg hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center gap-1"
            >
              RUN SWARM
            </button>
          </form>
        </div>

        {/* ERROR DISPLAY */}
        <AnimatePresence>
          {error && !loading && !report && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-panel-glow-red p-4 rounded-lg flex items-center gap-3 max-w-md mx-auto z-10"
            >
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
              <div className="flex-1">
                <span className="font-mono font-bold block uppercase text-[9px] text-white tracking-widest">Execution Alert</span>
                <p className="text-[11px] font-light leading-relaxed text-destructive">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-[9px] font-mono text-muted-foreground hover:text-white px-2 py-1 border border-border rounded cursor-pointer"
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EMPTY/WELCOME STATE */}
        <AnimatePresence mode="wait">
          {!loading && !report && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="glass-panel p-8 rounded-xl border-border/40 text-center py-16 max-w-2xl mx-auto space-y-6">
                <div className="h-14 w-14 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.04)]">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-white tracking-wide">Ready for Portfolio Auditing</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-lg mx-auto font-light">
                    APEX swarms launch concurrent pipelines scanning fundamental balance sheets, technical news sentiment, and stress drawdowns, culminating in a consensus hedge fund committee arena.
                  </p>
                </div>
                
                <div className="h-px bg-border/20 max-w-sm mx-auto" />
                
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-muted-foreground tracking-widest uppercase block">
                    Quick-Select Swarm Tickers
                  </span>
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
                    {quickStocks.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => {
                          setQuery(stock.symbol);
                          startResearch(stock.symbol);
                        }}
                        className="px-3.5 py-2 border border-border/40 hover:border-primary/30 bg-[#0b1329]/20 hover:bg-[#0b1329]/60 text-xs font-mono font-bold rounded-lg text-muted-foreground hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {stock.symbol}
                        <ArrowRight className="h-3 w-3 text-muted-foreground/45 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOADING & TIMELINE STATE */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <AgentFlow activeNode={activeNode} />
                
                {/* Skeletons representing logs */}
                <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                  <div className="h-4 bg-[#1e293b]/40 w-1/4 rounded shimmer-gradient" />
                  <div className="space-y-2">
                    <div className="h-3 bg-[#1e293b]/20 w-3/4 rounded shimmer-gradient" />
                    <div className="h-3 bg-[#1e293b]/20 w-5/6 rounded shimmer-gradient" />
                    <div className="h-3 bg-[#1e293b]/20 w-2/3 rounded shimmer-gradient" />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <LiveTimeline activeNode={activeNode} logs={logs} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPLETED REPORT DASHBOARD */}
        <AnimatePresence>
          {report && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Dossier Header Info Badge */}
              <div className="glass-panel p-6 rounded-xl border-border/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-primary uppercase tracking-widest font-black bg-primary/5 px-2 py-0.5 border border-primary/10 rounded">
                    EQUITY EVALUATION DOSSIER &bull; SEC-ID: {report.symbol}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1.5">
                    {report.name} ({report.symbol.toUpperCase()})
                  </h2>
                  <p className="text-xs text-muted-foreground font-light">
                    {report.overview.industry} &bull; Sector Moat Evaluated &bull; {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleWatchlistToggle}
                    className={`px-4 py-2.5 border rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      inWatchlist
                        ? "border-primary text-primary bg-primary/5"
                        : "border-border/60 text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {inWatchlist ? (
                      <>
                        <Check className="h-4 w-4" />
                        IN WATCHLIST
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        ADD TO WATCHLIST
                      </>
                    )}
                  </button>

                  <PDFExportBtn report={report} />
                </div>
              </div>

              {/* Main Grid Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left & Middle Column (2-Span) */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Flow Visualizer (glowing SVG) */}
                  <AgentFlow activeNode="done" opinions={report.hedgeFundOpinions} />

                  {/* Company profile overview */}
                  <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2.5 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      Company Operations Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Business Model Description</span>
                          <p className="text-slate-350 leading-relaxed font-light">{report.overview.businessModel}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Key Competitors</span>
                          <div className="flex flex-wrap gap-1.5">
                            {report.overview.competitors.map((c) => (
                              <span key={c} className="px-2.5 py-1 border border-border/40 rounded bg-slate-900/50 font-mono text-[9px] text-white/80">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Primary Revenue Streams</span>
                          <ul className="space-y-1.5 list-disc list-inside text-slate-350 leading-normal font-light">
                            {report.overview.revenueSources.map((source) => (
                              <li key={source} className="marker:text-primary/70">{source}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Market Position Moat</span>
                          <p className="text-slate-350 leading-relaxed font-light">{report.overview.marketPosition}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Health Charts */}
                  <FinancialCharts data={report.financials.chartData} />

                  {/* SWOT Matrix Grid */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                      <Activity className="h-4 w-4 text-cyan-400" />
                      Competitor SWOT Matrix
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="glass-panel p-5 rounded-xl border-border/40 bg-emerald-950/5 space-y-2.5">
                        <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider block">STRENGTHS</span>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed font-light">
                          {report.swot.strengths.map((s) => <li key={s} className="marker:text-emerald-500">{s}</li>)}
                        </ul>
                      </div>
                      
                      <div className="glass-panel p-5 rounded-xl border-border/40 bg-rose-950/5 space-y-2.5">
                        <span className="text-[10px] font-mono font-bold text-rose-400 tracking-wider block">WEAKNESSES</span>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed font-light">
                          {report.swot.weaknesses.map((w) => <li key={w} className="marker:text-rose-500">{w}</li>)}
                        </ul>
                      </div>
                      
                      <div className="glass-panel p-5 rounded-xl border-border/40 bg-blue-950/5 space-y-2.5">
                        <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider block">OPPORTUNITIES</span>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed font-light">
                          {report.swot.opportunities.map((o) => <li key={o} className="marker:text-blue-500">{o}</li>)}
                        </ul>
                      </div>
                      
                      <div className="glass-panel p-5 rounded-xl border-border/40 bg-amber-950/5 space-y-2.5">
                        <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider block">THREATS</span>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed font-light">
                          {report.swot.threats.map((t) => <li key={t} className="marker:text-amber-500">{t}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Debate Arena Pros and Cons */}
                  <div className="glass-panel p-6 rounded-xl border-border/40 space-y-6">
                    <div className="border-b border-border/10 pb-3 flex items-center justify-between">
                      <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                        Specialist debate Committee Arena
                      </h3>
                      <span className="text-[9px] font-mono px-2 py-0.5 border border-amber-500/20 text-amber-400 rounded bg-amber-500/5 uppercase tracking-wider font-bold">
                        PROS vs CONS COLLATED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                      <div className="space-y-3">
                        <span className="font-mono font-bold text-emerald-400 flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
                          <TrendingUp className="h-4 w-4" /> BULL ARGUMENTS
                        </span>
                        <ul className="space-y-2.5 text-slate-300 font-light">
                          {report.debate.pros.map((p) => (
                            <li key={p} className="flex gap-2 items-start">
                              <span className="text-emerald-500 font-bold">&bull;</span>
                              <span className="leading-relaxed">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <span className="font-mono font-bold text-rose-400 flex items-center gap-1.5 text-[10px] tracking-wider uppercase">
                          <AlertTriangle className="h-4 w-4" /> BEAR CASE HEADWINDS
                        </span>
                        <ul className="space-y-2.5 text-slate-300 font-light">
                          {report.debate.cons.map((c) => (
                            <li key={c} className="flex gap-2 items-start">
                              <span className="text-rose-500 font-bold">&bull;</span>
                              <span className="leading-relaxed">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-[#030712]/50 border border-border/30 rounded-lg p-4 text-xs text-slate-300 leading-relaxed font-mono">
                      <span className="text-[9px] font-mono text-white block mb-1.5 font-bold uppercase tracking-wider">Debate Consensus Summary:</span>
                      <p className="font-light">{report.debate.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side Column (1-Span) */}
                <div className="lg:col-span-1 space-y-8">
                  {/* Confidence meter gauge dial */}
                  <ConfidenceGauge score={report.confidenceScore} label={report.recommendation} />

                  {/* Score explainability matrix */}
                  <ExplainableAI 
                    scores={report.scores} 
                    combinedScore={report.combinedScore} 
                    recommendation={report.recommendation} 
                  />

                  {/* Risk Warning Box */}
                  <div className={`glass-panel p-6 rounded-xl border-l-4 space-y-4 ${
                    report.risk.score >= 60 ? "border-l-rose-500" : "border-l-amber-500"
                  }`}>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4.5 w-4.5 ${
                        report.risk.score >= 60 ? "text-rose-500" : "text-amber-500"
                      }`} />
                      <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                        Risk stress warning: {report.risk.score}/100
                      </h4>
                    </div>
                    
                    <div className="text-[11px] space-y-4 font-light text-slate-300 leading-normal">
                      <div className="space-y-0.5">
                        <span className="text-white block font-mono text-[9px] uppercase tracking-wider">Corporate Operations Risks</span>
                        <p className="font-light">{report.risk.businessRisks.join(", ")}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-white block font-mono text-[9px] uppercase tracking-wider">Industry Structure Risks</span>
                        <p className="font-light">{report.risk.industryRisks.join(", ")}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-white block font-mono text-[9px] uppercase tracking-wider">Macroeconomic & Regulatory Risks</span>
                        <p className="font-light">{report.risk.regulatoryRisks.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Hedge Fund Mode opinion panel cards */}
              <div className="border-t border-border/20 pt-8">
                <HedgeFundPanel opinions={report.hedgeFundOpinions} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
