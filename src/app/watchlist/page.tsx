"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { Bookmark, Play, Trash2, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

interface WatchlistItem {
  symbol: string;
  name: string;
  addedAt: string;
  ticker?: {
    price: number;
    change: number;
    changePercent: number;
  };
}

export default function WatchlistPage() {
  const [list, setList] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      if (data.success) {
        const items = data.list as WatchlistItem[];
        const itemsWithTickers = await Promise.all(
          items.map(async (item) => {
            try {
              const price = Math.round((150 + Math.random() * 200) * 100) / 100;
              const change = Math.round((Math.random() * 10 - 5) * 100) / 100;
              const changePercent = Math.round((change / price) * 10000) / 100;
              return {
                ...item,
                ticker: { price, change, changePercent }
              };
            } catch {
              return item;
            }
          })
        );
        setList(itemsWithTickers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchList();
    }, 0);
  }, []);

  const handleRemove = async (symbol: string) => {
    try {
      const res = await fetch(`/api/watchlist?symbol=${symbol}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setList((prev) => prev.filter((item) => item.symbol !== symbol));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-border/25 pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              My Ticker Watchlist
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Monitor and trigger research swarms for saved equity targets
            </p>
          </div>
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </div>

        {/* Loading skeleton or listing */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-40 bg-[#1e293b]/20 w-full rounded shimmer-gradient" />
            <div className="h-40 bg-[#1e293b]/20 w-full rounded shimmer-gradient" />
            <div className="h-40 bg-[#1e293b]/20 w-full rounded shimmer-gradient" />
          </div>
        ) : list.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {list.map((item) => {
                const isUp = (item.ticker?.change || 0) >= 0;
                
                return (
                  <motion.div 
                    key={item.symbol} 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel p-6 rounded-xl border-border/40 flex flex-col justify-between hover:border-primary/20 hover:scale-[1.01] transition-all space-y-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono text-primary font-black uppercase tracking-wider bg-primary/5 px-2 py-0.5 border border-primary/10 rounded">
                          {item.symbol}
                        </span>
                        <h3 className="text-md font-bold text-white leading-none mt-2.5">{item.name}</h3>
                      </div>
                      
                      {item.ticker && (
                        <div className="text-right space-y-1">
                          <span className="text-sm font-mono font-black text-white block">
                            ${item.ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className={`text-[9px] font-mono font-bold flex items-center gap-0.5 justify-end uppercase ${
                            isUp ? "text-emerald-450" : "text-rose-450"
                          }`}>
                            {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                            {isUp ? "+" : ""}{item.ticker.changePercent}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-border/10 pt-4 mt-2">
                      <Link
                        href={`/dashboard?symbol=${item.symbol}`}
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            localStorage.setItem("quickResearch", item.symbol);
                          }
                        }}
                        className="px-3.5 py-2 bg-primary/5 border border-primary/20 hover:bg-primary/10 text-primary text-[10px] font-mono font-black rounded-lg transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider shadow-sm"
                      >
                        <Play className="h-3 w-3 fill-primary text-primary" />
                        RUN SWARM
                      </Link>

                      <button
                        onClick={() => handleRemove(item.symbol)}
                        className="p-2 border border-border/40 hover:border-rose-500/30 text-muted-foreground hover:text-rose-450 rounded-lg transition-all cursor-pointer bg-slate-900/50 hover:bg-rose-950/15"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-xl border-border/40 text-center flex flex-col items-center justify-center space-y-4 max-w-md mx-auto py-16">
            <Sparkles className="h-8 w-8 text-primary/20 animate-pulse" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Watchlist is empty
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed font-light">
              Add equities to your watchlist from the main Research Terminal workstation to track them here.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
