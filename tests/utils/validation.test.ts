/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/utils/validation.test.ts
import { isValidStatus, isValidPriority } from "../../src/utils/validation";

describe("validation utilities", () => {
  describe("isValidStatus", () => {
    it("returns true for valid status values", () => {
      expect(isValidStatus("todo")).toBe(true);
      expect(isValidStatus("doing")).toBe(true);
      expect(isValidStatus("review")).toBe(true);
      expect(isValidStatus("done")).toBe(true);
    });

    it("returns false for invalid status values", () => {
      expect(isValidStatus("")).toBe(false);
      expect(isValidStatus("invalid")).toBe(false);
      expect(isValidStatus("TODO")).toBe(false); // case-sensitive
      expect(isValidStatus("todo ")).toBe(false); // trailing space
      expect(isValidStatus(" todo")).toBe(false); // leading space
    });

    it("returns false for non-string values", () => {
      // TypeScript would catch these at compile time, but runtime checks
      expect(isValidStatus(undefined as any)).toBe(false);
      expect(isValidStatus(null as any)).toBe(false);
      expect(isValidStatus(123 as any)).toBe(false);
      expect(isValidStatus({} as any)).toBe(false);
    });
  });

  describe("isValidPriority", () => {
    it("returns true for valid priority values", () => {
      expect(isValidPriority("low")).toBe(true);
      expect(isValidPriority("medium")).toBe(true);
      expect(isValidPriority("high")).toBe(true);
    });

    it("returns false for invalid priority values", () => {
      expect(isValidPriority("")).toBe(false);
      expect(isValidPriority("invalid")).toBe(false);
      expect(isValidPriority("LOW")).toBe(false); // case-sensitive
      expect(isValidPriority("low ")).toBe(false); // trailing space
      expect(isValidPriority(" low")).toBe(false); // leading space
    });

    it("returns false for non-string values", () => {
      expect(isValidPriority(undefined as any)).toBe(false);
      expect(isValidPriority(null as any)).toBe(false);
      expect(isValidPriority(123 as any)).toBe(false);
      expect(isValidPriority({} as any)).toBe(false);
    });
  });
});