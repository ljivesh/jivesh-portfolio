import { sql as dsql } from "drizzle-orm";
import { db } from "@/db";

export async function GET() {
  try { await db.execute(dsql`select 1`); return Response.json({ status: "ok", database: "ok", timestamp: new Date().toISOString() }); }
  catch { return Response.json({ status: "degraded", database: "unavailable", timestamp: new Date().toISOString() }, { status: 503 }); }
}
