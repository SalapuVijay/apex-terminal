import fs from "fs/promises";
import path from "path";
import { connectToDatabase } from "./mongo";
import { ResearchReport, WatchlistItem, PortfolioAllocation, IResearchReport, IWatchlistItem, IPortfolioAllocation } from "./models";

// Define a local database file path for fallback
const LOCAL_DB_PATH = path.join(process.cwd(), "local_db.json");

interface ILocalDb {
  reports: IResearchReport[];
  watchlist: IWatchlistItem[];
  portfolios: IPortfolioAllocation[];
}

// Helper to load/save local database file
async function loadLocalDb(): Promise<ILocalDb> {
  try {
    const data = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    // If file doesn't exist or is corrupt, return empty database structure
    const initialDb: ILocalDb = { reports: [], watchlist: [], portfolios: [] };
    await saveLocalDb(initialDb);
    return initialDb;
  }
}

async function saveLocalDb(db: ILocalDb): Promise<void> {
  await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export const DbService = {
  // --- RESEARCH REPORTS HISTORY ---
  async saveReport(reportData: IResearchReport): Promise<IResearchReport> {
    const db = await connectToDatabase();
    if (db) {
      try {
        // Overwrite if report for symbol exists, or create a new one
        await ResearchReport.deleteMany({ symbol: reportData.symbol.toUpperCase() });
        const doc = new ResearchReport(reportData);
        await doc.save();
        return doc.toObject();
      } catch (err) {
        console.error("MongoDB saveReport failed, falling back to local file:", err);
      }
    }

    // Fallback: Local JSON File DB
    const localDb = await loadLocalDb();
    // Remove old matching symbol
    localDb.reports = localDb.reports.filter(
      (r) => r.symbol.toUpperCase() !== reportData.symbol.toUpperCase()
    );
    // Add new report
    const newReport = { ...reportData, createdAt: new Date() };
    localDb.reports.push(newReport);
    await saveLocalDb(localDb);
    return newReport;
  },

  async getReports(): Promise<IResearchReport[]> {
    const db = await connectToDatabase();
    if (db) {
      try {
        const docs = await ResearchReport.find().sort({ createdAt: -1 });
        return docs.map(doc => doc.toObject());
      } catch (err) {
        console.error("MongoDB getReports failed, falling back to local file:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    return localDb.reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getReportBySymbol(symbol: string): Promise<IResearchReport | null> {
    const db = await connectToDatabase();
    if (db) {
      try {
        const doc = await ResearchReport.findOne({ symbol: symbol.toUpperCase() }).sort({ createdAt: -1 });
        return doc ? doc.toObject() : null;
      } catch (err) {
        console.error("MongoDB getReportBySymbol failed, falling back:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    const match = localDb.reports
      .filter((r) => r.symbol.toUpperCase() === symbol.toUpperCase())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return match.length > 0 ? match[0] : null;
  },

  // --- WATCHLIST ---
  async getWatchlist(): Promise<IWatchlistItem[]> {
    const db = await connectToDatabase();
    if (db) {
      try {
        const docs = await WatchlistItem.find().sort({ addedAt: -1 });
        return docs.map(doc => doc.toObject());
      } catch (err) {
        console.error("MongoDB getWatchlist failed, falling back:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    return localDb.watchlist.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  },

  async addToWatchlist(symbol: string, name: string): Promise<IWatchlistItem> {
    const db = await connectToDatabase();
    if (db) {
      try {
        // Upsert
        await WatchlistItem.deleteMany({ symbol: symbol.toUpperCase() });
        const doc = new WatchlistItem({ symbol: symbol.toUpperCase(), name });
        await doc.save();
        return doc.toObject();
      } catch (err) {
        console.error("MongoDB addToWatchlist failed, falling back:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    localDb.watchlist = localDb.watchlist.filter((item) => item.symbol.toUpperCase() !== symbol.toUpperCase());
    const newItem: IWatchlistItem = { symbol: symbol.toUpperCase(), name, addedAt: new Date() };
    localDb.watchlist.push(newItem);
    await saveLocalDb(localDb);
    return newItem;
  },

  async removeFromWatchlist(symbol: string): Promise<boolean> {
    const db = await connectToDatabase();
    if (db) {
      try {
        const result = await WatchlistItem.deleteOne({ symbol: symbol.toUpperCase() });
        return result.deletedCount > 0;
      } catch (err) {
        console.error("MongoDB removeFromWatchlist failed, falling back:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    const initialLen = localDb.watchlist.length;
    localDb.watchlist = localDb.watchlist.filter((item) => item.symbol.toUpperCase() !== symbol.toUpperCase());
    await saveLocalDb(localDb);
    return localDb.watchlist.length < initialLen;
  },

  // --- PORTFOLIO SIMULATIONS ---
  async savePortfolioAllocation(capital: number, allocations: IPortfolioAllocation["allocations"]): Promise<IPortfolioAllocation> {
    const db = await connectToDatabase();
    if (db) {
      try {
        const doc = new PortfolioAllocation({ capital, allocations });
        await doc.save();
        return doc.toObject();
      } catch (err) {
        console.error("MongoDB savePortfolio failed, falling back:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    const newAlloc: IPortfolioAllocation = { capital, allocations, createdAt: new Date() };
    localDb.portfolios.push(newAlloc);
    await saveLocalDb(localDb);
    return newAlloc;
  },

  async getLatestPortfolio(): Promise<IPortfolioAllocation | null> {
    const db = await connectToDatabase();
    if (db) {
      try {
        const doc = await PortfolioAllocation.findOne().sort({ createdAt: -1 });
        return doc ? doc.toObject() : null;
      } catch (err) {
        console.error("MongoDB getLatestPortfolio failed, falling back:", err);
      }
    }

    // Fallback
    const localDb = await loadLocalDb();
    if (localDb.portfolios.length === 0) return null;
    return localDb.portfolios.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }
};
