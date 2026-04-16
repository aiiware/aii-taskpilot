/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/utils/colors.test.ts
import { statusColors, priorityColors } from "../../src/utils/colors";
import chalk from "chalk";

describe("colors utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("statusColors", () => {
    it("maps todo to blue", () => {
      const result = statusColors.todo("test");
      expect(chalk.blue).toHaveBeenCalledWith("test");
      expect(result).toBe("blue:test");
    });

    it("maps doing to yellow", () => {
      const result = statusColors.doing("test");
      expect(chalk.yellow).toHaveBeenCalledWith("test");
      expect(result).toBe("yellow:test");
    });

    it("maps review to magenta", () => {
      const result = statusColors.review("test");
      expect(chalk.magenta).toHaveBeenCalledWith("test");
      expect(result).toBe("magenta:test");
    });

    it("maps done to green", () => {
      const result = statusColors.done("test");
      expect(chalk.green).toHaveBeenCalledWith("test");
      expect(result).toBe("green:test");
    });

    it("has all expected status keys", () => {
      expect(Object.keys(statusColors)).toEqual([
        "todo",
        "doing",
        "review",
        "done",
      ]);
    });
  });

  describe("priorityColors", () => {
    it("maps low to gray", () => {
      const result = priorityColors.low("test");
      expect(chalk.gray).toHaveBeenCalledWith("test");
      expect(result).toBe("gray:test");
    });

    it("maps medium to white", () => {
      const result = priorityColors.medium("test");
      expect(chalk.white).toHaveBeenCalledWith("test");
      expect(result).toBe("white:test");
    });

    it("maps high to red", () => {
      const result = priorityColors.high("test");
      expect(chalk.red).toHaveBeenCalledWith("test");
      expect(result).toBe("red:test");
    });

    it("has all expected priority keys", () => {
      expect(Object.keys(priorityColors)).toEqual([
        "low",
        "medium",
        "high",
      ]);
    });
  });
});