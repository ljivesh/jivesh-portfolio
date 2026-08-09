import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, twoFactor } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { adminAc, defaultAc } from "better-auth/plugins/admin/access";
import { db } from "@/db";
import { sendPasswordSetupEmail } from "./email";

export const auth = betterAuth({
  appName: "Jivesh Portfolio Admin",
  baseURL: process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "development-only-secret-change-in-production-please",
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 12,
    sendResetPassword: async ({ user, url }) => sendPasswordSetupEmail({ email: user.email, name: user.name, url }),
  },
  session: { expiresIn: 60 * 60 * 8, updateAge: 60 * 30 },
  plugins: [
    admin({
      defaultRole: "moderator",
      adminRoles: ["super_admin", "moderator"],
      roles: {
        super_admin: adminAc,
        moderator: defaultAc.newRole({ user: [], session: [] }),
      },
    }),
    twoFactor({ issuer: "Jivesh Portfolio" }),
    nextCookies(),
  ],
});

export type AdminRole = "super_admin" | "moderator";
