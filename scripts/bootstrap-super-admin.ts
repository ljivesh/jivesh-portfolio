import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import { account, user } from "../src/db/schema";

config({ path: [".env.local", ".env"] });

async function main() {
  const { db, sql } = await import("../src/db");
  const rl = createInterface({ input, output });

  try {
    const email = (await rl.question("Super-admin email: ")).trim().toLowerCase();
    const name = (await rl.question("Name: ")).trim();
    const password = (await rl.question("Temporary password (12+ chars): ")).trim();

    if (!email || !name || password.length < 12) {
      throw new Error("Valid name, email, and 12+ character password are required.");
    }

    const existing = await db.select({ id: user.id }).from(user).where(eq(user.email, email)).limit(1);

    if (existing.length) {
      await db.update(user).set({ role: "super_admin", banned: false, updatedAt: new Date() }).where(eq(user.id, existing[0].id));
      console.log("Existing user promoted to super_admin.");
    } else {
      const id = randomUUID();
      await db.transaction(async (tx) => {
        await tx.insert(user).values({ id, name, email, emailVerified: true, role: "super_admin" });
        await tx.insert(account).values({ id: randomUUID(), accountId: id, providerId: "credential", userId: id, password: await hashPassword(password) });
      });
      console.log("Super-admin created. Sign in and enroll TOTP immediately.");
    }
  } finally {
    rl.close();
    await sql.end();
  }
}

main().catch((error) => {
  console.error("Super-admin bootstrap failed:", error);
  process.exitCode = 1;
});
