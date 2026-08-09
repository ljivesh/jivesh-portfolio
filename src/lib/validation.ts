import { z } from "zod";

const honeypot = z.string().max(0, "Spam detected").optional().default("");

export const guestbookInput = z.object({
  name: z.string().trim().min(2).max(60),
  message: z.string().trim().min(3).max(600),
  website: honeypot,
});

export const contactInput = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(10).max(4000),
  website: honeypot,
});

export const moderationInput = z.object({
  id: z.uuid(),
  status: z.enum(["pending", "approved", "rejected"]),
});

export const messageStatusInput = z.object({
  id: z.uuid(),
  status: z.enum(["new", "read", "archived"]),
});
