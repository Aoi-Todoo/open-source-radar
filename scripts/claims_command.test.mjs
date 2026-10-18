import assert from "node:assert/strict";
import test from "node:test";

import { findCommand, isStale } from "./claims_command.mjs";

test("findCommand recognizes claim commands on unquoted lines", () => {
  assert.equal(findCommand("/claim"), "/claim");
  assert.equal(findCommand("hi\n/claim"), "/claim");
  assert.equal(findCommand("/unclaim thanks"), "/unclaim thanks");
});

test("findCommand ignores quoted lines and comments without a command", () => {
  assert.equal(findCommand("> /claim"), undefined);
  assert.equal(findCommand("I would like to help"), undefined);
});

test("isStale treats an issue with no activity as stale", () => {
  assert.equal(isStale([], 8 * 86400e3, 7), true);
});

test("isStale keeps activity just inside the window", () => {
  const now = 8 * 86400e3;
  const cutoff = now - 7 * 86400e3;

  assert.equal(isStale([cutoff + 1], now, 7), false);
});

test("isStale treats activity exactly at the cutoff as stale", () => {
  const now = 8 * 86400e3;
  const cutoff = now - 7 * 86400e3;

  assert.equal(isStale([cutoff], now, 7), true);
});

test("isStale treats old activity as stale", () => {
  assert.equal(isStale([86400e3], 8 * 86400e3, 7), true);
});
