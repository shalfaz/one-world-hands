import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

interface SessionPayload {
  userId: string;
  expiresAt: number;
  nonce: string;
}

export function getSessionUserId(token: string): string | null {
  if (token.length > 2048) {
    return null;
  }

  const [encodedPayload, signature, extra] = token.split(".");
  if (!encodedPayload || !signature || extra) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<SessionPayload>;
    return typeof payload.userId === "string" && /^[a-f\d]{24}$/i.test(payload.userId)
      ? payload.userId
      : null;
  } catch {
    return null;
  }
}

export function createSessionToken(
  userId: string,
  passwordHash: string,
  now = Date.now()
): string {
  if (!/^[a-f\d]{24}$/i.test(userId) || !passwordHash.startsWith("scrypt$")) {
    throw new Error("Cannot create a session for this user");
  }

  const payload: SessionPayload = {
    userId,
    expiresAt: now + SESSION_DURATION_MS,
    nonce: randomBytes(16).toString("hex"),
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", passwordHash)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function isAuthorizedAdminSession(
  token: string,
  user: { _id: string; password: string; role?: string },
  now = Date.now()
): boolean {
  return (
    user.role === "admin" &&
    isValidSessionToken(token, user._id, user.password, now)
  );
}

export function isValidSessionToken(
  token: string,
  userId: string,
  passwordHash: string,
  now = Date.now()
): boolean {
  if (!passwordHash.startsWith("scrypt$")) {
    return false;
  }

  const [encodedPayload, signature, extra] = token.split(".");
  if (!encodedPayload || !signature || extra || token.length > 2048) {
    return false;
  }

  let payload: SessionPayload;
  try {
    payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as SessionPayload;
  } catch {
    return false;
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    payload.userId !== userId ||
    !Number.isSafeInteger(payload.expiresAt) ||
    payload.expiresAt <= now ||
    payload.expiresAt > now + SESSION_DURATION_MS ||
    !/^[a-f\d]{32}$/i.test(payload.nonce)
  ) {
    return false;
  }

  const expected = createHmac("sha256", passwordHash)
    .update(encodedPayload)
    .digest();
  let provided: Buffer;
  try {
    provided = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }

  return provided.length === expected.length && timingSafeEqual(provided, expected);
}
