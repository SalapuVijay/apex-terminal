"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { History, Eye, Sparkles } from "lucide-react";
import { IResearchReport } from "@/lib/db/models";

export default function HistoryPage() {
  const [reports, setReports] = useState<IResearchReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (data.success) {
        setReports(data.list);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchHistory();
    }, 0);
  }, []);

  const ratingColors: Record<string, string> = {
    "STRONG BUY": "text-emerald-400 bg-emerald-950/20 border-emerald-500/20",
    "BUY": "text-green-400 bg-green-950/15 border-green-500/20",
    "HOLD": "text-yellow-400 bg-yellow-950/15 border-yellow-500/20",
    "PASS": "text-rose-450 bg-rose-950/15 border-rose-500/20",
    "STRONG PASS": "text-rose-400 bg-rose-950/20 border-rose-500/25",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-border/25 pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Research Report History
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Browse previously compiled deep research memoranda stored in your database dossier
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>

        {/* Loading skeletons or list */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-40 bg-[#1e293b]/20 w-full rounded shimmer-gradient" />
            <div className="h-40 bg-[#1e293b]/20 w-full rounded shimmer-gradient" />
            <div className="h-40 bg-[#1e293b]/20 w-full rounded shimmer-gradient" />
          </div>
        ) : reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {reports.map((report, index) => (
                <motion.div 
                  key={report.symbol + report.createdAt} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass-panel p-6 rounded-xl border-border/40 flex flex-col justify-between hover:border-primary/20 hover:scale-[1.01] transition-all space-y-4 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-primary font-black uppercase tracking-wider bg-primary/5 px-2 py-0.5 border border-primary/10 rounded">
                        {report.symbol}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider font-bold">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-md font-bold text-white mt-1.5 leading-none">
                      {report.name}
                    </h3>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-[9px] px-2 py-0.5 border rounded-lg font-mono font-black uppercase tracking-wider ${ratingColors[report.recommendation]}`}>
                        {report.recommendation}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground font-bold">
                        Score: <span className="text-white font-black">{report.combinedScore}/100</span>
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border/10 pt-4 flex items-center justify-between">
                    <Link
                      href={`/dashboard?symbol=${report.symbol}`}
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.setItem("loadCachedReport", JSON.stringify(report));
                        }
                      }}
                      className="px-3.5 py-2 bg-primary/5 border border-primary/20 hover:bg-primary/10 text-primary text-[10px] font-mono font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
                    >
                      <Eye className="h-3.5 w-3.5 text-primary" />
                      REOPEN DOSSIER
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-xl border-border/40 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto py-16">
            <History className="h-8 w-8 text-primary/20 animate-pulse" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              No reports compiled
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-light">
              Use the main Research Terminal to compile your first equity dossier. Completed reports will be cached here automatically.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
