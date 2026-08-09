import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

async function main() {
  const [{ migrate }, { db, sql }] = await Promise.all([
    import("drizzle-orm/postgres-js/migrator"),
    import("./index"),
  ]);

  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Database migrations complete.");
  } finally {
    await sql.end();
  }
}

main().catch((error) => {
  console.error("Database migration failed:", error);
  process.exitCode = 1;
});
