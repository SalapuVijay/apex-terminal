import { investmentAgentGraph } from "@/lib/agents/graph";
import { DbService } from "@/lib/db/db-service";
import { FinanceClient } from "@/lib/finance/client";
import { AgentState } from "@/lib/agents/state";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = (searchParams.get("symbol") || "TSLA").toUpperCase().trim();
  const useRealLLM = searchParams.get("useLLM") === "true";

  const encoder = new TextEncoder();

  // Create stream
  const customStream = new ReadableStream({
    async start(controller) {
      const sendEvent = (event: string, data: string) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
      };

      try {
        sendEvent("log", `Initiating Multi-Agent Swarm for ticker ${symbol}...`);
        
        // Fetch basic stock name
        const tickerInfo = await FinanceClient.getStockTicker(symbol);
        const reportTemplate = await FinanceClient.getResearchReport(symbol);
        const name = reportTemplate.name || `${symbol} Technologies Inc.`;

        // Initialize state
        let state: AgentState = {
          symbol,
          name,
          currentStep: "init",
          logs: [`Connecting to financial networks for ${name}...`],
          useRealLLM,
        };

        // Node descriptions mapping for frontend labels
        const nodeMetadata: Record<string, { title: string, label: string }> = {
          research_company: { title: "Company Research Agent", label: "Overview & Model" },
          analyze_financials: { title: "Financial Analyst Agent", label: "Metrics & Growth" },
          sentiment_analysis: { title: "Sentiment Analyst Agent", label: "News & Socials" },
          risk_analysis: { title: "Risk Officer Agent", label: "Threat Assessment" },
          evaluate_buffett: { title: "Warren Buffett (Value Analyst)", label: "Moat & Valuation" },
          evaluate_lynch: { title: "Peter Lynch (Growth Analyst)", label: "PEG & Simplicity" },
          evaluate_dalio: { title: "Ray Dalio (Macro Analyst)", label: "Leverage & Cycle" },
          evaluate_wood: { title: "Cathie Wood (Innovation Analyst)", label: "Disruption & Tech" },
          evaluate_risk_manager: { title: "Risk Manager Agent", label: "Stress Testing" },
          debate_committee: { title: "Debate Panel Arena", label: "Pros vs Cons Debate" },
          decision_engine: { title: "Final Consensus Committee", label: "Decision Score" },
        };

        // Run the graph as a stream statefully
        const stream = await investmentAgentGraph.stream(state);
        
        for await (const chunk of stream) {
          const nodeKey = Object.keys(chunk)[0];
          if (!nodeKey) continue;
          
          const nodeOutput = (chunk as any)[nodeKey];
          state = { ...state, ...nodeOutput };
          
          const meta = nodeMetadata[nodeKey] || { title: nodeKey, label: "Analysis" };
          
          // Send step event
          sendEvent("step", JSON.stringify({ activeNode: nodeKey, title: meta.title, label: meta.label }));
          
          // Send log event
          const latestLog = state.logs[state.logs.length - 1] || `${meta.title} completed.`;
          sendEvent("log", latestLog);
          
          // Add a minor artificial delay to allow visualizer step animations to display smoothly
          await new Promise((resolve) => setTimeout(resolve, 450));
        }

        // Aggregate scores and compile final report
        const finalReport = {
          symbol,
          name,
          recommendation: state.recommendation || "HOLD",
          confidenceScore: state.confidenceScore || 80,
          combinedScore: state.combinedScore || 75,
          scores: state.combinedScore ? {
            financials: state.financials?.healthScore || 75,
            growth: state.financials?.metrics.revenueGrowthYOY ? Math.min(100, Math.max(30, state.financials.metrics.revenueGrowthYOY * 4)) : 70,
            sentiment: state.sentiment?.score || 70,
            competitive: 80, // Default base competitive score
            risk: state.risk?.score || 45,
          } : reportTemplate.scores,
          overview: state.overview || reportTemplate.overview,
          financials: state.financials || reportTemplate.financials,
          sentiment: state.sentiment || reportTemplate.sentiment,
          swot: state.swot || reportTemplate.swot,
          risk: state.risk || reportTemplate.risk,
          hedgeFundOpinions: state.hedgeFundOpinions || reportTemplate.hedgeFundOpinions,
          debate: state.debate || reportTemplate.debate,
          createdAt: new Date(),
        };

        // Cache report in database (MongoDB or local JSON fallback)
        await DbService.saveReport(finalReport);

        // Send completion event
        sendEvent("done", JSON.stringify(finalReport));
        await new Promise((resolve) => setTimeout(resolve, 500));
        controller.close();
      } catch (err) {
        console.error("SSE stream failed:", err);
        sendEvent("error", err instanceof Error ? err.message : "Analysis failed");
        controller.close();
      }
    },
  });

  return new Response(customStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
