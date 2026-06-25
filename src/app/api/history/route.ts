import { DbService } from "@/lib/db/db-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await DbService.getReports();
    return Response.json({ success: true, list });
  } catch (err) {
    return Response.json({ success: false, error: "Failed to fetch research history" }, { status: 500 });
  }
}
