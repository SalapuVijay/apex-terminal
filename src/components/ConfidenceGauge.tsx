"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  score: number; // 0 - 100
  label: string; // STRONG BUY, BUY, etc.
}

export default function ConfidenceGauge({ score, label }: ConfidenceGaugeProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  // SVG parameters
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getGaugeColorClass = (val: number) => {
    if (val >= 80) return "url(#gaugeEmerald)";
    if (val >= 60) return "url(#gaugeGreen)";
    if (val >= 40) return "url(#gaugeYellow)";
    return "url(#gaugeRed)";
  };

  const getTextColorClass = (lbl: string) => {
    if (lbl.includes("BUY")) return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
    if (lbl.includes("PASS")) return "text-rose-400 border-rose-500/20 bg-rose-500/5";
    return "text-yellow-400 border-yellow-500/20 bg-yellow-500/5";
  };

  return (
    <div className="glass-panel p-4.5 rounded-xl border-border/40 flex flex-col items-center justify-center space-y-3.5 text-center min-h-[190px]">
      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-black block">
        Consensus Confidence Gauge
      </span>

      <div className="relative flex items-center justify-center w-28 h-28">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <defs>
            {/* Color Gradients for Gauge */}
            <linearGradient id="gaugeEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="gaugeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="gaugeYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="gaugeRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          
          {/* Background circle track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#0f172a"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated active path */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={getGaugeColorClass(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
          <span className="text-2xl font-mono font-black text-white tracking-tighter">
            {score}%
          </span>
          <span className="text-[7px] font-mono text-muted-foreground uppercase tracking-widest font-black">
            CONFIDENCE
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider">Consensus recommendation</span>
        <span className={`text-[11px] font-mono font-black tracking-wider uppercase border px-2.5 py-1 rounded-lg shadow-sm ${getTextColorClass(label)}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
