import { describe, expect, it } from "vitest";
import { contactInput, guestbookInput } from "./validation";

describe("public submission validation", () => {
  it("accepts valid guestbook and contact payloads", () => { expect(guestbookInput.safeParse({ name: "Ada", message: "Excellent systems work", website: "" }).success).toBe(true); expect(contactInput.safeParse({ name: "Ada", email: "ada@example.com", subject: "Engineering role", message: "I would like to discuss a production AI role.", website: "" }).success).toBe(true); });
  it("rejects honeypot and malformed payloads", () => { expect(guestbookInput.safeParse({ name: "A", message: "x", website: "spam.example" }).success).toBe(false); expect(contactInput.safeParse({ name: "Ada", email: "bad", subject: "x", message: "short", website: "" }).success).toBe(false); });
});
