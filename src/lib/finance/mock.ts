import { IResearchReport } from "../db/models";

// Define a dictionary of rich mock data for major companies
export const MOCK_STOCKS: Record<string, Omit<IResearchReport, "createdAt">> = {
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    recommendation: "BUY",
    confidenceScore: 84,
    combinedScore: 78,
    scores: {
      financials: 72,
      growth: 88,
      sentiment: 81,
      competitive: 85,
      risk: 65,
    },
    overview: {
      industry: "Automotive & Clean Energy",
      businessModel: "Vertical integration of electric vehicles, energy storage, solar technology, and autonomous driving software (FSD).",
      revenueSources: ["Automotive Sales & Leasing (82%)", "Energy Generation & Storage (11%)", "Services & Other (7%)"],
      marketPosition: "Global pioneer and market leader in electric passenger cars with massive production scale advantages.",
      competitors: ["BYD Company", "Nio", "General Motors", "Ford Motor", "Volkswagen Group", "Rivian"],
    },
    financials: {
      healthScore: 75,
      metrics: {
        revenueGrowthYOY: 18.5,
        netIncomeMargin: 11.2,
        operatingMargin: 14.1,
        epsGrowth: 15.2,
        debtToEquity: 0.08,
        freeCashFlow: 4400, // In Millions USD
        roe: 19.8,
        roa: 12.5,
      },
      chartData: [
        { year: "2021", revenue: 53823, profit: 5644 },
        { year: "2022", revenue: 81462, profit: 12587 },
        { year: "2023", revenue: 96773, profit: 14997 },
        { year: "2024", revenue: 98150, profit: 13420 },
        { year: "2025 (Est)", revenue: 114200, profit: 16100 },
      ],
    },
    sentiment: {
      score: 81,
      summary: "Highly positive retail sentiment driven by Full Self-Driving (FSD) advancements and energy storage growth, offset by near-term EV price competition and CEO key-person risk.",
      sources: [
        { source: "News", title: "Tesla Robotaxi event signals future autonomous shift", sentiment: "positive" },
        { source: "Reddit", title: "FSD v12 is actually insane, drives like a human", sentiment: "positive" },
        { source: "News", title: "EV price wars squeeze Tesla margins in European market", sentiment: "negative" },
        { source: "Twitter", title: "Megapack deployments are expanding exponentially", sentiment: "positive" },
      ],
    },
    swot: {
      strengths: [
        "Unrivaled brand equity and consumer loyalty in the EV space.",
        "Vertical integration including battery tech and direct sales model.",
        "Industry-leading manufacturing margins and cost structure.",
        "Proprietary Supercharger network acting as a massive moat."
      ],
      weaknesses: [
        "Premium pricing makes it vulnerable to low-cost Chinese competitors.",
        "High reliance on CEO Elon Musk's public image and attention split.",
        "Cyclical manufacturing bottlenecks and product delays (e.g. Cybertruck scale-up)."
      ],
      opportunities: [
        "Full Self-Driving (FSD) licensing to other major automakers.",
        "Rapid expansion of Tesla Energy (Megapacks and Powerwalls).",
        "Introduction of a low-cost $25,000 Next-Gen EV platform."
      ],
      threats: [
        "Aggressive margin pressure from Chinese EV giants like BYD.",
        "Regulatory delays for fully autonomous passenger vehicles.",
        "Slowing global EV adoption rate and rising interest rates."
      ],
    },
    risk: {
      score: 65, // Lower means safer, higher means riskier
      businessRisks: ["EV price compression due to intense domestic and foreign competition.", "Substantial capital requirements to scale battery factories."],
      industryRisks: ["Global supply chain shocks in lithium, cobalt, and nickel.", "Subsidies phase-out in major US and European markets."],
      economicRisks: ["Macroeconomic slowdown damping consumer discretionary purchases for luxury cars."],
      regulatoryRisks: ["Safety probes into Autopilot and FSD systems by NHTSA.", "Carbon credit policy shifts."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: "PASS",
        score: 45,
        reasoning: "Tesla lacks a traditional value moat. The auto industry is notoriously capital-intensive, cyclical, and competitive. Elon Musk is a brilliant leader, but value investing demands predictability, steady cash flows, and cheap earnings multiples. TSLA's current valuation remains highly speculative.",
      },
      peterLynch: {
        rating: "BUY",
        score: 82,
        reasoning: "Tesla exhibits classic characteristics of a fast-growing pioneer. Revenue growth over 5 years is superb, debt is incredibly low, and cash flow is robust. The PEG ratio is elevated but supported by the huge energy storage potential. If they execute on the cheaper platform, this stock can compound further.",
      },
      rayDalio: {
        rating: "HOLD",
        score: 68,
        reasoning: "From a macro standpoint, Tesla is well-positioned for the green energy transition. However, rising US-China tensions introduce major supply chain and sales vulnerabilities, given their massive Shanghai gigafactory. Leverage is low, which is excellent in a credit cycle contraction, but systemic auto sector risks remain.",
      },
      cathieWood: {
        rating: "STRONG BUY",
        score: 98,
        reasoning: "Tesla is not a car company; it is an AI, robotics, and energy platform. Autonomous ride-hailing represents an $8-10 trillion addressable market, and Tesla is years ahead in neural network training compute. Combining FSD software, Optimus humanoid robots, and Megapacks, TSLA is the ultimate disruptive innovator.",
      },
      riskManager: {
        rating: "PASS",
        score: 55,
        reasoning: "NHTSA regulatory reviews of Autopilot represent a critical downside tail risk. Volatility (Beta > 1.8) makes it a difficult fit for standard risk-adjusted portfolios. Keep position sizes minimal and hedged.",
      },
    },
    debate: {
      pros: [
        "Clean balance sheet with virtually zero net debt.",
        "Unmatched data advantages for training autonomous driving systems.",
        "Energy division is growing faster than the automotive segment."
      ],
      cons: [
        "Trading at an earnings multiple far higher than any traditional automaker.",
        "Margin contraction from 20% to mid-teens due to price reductions.",
        "Musk's engagement across Twitter, SpaceX, xAI, and Neuralink."
      ],
      summary: "The debate centers on whether Tesla should be valued as a legacy automotive manufacturer or a high-margin AI/Robotics software compounder.",
    },
  },
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    recommendation: "STRONG BUY",
    confidenceScore: 92,
    combinedScore: 89,
    scores: {
      financials: 94,
      growth: 96,
      sentiment: 90,
      competitive: 95,
      risk: 70,
    },
    overview: {
      industry: "Semiconductors & AI Computing",
      businessModel: "Design of Graphics Processing Units (GPUs), Tensor Core processors, and unified software (CUDA) for Artificial Intelligence, data centers, gaming, and professional visualization.",
      revenueSources: ["Data Center & AI Compute (85%)", "Gaming & Graphics (10%)", "Professional Visualization & OEM (3%)", "Automotive AI (2%)"],
      marketPosition: "De-facto monopoly in AI training and inference hardware with over 90% market share in enterprise-grade AI processors.",
      competitors: ["AMD", "Intel", "Google (TPUs)", "Amazon (Trainium)", "Meta (MTIA)"],
    },
    financials: {
      healthScore: 94,
      metrics: {
        revenueGrowthYOY: 125.4,
        netIncomeMargin: 48.8,
        operatingMargin: 54.1,
        epsGrowth: 132.8,
        debtToEquity: 0.12,
        freeCashFlow: 27000,
        roe: 62.4,
        roa: 41.2,
      },
      chartData: [
        { year: "2021", revenue: 26914, profit: 9752 },
        { year: "2022", revenue: 30974, profit: 4368 },
        { year: "2023", revenue: 60922, profit: 29760 },
        { year: "2024", revenue: 96300, profit: 53000 },
        { year: "2025 (Est)", revenue: 120000, profit: 68000 },
      ],
    },
    sentiment: {
      score: 90,
      summary: "Incredibly strong sentiment driven by the unstoppable AI infrastructure buildout. Tech giants are ordering hundreds of thousands of Blackwell GPUs, and enterprise demand shows zero signs of abating.",
      sources: [
        { source: "Bloomberg", title: "Nvidia CEO claims Blackwell demand is insane", sentiment: "positive" },
        { source: "News", title: "Hyperscalers commit to higher AI infrastructure CAPEX in 2026", sentiment: "positive" },
        { source: "Reddit", title: "Nvidia CUDA is the real moat, AMD ROCm is too far behind", sentiment: "positive" },
        { source: "News", title: "US export restrictions on AI chips to China pose export headwinds", sentiment: "negative" },
      ],
    },
    swot: {
      strengths: [
        "Unbeatable software moat in CUDA, which lock developers into Nvidia hardware.",
        "Advanced networking integration (Mellanox InfiniBand) optimizing server communications.",
        "Exceptional profitability with gross margins exceeding 75%.",
        "Fastest innovation cycle in the industry (annual new architecture releases)."
      ],
      weaknesses: [
        "High customer concentration, with the top 4 cloud providers accounting for 40% of sales.",
        "Complete reliance on TSMC in Taiwan for high-end silicon fabrication.",
        "Vulnerable to cyclical demand resets if AI application revenues fail to match CAPEX."
      ],
      opportunities: [
        "Expansion of sovereign AI computing initiatives globally.",
        "Growth of autonomous driving chips (Orin/Thor) for next-gen vehicles.",
        "NVIDIA AI Enterprise software licensing acting as high-margin recurring revenue."
      ],
      threats: [
        "Geopolitical conflict in the Taiwan Strait disrupting TSMC production.",
        "In-house custom silicon programs from primary customers (Google, Amazon, Meta).",
        "Severe US export control expansions limiting trade with Asian countries."
      ],
    },
    risk: {
      score: 70,
      businessRisks: ["Geopolitical supply chain vulnerability in Taiwan.", "High expectations baked into a triple-digit price-to-earnings expansion."],
      industryRisks: ["Potential cooling of the AI infrastructure cycle.", "Rapid chip design changes making past nodes obsolete."],
      economicRisks: ["Global microchip supply imbalances causing temporary inventory drawdowns."],
      regulatoryRisks: ["Anti-trust scrutiny regarding CUDA packaging and supply allocations."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: "HOLD",
        score: 65,
        reasoning: "Nvidia has a marvelous moat in CUDA, but the semiconductor business is historically highly cyclical. While their pricing power is phenomenal right now, it invites massive capital chasing alternatives. I prefer companies that don't depend on rapid technological revolutions to remain profitable, though their ROE is undeniable.",
      },
      peterLynch: {
        rating: "STRONG BUY",
        score: 94,
        reasoning: "This is a superstar stock. 125% YoY revenue growth paired with nearly 50% net income margin is something you rarely see. They are selling the picks and shovels in a gold rush. Even better, their free cash flow yields are backed by immediate cash, not accounting tricks. Hold onto your winners.",
      },
      rayDalio: {
        rating: "BUY",
        score: 80,
        reasoning: "Nvidia is the core driver of the current global tech productivity cycle. Financially, they have built a massive cash war chest and have zero credit leverage concerns. Geopolitics is the singular massive risk here; any issue with TSMC halts Nvidia. Diversified sizing is required.",
      },
      cathieWood: {
        rating: "STRONG BUY",
        score: 99,
        reasoning: "Nvidia Blackwell is the foundation of the multi-trillion dollar cognitive AI revolution. CUDA is an impenetrable developer barrier. As agentic AI starts writing code, demand for GPU clusters will increase by orders of magnitude. Nvidia is the defining platform of this decade.",
      },
      riskManager: {
        rating: "HOLD",
        score: 60,
        reasoning: "Extreme valuation multiple and highly concentrated revenue client profiles. Keep position size capped at a moderate percentage, using stop-losses to guard against a sudden sector-wide AI CAPEX correction.",
      },
    },
    debate: {
      pros: [
        "Unbeatable ecosystem lock-in through the CUDA platform.",
        "Massive free cash flow creation allowing share buybacks and R&D.",
        "Dominant supply contracts locked in for the next 18 months."
      ],
      cons: [
        "Severe geographic risk with 100% of advanced packaging at TSMC.",
        "Hyperscale clients are building competitive internal chips.",
        "Valuation leaves zero margin for execution errors."
      ],
      summary: "The debate hinges on whether Nvidia can maintain its 90% market share and high margins as big tech attempts to diversify GPU purchases.",
    },
  },
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    recommendation: "BUY",
    confidenceScore: 88,
    combinedScore: 82,
    scores: {
      financials: 88,
      growth: 72,
      sentiment: 85,
      competitive: 94,
      risk: 45,
    },
    overview: {
      industry: "Consumer Electronics & Services",
      businessModel: "Design and marketing of mobile communication and media devices, personal computers, and portable digital music players. Monets services like the App Store, Apple Music, iCloud, and Apple Pay.",
      revenueSources: ["iPhone sales (52%)", "High-margin Services (23%)", "Mac computers (8%)", "Wearables, Home & Accessories (9%)", "iPad (8%)"],
      marketPosition: "Premium global brand with an active installed base of over 2.2 billion devices, forming an incredibly sticky hardware-software ecosystem.",
      competitors: ["Samsung", "Google", "Microsoft", "Huawei", "Xiaomi"],
    },
    financials: {
      healthScore: 88,
      metrics: {
        revenueGrowthYOY: 6.2,
        netIncomeMargin: 25.8,
        operatingMargin: 30.2,
        epsGrowth: 9.4,
        debtToEquity: 1.4, // Apple has high debt but supported by massive cash reserves
        freeCashFlow: 104000,
        roe: 145.2, // Boosted by aggressive share buybacks
        roa: 29.5,
      },
      chartData: [
        { year: "2021", revenue: 365817, profit: 94680 },
        { year: "2022", revenue: 394328, profit: 99803 },
        { year: "2023", revenue: 383285, profit: 96995 },
        { year: "2024", revenue: 391000, profit: 100900 },
        { year: "2025 (Est)", revenue: 412000, profit: 108000 },
      ],
    },
    sentiment: {
      score: 85,
      summary: "Strong sentiment fueled by 'Apple Intelligence' AI features driving an iPhone upgrade cycle. High recurring services revenue creates a very stable cash flow profile.",
      sources: [
        { source: "News", title: "Apple Intelligence rollout triggers wave of new upgrades", sentiment: "positive" },
        { source: "News", title: "EU antitrust laws target App Store fee monopoly", sentiment: "negative" },
        { source: "Reddit", title: "Apple ecosystem makes it impossible to switch to Android", sentiment: "positive" },
        { source: "Bloomberg", title: "Apple's stock buybacks reach record high of $110B", sentiment: "positive" },
      ],
    },
    swot: {
      strengths: [
        "Incredibly high customer retention rates and ecosystem switching costs.",
        "Unrivaled brand pricing power in consumer electronics.",
        "Massive services cash machine growing at double digits.",
        "Proprietary silicon (M-series and A-series) giving hardware efficiency benefits."
      ],
      weaknesses: [
        "Heavy reliance on China for hardware manufacturing assembly.",
        "Slow initial entry into generative AI compared to competitors.",
        "Slowing overall hardware growth rates (iPhone saturating)."
      ],
      opportunities: [
        "Apple Intelligence features boosting iPhone sales in late 2025/2026.",
        "Expansion of health, financial, and VR/AR (Vision Pro) services.",
        "Strategic supply chain diversification to India and Vietnam."
      ],
      threats: [
        "Increasing global regulatory crackdowns on App Store commission rates.",
        "Trade tensions between the United States and China.",
        "Slowing consumer spending on premium electronics during high inflation."
      ],
    },
    risk: {
      score: 45,
      businessRisks: ["App Store fee structure regulations.", "Supply chain disruptions in major manufacturing centers."],
      industryRisks: ["Saturating global smartphone markets.", "Longer upgrade cycles by consumers."],
      economicRisks: ["FX headwinds from strong dollar.", "Inflationary pressures squeezing discretionary budgets."],
      regulatoryRisks: ["DOJ antitrust lawsuit alleging monopoly power in smartphone markets."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: "STRONG BUY",
        score: 95,
        reasoning: "Apple is perhaps the best business in the world. It is not a technology company; it's a consumer product company with an incredibly sticky ecosystem. The iPhone is a utility that people will give up their second car before giving up. The return of capital through massive buybacks is unmatched, and the moat is incredibly wide.",
      },
      peterLynch: {
        rating: "BUY",
        score: 80,
        reasoning: "Apple's fast-growth era has transitioned into a highly profitable compounding era. High gross margins (45%+) and recurring Services revenues are wonderful assets. Although the PEG ratio is higher because growth has slowed, the share buybacks continuously reduce share count, lifting EPS. A very safe hold.",
      },
      rayDalio: {
        rating: "BUY",
        score: 85,
        reasoning: "Apple's balance sheet is incredibly secure. While their debt load looks high on paper, their cash and liquid investments are gargantuan. They face geopolitical friction in China, which is why they are diversifying to India. From a global portfolio standpoint, Apple is a resilient cornerstone asset.",
      },
      cathieWood: {
        rating: "HOLD",
        score: 60,
        reasoning: "Apple is a tech giant that risks falling behind in the AI race. Apple Intelligence relies largely on partnerships (like OpenAI). They are buyback-heavy rather than allocating capital to massive frontier model research. While their consumer reach is vast, their innovation engine is showing signs of maturity.",
      },
      riskManager: {
        rating: "BUY",
        score: 85,
        reasoning: "Low beta volatility (~1.1) and massive cash flow yield make Apple an excellent defensive asset. Regulatory risks are high but will play out over years, allowing Apple to adapt. Safe allocation recommended.",
      },
    },
    debate: {
      pros: [
        "Stable, highly profitable services division growing at 12%+.",
        "Unbeatable brand equity and customer ecosystem locking.",
        "Aggressive return of capital (dividends + buybacks)."
      ],
      cons: [
        "Regulatory suits from US and EU threating App Store margins.",
        "Growth is slow compared to other cloud-native big tech peers.",
        "Highly exposed to China supply chain issues."
      ],
      summary: "The debate centers on whether Apple Intelligence can spark a multi-year iPhone upgrade supercycle to revive hardware growth.",
    },
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    recommendation: "STRONG BUY",
    confidenceScore: 94,
    combinedScore: 91,
    scores: {
      financials: 92,
      growth: 86,
      sentiment: 92,
      competitive: 95,
      risk: 40,
    },
    overview: {
      industry: "Software & Cloud Services",
      businessModel: "Licensing and support of software, services, devices, and solutions. Strong cloud presence through Azure, enterprise productivity tools (Office 365), and commercial AI integrations (Copilot).",
      revenueSources: ["Cloud & Azure Services (43%)", "Productivity & Business Processes (31%)", "Personal Computing & Gaming (26%)"],
      marketPosition: "Market leader in enterprise software and secondary cloud infrastructure, with first-mover advantage in commercial generative AI.",
      competitors: ["Amazon (AWS)", "Google (GCP)", "Salesforce", "Oracle", "Sony (Gaming)"],
    },
    financials: {
      healthScore: 92,
      metrics: {
        revenueGrowthYOY: 15.6,
        netIncomeMargin: 35.2,
        operatingMargin: 42.8,
        epsGrowth: 18.1,
        debtToEquity: 0.28,
        freeCashFlow: 68000,
        roe: 38.5,
        roa: 19.8,
      },
      chartData: [
        { year: "2021", revenue: 168088, profit: 61271 },
        { year: "2022", revenue: 198270, profit: 72738 },
        { year: "2023", revenue: 211915, profit: 72361 },
        { year: "2024", revenue: 245000, profit: 88000 },
        { year: "2025 (Est)", revenue: 282000, profit: 102000 },
      ],
    },
    sentiment: {
      score: 92,
      summary: "Highly positive sentiment driven by Azure Cloud acceleration and successful monetization of Copilot subscriptions. Their investment in OpenAI continues to pay massive dividends.",
      sources: [
        { source: "News", title: "Azure outpaces AWS in quarterly cloud growth rate", sentiment: "positive" },
        { source: "News", title: "Microsoft Copilot reaches 50 million corporate active users", sentiment: "positive" },
        { source: "Reddit", title: "Enterprise IT is standardizing on MSFT AI integrations", sentiment: "positive" },
        { source: "Bloomberg", title: "Microsoft plans massive $50B data center capital expansion", sentiment: "positive" },
      ],
    },
    swot: {
      strengths: [
        "Dominant monopoly in corporate OS and productivity office software.",
        "Azure Cloud growth with deep enterprise distribution networks.",
        "Direct equity partnership with OpenAI providing first-mover advantage.",
        "Very low cost of capital and stellar AAA-rated credit rating."
      ],
      weaknesses: [
        "Dependence on OpenAI's structural organization and leadership stability.",
        "High CAPEX demands to build and run AI data centers.",
        "Integration struggles with large acquisitions (e.g. Activision Blizzard)."
      ],
      opportunities: [
        "Standardizing Microsoft Copilot across all Windows corporate installs.",
        "Expanding cyber-security solutions for multi-cloud corporate systems.",
        "Scaling gaming services through Xbox cloud streaming."
      ],
      threats: [
        "Antitrust investigations regarding cloud software bundling practices.",
        "Aggressive cloud competition from AWS and Google Cloud.",
        "Security breaches undermining corporate client trust."
      ],
    },
    risk: {
      score: 40,
      businessRisks: ["Increasing cost to build data centers squeezing short-term margins.", "Anti-trust blocks on bundling teams/security."],
      industryRisks: ["Rapid change in AI technology rendering server silicon obsolete."],
      economicRisks: ["Corporate IT budgets tightening in a recession."],
      regulatoryRisks: ["FTC investigations into OpenAI relationships and AI investments."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: "BUY",
        score: 88,
        reasoning: "Microsoft is an incredibly wide-moat business. Once a business integrates Windows, Office, and Azure, they are locked in for decades. Under Satya Nadella, the company has executed flawlessly. I historically avoided it due to my friendship with Bill Gates, but purely on fundamentals, it is a magnificent compounder.",
      },
      peterLynch: {
        rating: "STRONG BUY",
        score: 92,
        reasoning: "Excellent financials. A net margin of 35% is beautiful, and their revenue growth is actually accelerating despite their massive size. This is a cloud giant that has successfully pivoted to AI. Debt is low, returns on equity are outstanding, and the customer stickiness is close to 100%.",
      },
      rayDalio: {
        rating: "STRONG BUY",
        score: 93,
        reasoning: "Microsoft represents the ultimate high-quality balance sheet. It holds one of the only AAA credit ratings in the corporate world, higher than the US government's rating. In a volatile macro environment, this cash generator is a safe haven. Their enterprise cloud demand is less cyclical than retail spending.",
      },
      cathieWood: {
        rating: "BUY",
        score: 85,
        reasoning: "Microsoft is monetizing AI faster than any other software giant. Their integration of OpenAI's models directly into Office and Azure has created a massive distribution advantage. They are spending heavily on CAPEX, which is necessary to own the compute infrastructure of the future.",
      },
      riskManager: {
        rating: "STRONG BUY",
        score: 96,
        reasoning: "Lowest risk profile among tech mega-caps. Volatility is well-managed, and the business has multiple independent profit centers (Windows, Office, Azure, Gaming, LinkedIn). Essential asset for conservative portfolios.",
      },
    },
    debate: {
      pros: [
        "Unrivaled enterprise distribution and product ecosystem lock-in.",
        "Stellar AAA balance sheet with robust cash flows.",
        "First-mover advantage in commercial generative AI."
      ],
      cons: [
        "Massive CAPEX spend could impact operating cash flows if AI margins slow.",
        "Potential antitrust issues with Teams bundling.",
        "Relatively high valuation compared to historic averages."
      ],
      summary: "The debate centers on whether Azure's AI-led growth can sustain Microsoft's high premium valuation multiple over the long term.",
    },
  },
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries Limited",
    recommendation: "BUY",
    confidenceScore: 85,
    combinedScore: 80,
    scores: {
      financials: 82,
      growth: 78,
      sentiment: 82,
      competitive: 88,
      risk: 50,
    },
    overview: {
      industry: "Conglomerate (Oil, Retail, Telecom)",
      businessModel: "Diverse operations including oil refining and petrochemicals (O2C), telecom and digital services (Jio), organized retail network, and new energy initiatives.",
      revenueSources: ["Oil to Chemicals (O2C) (56%)", "Reliance Retail (23%)", "Jio Digital Services (16%)", "Financial Services & Others (5%)"],
      marketPosition: "India's largest private sector company by revenue, market cap, and profitability, acting as a direct proxy for the Indian consumer economy.",
      competitors: ["Tata Group", "Adani Group", "Bharti Airtel", "Aditya Birla Group"],
    },
    financials: {
      healthScore: 82,
      metrics: {
        revenueGrowthYOY: 11.2,
        netIncomeMargin: 8.5,
        operatingMargin: 11.8,
        epsGrowth: 10.4,
        debtToEquity: 0.38,
        freeCashFlow: 320000, // In Millions INR
        roe: 12.4,
        roa: 6.8,
      },
      chartData: [
        { year: "2021", revenue: 539238, profit: 49120 },
        { year: "2022", revenue: 792756, profit: 60700 },
        { year: "2023", revenue: 896912, profit: 66702 },
        { year: "2024", revenue: 980000, profit: 73000 },
        { year: "2025 (Est)", revenue: 1090000, profit: 82000 },
      ],
    },
    sentiment: {
      score: 82,
      summary: "Positive domestic sentiment driven by Jio's 5G rollout, Retail expansion, and plans for listings of the retail and telecom subsidiaries, offset by petrochemical commodity price volatility.",
      sources: [
        { source: "Moneycontrol", title: "Reliance Retail reaches 300 million registered customers", sentiment: "positive" },
        { source: "Economic Times", title: "Jio introduces AI Cloud storage solutions for users", sentiment: "positive" },
        { source: "Reuters", title: "Global oil refining margin squeeze impacts O2C profits", sentiment: "negative" },
        { source: "News", title: "Reliance announces massive gigafactory for green energy in Gujarat", sentiment: "positive" },
      ],
    },
    swot: {
      strengths: [
        "Dominant telecom operator in India (Jio) with over 470 million subscribers.",
        "India's largest retail network with unmatched brick-and-mortar scale.",
        "Extremely efficient refinery complexes with deep integration.",
        "Deep capital reserves and strong backing from the founding Ambani family."
      ],
      weaknesses: [
        "Capital expenditure intensive operations (5G network + Retail + Green Energy).",
        "Legacy business (petrochemicals) is cyclical and vulnerable to oil price shifts.",
        "High complexity as a conglomerate can lead to a conglomerate discount."
      ],
      opportunities: [
        "Value unlock via IPOs of Jio and Reliance Retail.",
        "Expansion of Jio Financial Services (JFS) into digital credit and wealth management.",
        "Aggressive pivot into solar panels, green hydrogen, and battery gigafactories."
      ],
      threats: [
        "Price wars in telecom if competitors slash rates.",
        "Regulatory changes in oil prices or export taxes by Indian government.",
        "Aggressive e-commerce entry from Amazon and Tata Neu."
      ],
    },
    risk: {
      score: 50,
      businessRisks: ["Petrochemical volatility.", "Prolonged high CAPEX dragging down return ratios (ROE)."],
      industryRisks: ["Global energy transition impacting oil demand.", "Telecom market regulatory pricing restrictions."],
      economicRisks: ["Slowing domestic inflation damping middle-class retail spend."],
      regulatoryRisks: ["Windfall taxes on fuel exports by the government."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: "BUY",
        score: 75,
        reasoning: "Reliance is a corporate powerhouse in India. The telecom and retail assets have wonderful consumer moats, while the oil refining acts as a reliable capital provider. Valuation is moderate, and return ratios are decent. A bit capital-heavy, but their dominant position is undeniable.",
      },
      peterLynch: {
        rating: "BUY",
        score: 78,
        reasoning: "Jio and Retail are classic examples of simple growth stories. Everyone in India uses Jio for phone data and shops at Reliance Retail. It's a double-digit compounder that matches India's rising GDP. The debt is well-managed and cash flow is strong.",
      },
      rayDalio: {
        rating: "STRONG BUY",
        score: 90,
        reasoning: "Reliance is the single best proxy for the structural growth story of India. They are building the digital and physical infrastructure of the nation. As India ascends in the global economic order, Reliance is the primary beneficiary. Their debt levels are conservative and Jio's pricing power is secure.",
      },
      cathieWood: {
        rating: "BUY",
        score: 82,
        reasoning: "Reliance Jio is transforming into a massive tech and cloud platform, partnering with Nvidia to deploy AI computing infrastructure in India. Their clean energy transition (massive solar gigafactories) represents a forward-thinking pivot that standard commodity firms fail to execute.",
      },
      riskManager: {
        rating: "BUY",
        score: 80,
        reasoning: "Low volatility profile within the Indian index (Nifty 50). Reliance behaves like a bedrock conglomerate. CAPEX cycles are nearing completion, leading to higher free cash flow in the coming years. Excellent long-term compounder.",
      },
    },
    debate: {
      pros: [
        "Unbeatable scale in telecom, retail, and energy sectors in India.",
        "Upcoming spin-off IPO listings will unlock massive shareholder value.",
        "Strong backing and execution track record of local management."
      ],
      cons: [
        "Refinery margins are highly vulnerable to volatile crude price cycles.",
        "High CAPEX has kept ROE lower than global pure-play software tech firms.",
        "Potential succession execution risk across the next generation of Ambanis."
      ],
      summary: "The debate centers on whether Reliance's massive capital investments in Jio, Retail, and Green Energy will expand margins and return ratios in the near term.",
    },
  },
  TCS: {
    symbol: "TCS",
    name: "Tata Consultancy Services Limited",
    recommendation: "HOLD",
    confidenceScore: 82,
    combinedScore: 74,
    scores: {
      financials: 85,
      growth: 65,
      sentiment: 72,
      competitive: 88,
      risk: 35,
    },
    overview: {
      industry: "IT Services & Consulting",
      businessModel: "Provision of IT services, consulting, and business solutions to global enterprises, operating on a high-efficiency global delivery model.",
      revenueSources: ["Banking, Financial Services & Insurance (BFSI) (38%)", "Retail & Consumer Goods (16%)", "Communication & Media (12%)", "Manufacturing (10%)", "Life Sciences & Healthcare (10%)"],
      marketPosition: "Second largest Indian company by market cap and global leader in IT consulting services.",
      competitors: ["Infosys", "Wipro", "Cognizant", "Accenture", "HCL Tech"],
    },
    financials: {
      healthScore: 85,
      metrics: {
        revenueGrowthYOY: 7.8,
        netIncomeMargin: 19.2,
        operatingMargin: 24.5,
        epsGrowth: 8.5,
        debtToEquity: 0.02, // Near zero debt
        freeCashFlow: 410000, // Millions INR
        roe: 48.2, // Exceptional return on equity
        roa: 32.4,
      },
      chartData: [
        { year: "2021", revenue: 164177, profit: 32430 },
        { year: "2022", revenue: 191754, profit: 38327 },
        { year: "2023", revenue: 225458, profit: 42147 },
        { year: "2024", revenue: 241000, profit: 46000 },
        { year: "2025 (Est)", revenue: 260000, profit: 50000 },
      ],
    },
    sentiment: {
      score: 72,
      summary: "Neutral-to-positive sentiment. Global enterprise IT spending has been soft due to high interest rates, though deal pipeline and large multi-year order wins remain stable.",
      sources: [
        { source: "News", title: "TCS secures multi-million dollar cloud deal with UK bank", sentiment: "positive" },
        { source: "Bloomberg", title: "IT sector growth slows amid delayed discretionary corporate spending", sentiment: "negative" },
        { source: "Reddit", title: "TCS high retention rates show stability in challenging market", sentiment: "positive" },
        { source: "News", title: "TCS expands AI training program to all 600,000 employees", sentiment: "positive" },
      ],
    },
    swot: {
      strengths: [
        "Massive global scale with over 600,000 highly trained engineers.",
        "Impeccable corporate governance backed by the Tata brand.",
        "Extremely high customer retention and long-term contracts.",
        "Superb financial discipline with near-zero debt and 40%+ ROE."
      ],
      weaknesses: [
        "Dependence on discretionary IT spending from US and Europe BFSI clients.",
        "Lower operating margins compared to pure software product companies.",
        "Relatively low growth rates compared to SaaS or semiconductor firms."
      ],
      opportunities: [
        "Enterprise migration to cloud and AI agent integrations.",
        "Expansion into non-traditional markets like Middle East and Latin America.",
        "Upskilling workforce in generative AI to command higher billing rates."
      ],
      threats: [
        "Wage inflation in India driving up employee acquisition costs.",
        "Strict H-1B visa regulations in the US limiting onsite engineers.",
        "Aggressive low-cost automation replacing entry-level coding tasks."
      ],
    },
    risk: {
      score: 35,
      businessRisks: ["Softening global corporate IT budgets.", "High employee attrition/retention costs during talent booms."],
      industryRisks: ["AI coding tools reducing value of basic engineering billing hours."],
      economicRisks: ["US/Europe macroeconomic recessions impacting bank IT spending."],
      regulatoryRisks: ["Immigration/visa restriction changes in primary export markets."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: "BUY",
        score: 80,
        reasoning: "TCS has a beautiful business model. It requires almost no capital assets to grow, has virtually zero debt, and earns a tremendous return on equity (48%). The Tata governance is world-class. It's a cash machine that returns almost all profit to shareholders via dividends. High predictability.",
      },
      peterLynch: {
        rating: "HOLD",
        score: 68,
        reasoning: "TCS is a stalwart. Growth has slowed to single digits (7.8%), so it won't double your money overnight. However, it's a solid, reliable company. The dividend yield is nice and the balance sheet is pristine. Buy at a reasonable price, but don't expect hypergrowth.",
      },
      rayDalio: {
        rating: "HOLD",
        score: 70,
        reasoning: "TCS is a stable engine in the global economy, but heavily tied to the financial cycle of Western institutions. While low debt and steady cash flows insulate them from liquidity crises, they will experience moderate headwinds if US banks pull back on tech budgets.",
      },
      cathieWood: {
        rating: "PASS",
        score: 42,
        reasoning: "TCS is an IT services integrator. The danger for them is that automated AI agents and LLM code generators will dramatically reduce the need for large offshore development teams, challenging their headcount-based business model. I prefer investing in the creators of AI, not service agencies.",
      },
      riskManager: {
        rating: "STRONG BUY",
        score: 95,
        reasoning: "One of the safest defensive stocks in the Indian market. Cash reserves are massive, debt is non-existent, and the beta is very low (~0.6). Highly recommended for capital preservation and steady income streams.",
      },
    },
    debate: {
      pros: [
        "Pristine balance sheet with zero debt and high cash generation.",
        "Deep client integrations making it difficult for clients to switch vendors.",
        "High shareholder yield through generous buybacks and dividends."
      ],
      cons: [
        "Discretionary spending delays by US clients capping near-term growth.",
        "Exposure to H-1B visa policies causing delivery cost fluctuations.",
        "Rising threat of AI automation disrupting manual outsourcing tasks."
      ],
      summary: "The debate centers on whether TCS can successfully transition from legacy IT maintenance to high-value AI integration consulting to revive double-digit growth.",
    },
  },
};

// Generates a fully fleshed out report object from symbol
export function getSimulatedReport(symbol: string): IResearchReport {
  const cleanSymbol = symbol.toUpperCase().trim();
  const baseReport = MOCK_STOCKS[cleanSymbol];

  if (baseReport) {
    return {
      ...baseReport,
      symbol: cleanSymbol,
      createdAt: new Date(),
    } as IResearchReport;
  }

  // Fallback for unknown symbols (dynamic generator)
  const scoreFin = Math.floor(Math.random() * 25) + 60;
  const scoreGro = Math.floor(Math.random() * 25) + 60;
  const scoreSen = Math.floor(Math.random() * 25) + 60;
  const scoreCom = Math.floor(Math.random() * 25) + 60;
  const scoreRisk = Math.floor(Math.random() * 30) + 30; // 30-60

  // Weights: Financials 35%, Sentiment 15%, Competitive 15%, Growth 20%, Risk (reversed) 15%
  // Risk weight is positive contribution if risk is LOW. So (100 - risk) * 0.15
  const combined = Math.round(
    scoreFin * 0.35 +
    scoreGro * 0.20 +
    scoreSen * 0.15 +
    scoreCom * 0.15 +
    (100 - scoreRisk) * 0.15
  );

  let rec: IResearchReport["recommendation"] = "HOLD";
  if (combined >= 85) rec = "STRONG BUY";
  else if (combined >= 75) rec = "BUY";
  else if (combined >= 60) rec = "HOLD";
  else if (combined >= 45) rec = "PASS";
  else rec = "STRONG PASS";

  return {
    symbol: cleanSymbol,
    name: `${cleanSymbol} Technologies Inc.`,
    recommendation: rec,
    confidenceScore: Math.floor(Math.random() * 20) + 70,
    combinedScore: combined,
    scores: {
      financials: scoreFin,
      growth: scoreGro,
      sentiment: scoreSen,
      competitive: scoreCom,
      risk: scoreRisk,
    },
    overview: {
      industry: "Technology & Software",
      businessModel: "Enterprise software licensing, cloud subscription, and professional integration consulting services.",
      revenueSources: ["SaaS Subscriptions (65%)", "Professional Services (20%)", "Hardware sales (15%)"],
      marketPosition: `Emerging mid-market solution provider in the ${cleanSymbol} vertical with growing global footprint.`,
      competitors: ["Competitor Alpha", "Competitor Beta", "Competitor Gamma"],
    },
    financials: {
      healthScore: scoreFin,
      metrics: {
        revenueGrowthYOY: Math.round((Math.random() * 15 + 5) * 10) / 10,
        netIncomeMargin: Math.round((Math.random() * 10 + 10) * 10) / 10,
        operatingMargin: Math.round((Math.random() * 12 + 12) * 10) / 10,
        epsGrowth: Math.round((Math.random() * 20 + 2) * 10) / 10,
        debtToEquity: Math.round((Math.random() * 0.5) * 100) / 100,
        freeCashFlow: Math.floor(Math.random() * 1500) + 100,
        roe: Math.round((Math.random() * 15 + 10) * 10) / 10,
        roa: Math.round((Math.random() * 8 + 4) * 10) / 10,
      },
      chartData: [
        { year: "2022", revenue: 1200, profit: 120 },
        { year: "2023", revenue: 1450, profit: 170 },
        { year: "2024", revenue: 1800, profit: 240 },
        { year: "2025 (Est)", revenue: 2200, profit: 310 },
      ],
    },
    sentiment: {
      score: scoreSen,
      summary: `Positive baseline sentiment on ${cleanSymbol} driven by recent product updates and pilot implementations in retail sectors.`,
      sources: [
        { source: "News", title: `${cleanSymbol} launches next-gen enterprise API platform`, sentiment: "positive" },
        { source: "Twitter", title: `Early feedback on ${cleanSymbol}'s cloud console is highly encouraging`, sentiment: "positive" },
        { source: "Bloomberg", title: `Competitive pricing concerns weigh slightly on ${cleanSymbol} margins`, sentiment: "neutral" },
      ],
    },
    swot: {
      strengths: [
        "Highly customizable software package with low integration overhead.",
        "Experienced technical management team.",
        "Diverse customer base with low concentration risk."
      ],
      weaknesses: [
        "Smaller marketing budget compared to sector giants.",
        "Elevated employee acquisition costs in engineering."
      ],
      opportunities: [
        "Uncapped expansion opportunity in Asian and European emerging markets.",
        "Integration of agentic AI automation models to lower client service costs."
      ],
      threats: [
        "Rapid consolidation in the tech space from big cap competitors.",
        "Risk of data security breaches impacting enterprise client confidence."
      ],
    },
    risk: {
      score: scoreRisk,
      businessRisks: ["Intense price competition in the SaaS layer.", "Customer churn during economic resets."],
      industryRisks: ["Fast technology replacement cycles."],
      economicRisks: ["Discretionary corporate IT budget contractions."],
      regulatoryRisks: ["Compliance changes in data privacy policies (GDPR/CCPA)."],
    },
    hedgeFundOpinions: {
      warrenBuffett: {
        rating: combined >= 75 ? "BUY" : "PASS",
        score: Math.round(scoreFin * 0.9),
        reasoning: `Evaluating ${cleanSymbol} from a value framework shows reasonable debt ratios and capital efficiency. However, the software moat is not yet wide enough to assure 20 years of compounding. I would tread carefully.`,
      },
      peterLynch: {
        rating: combined >= 70 ? "BUY" : "HOLD",
        score: Math.round(scoreGro * 0.95),
        reasoning: `${cleanSymbol} is showing attractive double-digit revenue growth and manageable leverage. Their sales funnel is expanding, and their margins are improving. A classic growing firm to watch closely.`,
      },
      rayDalio: {
        rating: "HOLD",
        score: 65,
        reasoning: `From a macro perspective, ${cleanSymbol} provides a solid enterprise SaaS utility. However, beta is relatively high and it has limited asset backing. It is a good satellite position, not a core holding.`,
      },
      cathieWood: {
        rating: combined >= 80 ? "STRONG BUY" : "BUY",
        score: Math.round(scoreGro * 1.1),
        reasoning: `${cleanSymbol} is positioned to capture massive tailwinds from cognitive software automation. Their API integration layers are modular, allowing fast deployment of autonomous workflows. A highly innovative play.`,
      },
      riskManager: {
        rating: scoreRisk <= 45 ? "BUY" : "HOLD",
        score: 100 - scoreRisk,
        reasoning: `Volatility and leverage metrics are within normal ranges. Suggest sizing this position conservatively until market capitalization expands further.`,
      },
    },
    debate: {
      pros: [
        "Favorable debt-to-equity profile minimizing solvency issues.",
        "Stable growth rates and high-margin software subscriptions."
      ],
      cons: [
        "High competitive pressure from larger software players.",
        "Shorter track record of generating positive free cash flow."
      ],
      summary: `The debate focuses on whether ${cleanSymbol}'s modern tech stack and modular product lines can successfully win market share from established legacy rivals.`,
    },
  } as IResearchReport;
}
