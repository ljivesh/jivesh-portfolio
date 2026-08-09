import { boolean, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  role: text("role").default("moderator").notNull(),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires", { withTimezone: true }),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
}, (table) => [index("session_user_id_idx").on(table.userId)]);

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("account_user_id_idx").on(table.userId)]);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => [index("verification_identifier_idx").on(table.identifier)]);

export const twoFactor = pgTable("two_factor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backup_codes").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  verified: boolean("verified").default(false).notNull(),
  failedVerificationCount: integer("failed_verification_count").default(0).notNull(),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
}, (table) => [uniqueIndex("two_factor_user_id_idx").on(table.userId)]);

export const guestbookStatus = pgEnum("guestbook_status", ["pending", "approved", "rejected"]);
export const messageStatus = pgEnum("message_status", ["new", "read", "archived"]);
export const notificationStatus = pgEnum("notification_status", ["pending", "sent", "failed"]);

export const guestbookEntries = pgTable("guestbook_entries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  status: guestbookStatus("status").default("pending").notNull(),
  visitorKey: text("visitor_key").notNull(),
  duplicateHash: text("duplicate_hash").notNull(),
  moderatedBy: text("moderated_by").references(() => user.id, { onDelete: "set null" }),
  moderatedAt: timestamp("moderated_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index("guestbook_status_created_idx").on(table.status, table.createdAt),
  index("guestbook_visitor_created_idx").on(table.visitorKey, table.createdAt),
]);

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: messageStatus("status").default("new").notNull(),
  notificationStatus: notificationStatus("notification_status").default("pending").notNull(),
  resendId: text("resend_id"),
  visitorKey: text("visitor_key").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("contact_status_created_idx").on(table.status, table.createdAt)]);

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("audit_created_idx").on(table.createdAt)]);

export const submissionRateLimits = pgTable("submission_rate_limits", {
  id: uuid("id").defaultRandom().primaryKey(),
  visitorKey: text("visitor_key").notNull(),
  action: text("action").notNull(),
  windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
  requestCount: integer("request_count").default(1).notNull(),
}, (table) => [uniqueIndex("rate_limit_window_idx").on(table.visitorKey, table.action, table.windowStart)]);

export type GuestbookEntry = typeof guestbookEntries.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
