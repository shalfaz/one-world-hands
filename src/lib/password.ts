import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedPassword: string) {
  if (!storedPassword) return false;

  if (!storedPassword.startsWith("scrypt$")) {
    return password === storedPassword;
  }

  const [, salt, originalHash] = storedPassword.split("$");

  if (!salt || !originalHash) return false;

  const derivedHash = scryptSync(password, salt, KEY_LENGTH);
  const originalHashBuffer = Buffer.from(originalHash, "hex");

  if (derivedHash.length !== originalHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(originalHashBuffer, derivedHash);
}

export function needsRehash(storedPassword: string) {
  return !storedPassword.startsWith("scrypt$");
}