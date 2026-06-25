"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  Activity, 
  CheckCircle,
  FileSpreadsheet,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const features = [
    {
      title: "Multi-Agent LangGraph Swarm",
      desc: "5+ specialized AI agents executing concurrent company research, financial analysis, news sentiment extraction, and SWOT assessments.",
      icon: Cpu,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30"
    },
    {
      title: "Hedge Fund Committee Mode",
      desc: "Simulate a live investment committee debate. Compare independent evaluations from Buffett, Lynch, Dalio, and Wood personas.",
      icon: Layers,
      color: "from-blue-500/20 to-indigo-500/20 text-cyan-400 border-cyan-500/10 hover:border-cyan-500/30"
    },
    {
      title: "Real-Time Log Stream",
      desc: "Watch agent execution live with Server-Sent Events. Pulse states change dynamically from thinking to complete.",
      icon: Activity,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/10 hover:border-amber-500/30"
    },
    {
      title: "Explainable AI Decision",
      desc: "Complete transparency with a weighted combined scoring index (Moat, Growth, Risk, Financials, Sentiment) and confidence levels.",
      icon: TrendingUp,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/10 hover:border-purple-500/30"
    },
    {
      title: "One-Click PDF Memo",
      desc: "Download formatted investment banking-grade reports detailing thesis, competitive grid, and valuation analysis in a click.",
      icon: FileSpreadsheet,
      color: "from-teal-500/20 to-cyan-500/20 text-teal-400 border-teal-500/10 hover:border-teal-500/30"
    },
    {
      title: "Portfolio Allocator",
      desc: "Input your capital sum to generate a diversified, AI-justified allocation strategy across top-tier equity selections.",
      icon: CheckCircle,
      color: "from-pink-500/20 to-rose-500/20 text-rose-400 border-rose-500/10 hover:border-rose-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col text-foreground font-sans">
      {/* Mesh Background Grid & Radial Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-80" />
      
      {/* Decorative Orbs */}
      <motion.div 
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="glow-orb top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10" 
      />
      <motion.div 
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="glow-orb bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10" 
      />
      <div className="glow-orb top-[40%] left-[35%] w-[400px] h-[400px] bg-purple-500/5" />

      {/* Top Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-border/20 relative z-10">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary animate-pulse" />
          <span className="text-md font-mono font-black tracking-widest bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            APEX TERMINAL
          </span>
        </div>
        <Link 
          href="/dashboard" 
          className="relative group overflow-hidden px-4 py-2 border border-primary/20 rounded-lg text-xs font-mono font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.05)] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <span>WORKSTATION</span> 
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/20 rounded-full bg-emerald-950/10 text-primary text-xs font-mono select-none"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="tracking-wide">Institutional-Grade multi-agent Swarm</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl"
          >
            The Autonomous{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AI Investment Committee
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-muted-foreground text-md sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed font-light"
          >
            Deploy specialized agent swarms to evaluate global equities. Compare Warren Buffett value reviews, Peter Lynch growth checks, and risk drawdowns in seconds.
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-primary text-[#020617] font-mono text-xs font-bold rounded-lg hover:bg-primary/95 transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              LAUNCH WORKSTATION <ArrowRight className="h-4.5 w-4.5" />
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border border-border bg-[#0b1329]/30 text-xs font-mono text-foreground font-semibold rounded-lg hover:bg-[#0b1329]/60 hover:text-white transition-all cursor-pointer"
            >
              EXPLORE SWARM ARCHITECTURE
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Showcase Section */}
      <section id="features" className="w-full max-w-7xl mx-auto px-6 py-28 border-t border-border/20 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-cyan-500/20 rounded-full bg-cyan-950/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            Pipeline Visualizations
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-none">
            Parallel processing via LangGraph
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto font-light leading-relaxed">
            Five specialized analyst agents run concurrently, executing quantitative financial models and risk calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-panel p-8 rounded-xl border flex flex-col bg-gradient-to-b ${feature.color} hover:scale-[1.01]`}
              >
                <div className="h-10 w-10 rounded-lg border border-border bg-[#020617] p-2 flex items-center justify-center mb-6">
                  <Icon className="h-full w-full" />
                </div>
                <h3 className="text-md font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border/20 py-8 bg-[#020617]/50 backdrop-blur-md mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[10px] text-muted-foreground font-mono gap-4">
          <div className="flex items-center gap-1.5">
            <span>&copy; {new Date().getFullYear()} APEX TERMINAL.</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">API Specification</span>
            <span className="hover:text-foreground cursor-pointer transition-colors font-bold text-primary flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> SEC COMPLIANT PORTAL
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
