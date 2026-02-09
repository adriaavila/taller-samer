import test from "node:test";
import assert from "node:assert/strict";
import { hourLogsData, workOrdersData } from "../src/lib/data";
import {
  calculateHours,
  countByStatus,
  formatMinutes,
  getLatestLogDate,
  getLogsForDate,
} from "../src/lib/metrics";

test("calculates total minutes and formats output", () => {
  const totalMinutes = calculateHours(hourLogsData);
  assert.ok(totalMinutes > 0);
  assert.match(formatMinutes(totalMinutes), /\dh \d+m/);
});

test("gets latest log date and filters logs", () => {
  const latestDate = getLatestLogDate(hourLogsData);
  const logs = getLogsForDate(hourLogsData, latestDate);
  assert.equal(latestDate, "2026-02-05");
  assert.equal(logs.length, hourLogsData.length);
});

test("counts work orders by status", () => {
  assert.equal(countByStatus(workOrdersData, "Cerrada"), 1);
});
