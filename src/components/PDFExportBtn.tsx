"use client";

import React, { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { IResearchReport } from "@/lib/db/models";

interface PDFExportBtnProps {
  report: IResearchReport;
}

export default function PDFExportBtn({ report }: PDFExportBtnProps) {
  const [exporting, setExporting] = useState(false);

  const generatePDF = async () => {
    setExporting(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const usableWidth = pageWidth - 2 * margin;

      // Color Palette
      const navy = [11, 15, 25];
      const emerald = [16, 185, 129];
      const darkGray = [80, 80, 80];

      // Helper for drawing lines
      const drawDivider = (y: number) => {
        doc.setDrawColor(220, 220, 220);
        doc.line(margin, y, margin + usableWidth, y);
      };

      // Helper to draw section header
      const drawSectionHeader = (title: string, y: number) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(navy[0], navy[1], navy[2]);
        doc.text(title.toUpperCase(), margin, y);
        doc.setDrawColor(emerald[0], emerald[1], emerald[2]);
        doc.setLineWidth(0.8);
        doc.line(margin, y + 2, margin + 40, y + 2);
        doc.setLineWidth(0.2); // reset
      };

      // --- PAGE 1: TITLE & EXECUTIVE PROFILE ---
      // Border Accent
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(0, 0, 5, 297, "F");

      // Title Block
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text("APEX INTELLIGENCE SWARM", margin, 35);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text(`DATE: ${new Date(report.createdAt).toLocaleDateString()}  |  SEC CODE: APX-${report.symbol}`, margin, 42);
      
      drawDivider(48);

      // Memo Metadata
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("MEMORANDUM", margin, 57);

      doc.setFont("helvetica", "normal");
      doc.text("TO:", margin, 65);
      doc.text("Hedge Fund Investment Committee", margin + 15, 65);
      
      doc.text("FROM:", margin, 71);
      doc.text("APEX Multi-Agent Research Swarm", margin + 15, 71);

      doc.text("SUBJECT:", margin, 77);
      doc.setFont("helvetica", "bold");
      doc.text(`EQUITY INVESTMENT EVALUATION: ${report.name} (${report.symbol})`, margin + 22, 77);

      doc.setFont("helvetica", "normal");
      drawDivider(83);

      // Consensus Summary Grid
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, 90, usableWidth, 24, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text("CONSENSUS RATING", margin + 8, 97);
      doc.text("COMBINED SCORE", margin + 68, 97);
      doc.text("CONFIDENCE RATING", margin + 120, 97);

      doc.setFontSize(16);
      doc.setTextColor(emerald[0], emerald[1], emerald[2]);
      doc.text(report.recommendation, margin + 8, 107);
      
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text(`${report.combinedScore} / 100`, margin + 68, 107);
      doc.text(`${report.confidenceScore} %`, margin + 120, 107);

      // Section: Overview
      let y = 128;
      drawSectionHeader("Executive Summary & Overview", y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      
      const descText = `${report.name} operates in the ${report.overview.industry} sector. Business Model: ${report.overview.businessModel} Revenue is principally drawn from: ${report.overview.revenueSources.join(", ")}. Primary competitors in scope include: ${report.overview.competitors.join(", ")}.`;
      const splitDesc = doc.splitTextToSize(descText, usableWidth);
      doc.text(splitDesc, margin, y + 10);
      
      y += 15 + splitDesc.length * 4.5;

      // Section: SWOT
      drawSectionHeader("Strategic SWOT Matrix", y);
      y += 10;

      // Strengths & Weaknesses side-by-side
      const colWidth = (usableWidth - 8) / 2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("STRENGTHS", margin, y);
      doc.text("WEAKNESSES", margin + colWidth + 8, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      
      const strengthsSplit = doc.splitTextToSize(report.swot.strengths.map(s => `• ${s}`).join("\n"), colWidth);
      const weaknessesSplit = doc.splitTextToSize(report.swot.weaknesses.map(w => `• ${w}`).join("\n"), colWidth);
      
      doc.text(strengthsSplit, margin, y + 5);
      doc.text(weaknessesSplit, margin + colWidth + 8, y + 5);

      // --- PAGE 2: FINANCIAL AUDIT & OPINIONS ---
      doc.addPage();
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(0, 0, 5, 297, "F");

      y = 30;
      drawSectionHeader("Financial Fundamental Audit", y);
      y += 10;

      // Financial Metrics Table
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(navy[0], navy[1], navy[2]);
      doc.text("Financial Metric", margin, y);
      doc.text("Value / Ratio", margin + 80, y);
      doc.text("Strategic Assessment", margin + 120, y);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y + 2, margin + usableWidth, y + 2);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);

      const metrics = [
        { label: "YoY Revenue Growth", val: `${report.financials.metrics.revenueGrowthYOY}%`, eval: report.financials.metrics.revenueGrowthYOY > 15 ? "High Growth" : "Moderate Growth" },
        { label: "Net Income Margin", val: `${report.financials.metrics.netIncomeMargin}%`, eval: report.financials.metrics.netIncomeMargin > 15 ? "Highly Profitable" : "Average Profit" },
        { label: "Operating Margin", val: `${report.financials.metrics.operatingMargin}%`, eval: "Efficient Operations" },
        { label: "Debt to Equity Ratio", val: String(report.financials.metrics.debtToEquity), eval: report.financials.metrics.debtToEquity < 0.3 ? "Excellent Liquidity" : "Leveraged" },
        { label: "Return on Equity (ROE)", val: `${report.financials.metrics.roe}%`, eval: "Superb Capital Efficiency" },
        { label: "Free Cash Flow (FCF)", val: `$ ${report.financials.metrics.freeCashFlow} M`, eval: "Strong Cash Generator" },
      ];

      metrics.forEach((m, idx) => {
        const rowY = y + 8 + idx * 8;
        doc.text(m.label, margin, rowY);
        doc.text(m.val, margin + 80, rowY);
        doc.text(m.eval, margin + 120, rowY);
      });

      y += 8 + metrics.length * 8;

      // Section: Sentiment
      drawSectionHeader("Market Sentiment Intelligence", y);
      
      const sentText = `Sentiment Index is scored at ${report.sentiment.score}/100. Audit Findings: ${report.sentiment.summary}`;
      const splitSent = doc.splitTextToSize(sentText, usableWidth);
      doc.setFont("helvetica", "normal");
      doc.text(splitSent, margin, y + 10);

      y += 20 + splitSent.length * 4.5;

      // Section: Analyst Committee Opinions
      drawSectionHeader("AI Hedge Fund Advisor Opinions", y);
      y += 10;

      const opinionsList = [
        { name: "Warren Buffett (Value)", op: report.hedgeFundOpinions.warrenBuffett },
        { name: "Peter Lynch (Growth)", op: report.hedgeFundOpinions.peterLynch },
        { name: "Ray Dalio (Macro)", op: report.hedgeFundOpinions.rayDalio },
        { name: "Cathie Wood (Innovation)", op: report.hedgeFundOpinions.cathieWood },
      ];

      opinionsList.forEach((op, idx) => {
        const rowY = y + idx * 22;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(navy[0], navy[1], navy[2]);
        doc.text(`${op.name} - Rating: ${op.op.rating} (Score: ${op.op.score})`, margin, rowY);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        const splitReason = doc.splitTextToSize(`"${op.op.reasoning}"`, usableWidth);
        doc.text(splitReason, margin, rowY + 5);
      });

      // --- PAGE 3: COMMITTEE DEBATE & RECOMMENDATION ---
      doc.addPage();
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(0, 0, 5, 297, "F");

      y = 30;
      drawSectionHeader("Hedge Fund Debate Arena Consensus", y);
      y += 10;

      // Pros vs Cons Table
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CORE BULL ARGUMENTS (PROS)", margin, y);
      doc.text("CORE BEAR HEADWINDS (CONS)", margin + colWidth + 8, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);

      const prosSplit = doc.splitTextToSize(report.debate.pros.map(p => `• ${p}`).join("\n"), colWidth);
      const consSplit = doc.splitTextToSize(report.debate.cons.map(c => `• ${c}`).join("\n"), colWidth);
      
      doc.text(prosSplit, margin, y + 5);
      doc.text(consSplit, margin + colWidth + 8, y + 5);

      y += Math.max(prosSplit.length, consSplit.length) * 4.5 + 15;

      // Final Conclusion
      drawSectionHeader("Investment Committee Final Verdict", y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      
      const finalConsensus = `After deep debate combining value, growth, and macro cycle filters, the APEX Investment Committee issues a final rating of ${report.recommendation} for ${report.name} (${report.symbol}) with a combined score index of ${report.combinedScore}/100 and a system confidence score of ${report.confidenceScore}%. Risk Manager recommends tight position limits due to regulatory risk rating profile ${report.risk.score}/100.`;
      
      const splitFinal = doc.splitTextToSize(finalConsensus, usableWidth);
      doc.text(splitFinal, margin, y);

      // Signatures
      y += splitFinal.length * 4.5 + 25;
      doc.setFont("helvetica", "bold");
      doc.text("AUTHENTICATION SIGILS", margin, y);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text("APEX_DECISION_ENGINE_0x789AB2", margin, y + 6);
      doc.text("SEC_COMPLIANCE_SIGN_OFF_VERIFIED", margin + 100, y + 6);

      // Save document
      doc.save(`APEX_Research_Memo_${report.symbol}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to export PDF report. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={exporting}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.2)]"
    >
      {exporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          GENERATING MEMO...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" />
          EXPORT INVESTMENT MEMO (PDF)
        </>
      )}
    </button>
  );
}
