import assert from "node:assert/strict";
import test from "node:test";
import {
  createSessionToken,
  getSessionUserId,
  isAuthorizedAdminSession,
  isValidSessionToken,
} from "./session";

const now = 1_800_000_000_000;
const admin = {
  _id: "6add55d560623be63f46a324",
  password: "scrypt$test-salt$test-hash",
  role: "admin",
};

test("accepts a valid session for the current database admin", () => {
  const token = createSessionToken(admin._id, admin.password, now);

  assert.equal(isAuthorizedAdminSession(token, admin, now), true);
  assert.equal(isValidSessionToken(token, admin._id, admin.password, now), true);
  assert.equal(getSessionUserId(token), admin._id);
});

test("rejects expired, forged, mismatched, and non-admin sessions", () => {
  const token = createSessionToken(admin._id, admin.password, now);
  const expiredToken = createSessionToken(
    admin._id,
    admin.password,
    now - 8 * 24 * 60 * 60 * 1000
  );
  const nonAdmin = { ...admin, role: "employee" };

  assert.equal(isAuthorizedAdminSession(expiredToken, admin, now), false);
  assert.equal(isAuthorizedAdminSession(`${token}x`, admin, now), false);
  assert.equal(
    isAuthorizedAdminSession(token, { ...admin, _id: "6add55d560623be63f46a325" }, now),
    false
  );
  assert.equal(isAuthorizedAdminSession(token, nonAdmin, now), false);
  assert.equal(isValidSessionToken(token, admin._id, admin.password, now), true);
  assert.equal(
    isAuthorizedAdminSession(token, { ...admin, password: "scrypt$other$hash" }, now),
    false
  );
  assert.equal(getSessionUserId("authenticated"), null);
});
