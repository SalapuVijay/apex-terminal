import { DbService } from "@/lib/db/db-service";
import { connectToDatabase } from "@/lib/db/mongo";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await DbService.getWatchlist();
    const isMongo = !!(await connectToDatabase());
    return Response.json({ success: true, list, isMongo });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to fetch watchlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { symbol, name } = await req.json();
    if (!symbol) {
      return Response.json({ success: false, error: "Symbol is required" }, { status: 400 });
    }
    const item = await DbService.addToWatchlist(symbol.toUpperCase(), name || `${symbol.toUpperCase()} Inc.`);
    return Response.json({ success: true, item });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to add to watchlist" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");
    if (!symbol) {
      return Response.json({ success: false, error: "Symbol is required" }, { status: 400 });
    }
    const deleted = await DbService.removeFromWatchlist(symbol.toUpperCase());
    return Response.json({ success: true, deleted });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to remove from watchlist" }, { status: 500 });
  }
}
