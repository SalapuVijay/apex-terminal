"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Wallet, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";
import { IPortfolioAllocation } from "@/lib/db/models";

// Custom Glassy Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass-panel p-3 rounded-lg border border-border/80 text-[10px] font-mono shadow-2xl space-y-1">
        <p className="text-white font-bold">{data.name}</p>
        <p className="text-primary font-bold">₹{payload[0].value.toLocaleString()}</p>
        <p className="text-muted-foreground">{data.percentage}% of portfolio</p>
      </div>
    );
  }
  return null;
};

export default function PortfolioSimulator() {
  const [capital, setCapital] = useState("100000");
  const [loading, setLoading] = useState(false);
  const [allocation, setAllocation] = useState<IPortfolioAllocation | null>(null);
  const [error, setError] = useState("");

  const COLORS = ["#10b981", "#06b6d4", "#f59e0b", "#a855f7"];

  const fetchLatestAllocation = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.success && data.allocation) {
        setAllocation(data.allocation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchLatestAllocation();
    }, 0);
  }, []);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capital: Number(capital) })
      });
      const data = await res.json();
      if (data.success) {
        setAllocation(data.allocation);
      } else {
        setError(data.error || "Failed to generate allocation");
      }
    } catch {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const chartData = allocation?.allocations.map((item) => ({
    name: item.symbol,
    value: item.amount,
    percentage: item.percentage
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-border/25 pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Portfolio Allocation Simulator
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Optimize capital deployment across top-performing assets using AI consensus model
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-xl border-border/40 space-y-4">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2">
                Simulation settings
              </h3>

              <form onSubmit={handleSimulate} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono font-black text-muted-foreground tracking-widest uppercase block">
                    INVESTMENT CAPITAL AMOUNT (INR / USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-muted-foreground font-mono text-xs">₹</span>
                    <input
                      type="number"
                      placeholder="e.g. 100000"
                      value={capital}
                      onChange={(e) => setCapital(e.target.value)}
                      className="w-full bg-[#020617] border border-border/40 focus:border-primary/40 text-foreground font-mono text-xs rounded-lg pl-8 pr-4 py-3.5 outline-none transition-all"
                      min="1000"
                      required
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[10px] font-mono text-rose-400 flex items-center gap-1.5 bg-rose-950/10 border border-rose-500/20 p-2.5 rounded-lg"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading || !capital}
                  className="w-full py-3.5 bg-primary text-[#020617] font-mono text-xs font-bold rounded-lg hover:bg-primary/95 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.15)] flex items-center justify-center gap-2"
                >
                  {loading ? "COMPUTING OPTIMAL SPLIT..." : "RUN ALLOCATION MODEL"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="glass-panel p-6 rounded-xl border-border/40 text-xs leading-relaxed text-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-white font-mono font-bold text-[9px] uppercase tracking-widest">
                <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                SEC compliance guidelines
              </div>
              <p className="font-light leading-relaxed">
                Suggested allocation sizes are computed from weighted advisor consensus scorecards. Perform independent audit and diligence before executing real order flows.
              </p>
            </div>
          </div>

          {/* Allocation Output Panel */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {allocation ? (
                <motion.div 
                  key={allocation.createdAt ? allocation.createdAt.toString() : "new-portfolio"}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                >
                  {/* Recharts allocation pie chart */}
                  <div className="glass-panel p-6 rounded-xl border-border/40 flex flex-col items-center justify-center h-full min-h-[300px]">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-black mb-3 block">
                      Target Distribution Map
                    </span>
                    
                    <div className="h-56 w-full relative z-10">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="45%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#020617" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomPieTooltip />} />
                          <Legend 
                            wrapperStyle={{ fontSize: 9, fontFamily: "monospace", fontWeight: "bold", paddingTop: 10 }} 
                            iconType="circle"
                            iconSize={7}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Allocation details cards */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-border/10 pb-2">
                      Detailed Asset Split
                    </h3>

                    <div className="space-y-3">
                      {allocation.allocations.map((item, idx) => (
                        <div 
                          key={item.symbol} 
                          className="glass-panel p-4 rounded-xl border-border/40 bg-[#080d1a]/20 hover:border-emerald-500/20 transition-all space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span 
                                className="h-2.5 w-2.5 rounded-full" 
                                style={{ backgroundColor: COLORS[idx % COLORS.length] }} 
                              />
                              <span className="font-mono font-black text-white text-xs">{item.symbol}</span>
                            </div>
                            <span className="text-[11px] font-mono text-primary font-bold">
                              {item.percentage}% &bull; ₹{item.amount.toLocaleString()}
                            </span>
                          </div>

                          {/* Mini visual indicator percentage tracker bar */}
                          <div className="h-1 bg-[#020617] border border-border/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                              style={{ 
                                backgroundColor: COLORS[idx % COLORS.length],
                                width: `${item.percentage}%` 
                              }}
                            />
                          </div>

                          <p className="text-[10px] text-slate-350 leading-relaxed font-light font-sans">
                            {item.reasoning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel p-12 rounded-xl border-border/40 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]"
                >
                  <Sparkles className="h-8 w-8 text-primary/20 animate-pulse" />
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                    No simulation generated
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-light">
                    Input your targeted investment capital on the left settings console to execute the allocation optimizer model.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
