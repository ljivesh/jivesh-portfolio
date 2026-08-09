import { createHmac } from "node:crypto";

export function getRequestIp(request: Request) {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-real-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

export function visitorKey(request: Request) {
  const secret = process.env.RATE_LIMIT_SECRET ?? "development-rate-limit-secret";
  const material = `${getRequestIp(request)}|${request.headers.get("user-agent") ?? "unknown"}`;
  return createHmac("sha256", secret).update(material).digest("hex");
}

export function duplicateHash(visitor: string, value: string) {
  const secret = process.env.RATE_LIMIT_SECRET ?? "development-rate-limit-secret";
  return createHmac("sha256", secret).update(`${visitor}|${value.trim().toLowerCase().replace(/\s+/g, " ")}`).digest("hex");
}
