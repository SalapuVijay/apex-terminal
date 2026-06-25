"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import { BarChart3 } from "lucide-react";

interface ChartDataPoint {
  year: string;
  revenue: number;
  profit: number;
}

interface FinancialChartsProps {
  data: ChartDataPoint[];
}

// Custom Glassmorphism Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-lg border border-border/80 text-[10px] font-mono space-y-1.5 shadow-2xl">
        <p className="text-white font-bold uppercase tracking-wider mb-1.5 border-b border-border/20 pb-1">
          FY Cycle: {label}
        </p>
        {payload.map((pld: any) => (
          <div key={pld.name} className="flex items-center gap-4 justify-between">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: pld.color || pld.stroke }} />
              {pld.name}:
            </span>
            <span className="text-white font-bold">
              {pld.name.includes("Margin") 
                ? `${pld.value}%` 
                : `$${pld.value.toLocaleString()} M`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function FinancialCharts({ data }: FinancialChartsProps) {
  const [activeMetric, setActiveMetric] = useState<"both" | "margin">("both");

  // Calculate margins
  const marginData = data.map((d) => ({
    year: d.year,
    margin: d.revenue > 0 ? Math.round((d.profit / d.revenue) * 1000) / 10 : 0,
    revenue: d.revenue,
    profit: d.profit
  }));

  return (
    <div className="glass-panel p-6 rounded-xl border-border/40 space-y-5">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/10 pb-4 gap-3">
        <div className="space-y-1">
          <h3 className="text-xs font-mono font-bold tracking-widest text-white uppercase flex items-center gap-2">
            <BarChart3 className="h-4.5 w-4.5 text-primary" />
            Historical Financial Trends
          </h3>
          <p className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
            Audited financial ratios over trailing fiscal cycles
          </p>
        </div>

        {/* Stripe-style Tab Controls */}
        <div className="flex gap-1 p-1 border border-border/30 bg-[#030712]/50 rounded-lg">
          <button
            onClick={() => setActiveMetric("both")}
            className={`px-3 py-1.5 rounded text-[9px] font-mono font-black tracking-wider uppercase transition-all cursor-pointer ${
              activeMetric === "both" 
                ? "bg-primary text-[#020617] shadow-lg" 
                : "text-muted-foreground hover:text-white"
            }`}
          >
            REV vs PROFIT
          </button>
          <button
            onClick={() => setActiveMetric("margin")}
            className={`px-3 py-1.5 rounded text-[9px] font-mono font-black tracking-wider uppercase transition-all cursor-pointer ${
              activeMetric === "margin" 
                ? "bg-primary text-[#020617] shadow-lg" 
                : "text-muted-foreground hover:text-white"
            }`}
          >
            NET MARGIN %
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === "both" ? (
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Neon gradient definitions */}
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="#64748b" 
                tick={{ fontSize: 9, fontFamily: "monospace", fontWeight: "bold" }} 
                tickLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 9, fontFamily: "monospace", fontWeight: "bold" }} 
                tickFormatter={(val) => `$${(val / 1000).toFixed(1)}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.015)" }} />
              <Legend 
                wrapperStyle={{ fontSize: 10, fontFamily: "monospace", paddingTop: 12, fontWeight: "bold", textTransform: "uppercase" }}
                iconType="circle"
                iconSize={8}
              />
              {/* Glow Area under revenue */}
              <Area
                type="monotone"
                dataKey="revenue"
                fill="url(#colorRevenue)"
                stroke="none"
              />
              <Bar 
                dataKey="revenue" 
                name="Revenue (M)" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={20} 
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                name="Net Profit (M)" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={{ stroke: "#10b981", strokeWidth: 2, r: 3, fill: "#020617" }}
                activeDot={{ stroke: "#34d399", strokeWidth: 2, r: 5, fill: "#020617" }}
              />
            </ComposedChart>
          ) : (
            <ComposedChart data={marginData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="#64748b" 
                tick={{ fontSize: 9, fontFamily: "monospace", fontWeight: "bold" }} 
                tickLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 9, fontFamily: "monospace", fontWeight: "bold" }} 
                tickFormatter={(val) => `${val}%`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.015)" }} />
              <Legend 
                wrapperStyle={{ fontSize: 10, fontFamily: "monospace", paddingTop: 12, fontWeight: "bold", textTransform: "uppercase" }}
                iconType="circle"
                iconSize={8}
              />
              <Area
                type="monotone"
                dataKey="margin"
                fill="url(#colorMargin)"
                stroke="none"
              />
              <Line 
                type="monotone" 
                dataKey="margin" 
                name="Net Margin %" 
                stroke="#f59e0b" 
                strokeWidth={2} 
                dot={{ stroke: "#f59e0b", strokeWidth: 2, r: 3, fill: "#020617" }}
                activeDot={{ stroke: "#fbbf24", strokeWidth: 2, r: 5, fill: "#020617" }}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
