import { investmentAgentGraph } from "./src/lib/agents/graph";

async function runTestSwarm() {
  console.log("==================================================");
  console.log("STARTING AUTONOMOUS AI SWARM - TEST INVOCATION");
  console.log("==================================================");
  
  const initialState = {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    currentStep: "init",
    logs: ["Initializing console test channel..."],
    useRealLLM: false, // Runs simulation mode to test the pipeline structure
  };

  try {
    console.log("Invoking LangGraph Workflow for symbol: TSLA...");
    
    // Invoke the compiled LangGraph workflow
    const result = await investmentAgentGraph.invoke(initialState);
    
    console.log("\n==================================================");
    console.log("LIVE LOGS CAPTURED DURING EXECUTION:");
    console.log("==================================================");
    result.logs.forEach((log: string, idx: number) => {
      console.log(`${idx + 1}. ${log}`);
    });

    console.log("\n==================================================");
    console.log("SPECIALIST ADVISOR RATINGS:");
    console.log("==================================================");
    const ops = result.hedgeFundOpinions;
    console.log(`- Warren Buffett: ${ops.warrenBuffett.rating} (Score: ${ops.warrenBuffett.score}/100)`);
    console.log(`  Reason: "${ops.warrenBuffett.reasoning}"`);
    console.log(`- Peter Lynch:    ${ops.peterLynch.rating} (Score: ${ops.peterLynch.score}/100)`);
    console.log(`  Reason: "${ops.peterLynch.reasoning}"`);
    console.log(`- Ray Dalio:      ${ops.rayDalio.rating} (Score: ${ops.rayDalio.score}/100)`);
    console.log(`  Reason: "${ops.rayDalio.reasoning}"`);
    console.log(`- Cathie Wood:    ${ops.cathieWood.rating} (Score: ${ops.cathieWood.score}/100)`);
    console.log(`  Reason: "${ops.cathieWood.reasoning}"`);
    console.log(`- Risk Manager:   ${ops.riskManager.rating} (Score: ${ops.riskManager.score}/100)`);
    console.log(`  Reason: "${ops.riskManager.reasoning}"`);

    console.log("\n==================================================");
    console.log("COMMITTEE DEBATE SUMMARY:");
    console.log("==================================================");
    console.log(`Summary: ${result.debate.summary}`);
    console.log("Pros:", result.debate.pros.map((p: string) => `\n  - ${p}`).join(""));
    console.log("Cons:", result.debate.cons.map((c: string) => `\n  - ${c}`).join(""));

    console.log("\n==================================================");
    console.log("FINAL INVESTMENT DECISION:");
    console.log("==================================================");
    console.log(`Consensus Recommendation: ${result.recommendation}`);
    console.log(`Combined System Score:    ${result.combinedScore} / 100`);
    console.log(`Confidence Index:         ${result.confidenceScore} %`);
    console.log("==================================================");
    
    // Save report to verify DB service
    console.log("\nSaving research memo to database...");
    const { DbService } = require("./src/lib/db/db-service");
    await DbService.saveReport(result);
    console.log("✓ Report successfully cached in database.");
    
  } catch (error) {
    console.error("Swarm execution failed:", error);
  }
}

runTestSwarm();
