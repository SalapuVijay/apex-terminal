import { DbService } from "@/lib/db/db-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allocation = await DbService.getLatestPortfolio();
    return Response.json({ success: true, allocation });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to fetch latest allocation" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { capital } = await req.json();
    const numericCapital = Number(capital);
    
    if (isNaN(numericCapital) || numericCapital <= 0) {
      return Response.json({ success: false, error: "Valid capital amount is required" }, { status: 400 });
    }

    // Professional Diversified Allocation Strategy
    // 35% Nvidia (NVDA) - Disruption/Growth
    // 30% Microsoft (MSFT) - Enterprise SaaS & Core AI Infrastructure
    // 20% Apple (AAPL) - Consumer Stickiness & Premium Services
    // 15% Reliance (RELIANCE) - Emerging Markets Proxy & Conglomerate Moat
    
    const allocations = [
      {
        symbol: "NVDA",
        percentage: 35,
        amount: Math.round(numericCapital * 0.35),
        reasoning: "De-facto monopoly in AI training and inference processors (GPUs). High gross margins (>75%) and a developer lock-in through the CUDA platform offer unparalleled growth potential."
      },
      {
        symbol: "MSFT",
        percentage: 30,
        amount: Math.round(numericCapital * 0.30),
        reasoning: "First-mover advantage in commercial generative AI with its OpenAI partnership. Multi-billion dollar Azure cloud business coupled with high-stickiness corporate Office licenses."
      },
      {
        symbol: "AAPL",
        percentage: 20,
        amount: Math.round(numericCapital * 0.20),
        reasoning: "World-class consumer product utility with a sticky ecosystem of 2.2B active devices. Massive services engine margins (App Store, iCloud) and strong share buyback track record."
      },
      {
        symbol: "RELIANCE",
        percentage: 15,
        amount: Math.round(numericCapital * 0.15),
        reasoning: "India's largest retail and telecom player (Jio). Perfect macro-economic proxy for emerging markets consumption growth, green energy pivot, and upcoming spin-off IPO unlocks."
      }
    ];

    const result = await DbService.savePortfolioAllocation(numericCapital, allocations);
    return Response.json({ success: true, allocation: result });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to generate allocation" }, { status: 500 });
  }
}
