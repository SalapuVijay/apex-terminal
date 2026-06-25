"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Terminal, 
  ArrowLeftRight, 
  PieChart, 
  History, 
  Bookmark, 
  ShieldCheck, 
  Radio,
  Cpu,
  Layers,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  User,
  Clock
} from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
}

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function DashboardLayout({ children }: SidebarProps) {
  const pathname = usePathname();
  const [useLLM, setUseLLM] = useState<boolean>(false);
  const [dbStatus, setDbStatus] = useState<"connected" | "fallback">("fallback");
  const [time, setTime] = useState<string>("");

  // Live stock ticker state
  const [tickers, setTickers] = useState<TickerItem[]>([
    { symbol: "TSLA", price: 185.4, change: 1.2, changePercent: 0.65 },
    { symbol: "NVDA", price: 124.6, change: -2.3, changePercent: -1.81 },
    { symbol: "AAPL", price: 214.3, change: 0.85, changePercent: 0.4 },
    { symbol: "MSFT", price: 418.5, change: -1.1, changePercent: -0.26 },
    { symbol: "RELIANCE", price: 2950, change: 12.5, changePercent: 0.43 },
    { symbol: "TCS", price: 3820, change: -18.4, changePercent: -0.48 }
  ]);

  useEffect(() => {
    // Check if useLLM exists in storage
    const stored = localStorage.getItem("useLLM") === "true";
    if (stored) {
      setTimeout(() => {
        setUseLLM(true);
      }, 0);
    }

    // Query database status to update diagnostics indicator
    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.isMongo) {
          setDbStatus("connected");
        } else {
          setDbStatus("fallback");
        }
      })
      .catch(() => {
        setDbStatus("fallback");
      });

    // Update time clock
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simulated minor tick movements for the ribbon
    const tickerInterval = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const pct = (Math.random() * 0.4 - 0.2) / 100;
        const diff = t.price * pct;
        const newPrice = Math.round((t.price + diff) * 100) / 100;
        const change = Math.round((t.change + diff) * 100) / 100;
        const changePercent = Math.round((change / (t.price - change)) * 10000) / 100;
        return {
          ...t,
          price: newPrice,
          change,
          changePercent
        };
      }));
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(tickerInterval);
    };
  }, []);

  const navItems = [
    { name: "Research Terminal", href: "/dashboard", icon: Terminal },
    { name: "Compare Arena", href: "/compare", icon: ArrowLeftRight },
    { name: "Portfolio Simulator", href: "/portfolio", icon: PieChart },
    { name: "Research History", href: "/history", icon: History },
    { name: "My Watchlist", href: "/watchlist", icon: Bookmark },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020617] select-none text-foreground font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border/40 bg-[#080d1a]/85 flex flex-col backdrop-blur-xl z-20">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-border/20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 p-2 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Layers className="h-full w-full text-[#020617]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-widest bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent leading-none">
                APEX
              </span>
              <span className="text-[9px] font-mono text-muted-foreground tracking-wider mt-0.5 uppercase">
                INTELLIGENCE
              </span>
            </div>
          </Link>
          <span className="text-[9px] px-2 py-0.5 border border-primary/20 text-primary rounded bg-primary/5 font-mono font-bold uppercase">
            v1.0
          </span>
        </div>

        {/* Navigation Link list */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.06)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 transition-transform group-hover:scale-105 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* AI Engine Control Slider Panel */}
        <div className="p-4 border-t border-border/20 bg-[#030712]/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase">AI Engine</span>
            </div>
            <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wide uppercase ${useLLM ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" : "bg-primary/15 text-primary border border-primary/20"}`}>
              {useLLM ? "Gemini 2.5" : "Simulated"}
            </span>
          </div>
          
          <button
            onClick={() => {
              const nextVal = !useLLM;
              setUseLLM(nextVal);
              localStorage.setItem("useLLM", nextVal.toString());
            }}
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-850 border border-border/40 hover:border-primary/20 rounded-lg text-[10px] font-mono font-medium text-foreground hover:text-white transition-all cursor-pointer shadow-inner flex items-center justify-center gap-2"
          >
            {useLLM ? "Activate Simulator" : "Deploy Gemini 2.5 Pro"}
          </button>
        </div>

        {/* System Diagnostics Indicators */}
        <div className="p-4 border-t border-border/20 bg-[#020617]/90 space-y-2 font-mono text-[9px] text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Radio className="h-3 w-3 text-primary animate-pulse" />
              Swarm API Node
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Database className="h-3 w-3 text-cyan-400" />
              Database Storage
            </span>
            <span className={dbStatus === "connected" ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
              {dbStatus === "connected" ? "ATLAS CLOUD" : "LOCAL CACHE"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 text-primary" />
              Security Protocol
            </span>
            <span className="text-emerald-400 font-bold">SECURE</span>
          </div>
        </div>
      </aside>

      {/* Main Terminal Container Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#020617] relative z-10">
        
        {/* Real-time Ticker Ribbon Marquee */}
        <div className="h-9 bg-[#080d1a] border-b border-border/20 flex items-center overflow-hidden z-10">
          <div className="animate-marquee flex items-center gap-8 py-1.5 font-mono text-[10px]">
            {/* First Set of Tickers */}
            {tickers.concat(tickers).map((ticker, idx) => {
              const isUp = ticker.change >= 0;
              return (
                <div key={`${ticker.symbol}-${idx}`} className="flex items-center gap-2 px-1 select-none border-r border-border/10 pr-8">
                  <span className="text-white font-bold">{ticker.symbol}</span>
                  <span className="text-muted-foreground">${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className={`flex items-center font-bold ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                    {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {isUp ? "+" : ""}{ticker.changePercent}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workstation Header */}
        <header className="h-14 border-b border-border/20 bg-[#080d1a]/50 flex items-center justify-between px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
              WORKSTATION STREAMING / DIRECT PIPELINE CHANNEL ACTIVE
            </span>
          </div>
          
          <div className="flex items-center gap-6 font-mono text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>{time || "00:00:00"} L-TIME</span>
            </div>
            
            <div className="h-4 w-px bg-border/40" />

            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <User className="h-3 w-3 text-primary" />
              </div>
              <span className="text-white hover:text-primary transition-colors cursor-pointer">ADMIN_NODE</span>
            </div>

            <div className="h-4 w-px bg-border/40" />

            <Link 
              href="/"
              className="text-[10px] text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer uppercase"
            >
              Sign Out
            </Link>
          </div>
        </header>

        {/* Page Children Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
}
