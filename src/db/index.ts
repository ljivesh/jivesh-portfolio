import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL ?? "postgres://postgres:postgres@127.0.0.1:5432/jivesh_portfolio";

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };
export const sql = globalForDb.sql ?? postgres(connectionString, { max: process.env.NODE_ENV === "production" ? 10 : 1 });
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export const db = drizzle(sql, { schema });
