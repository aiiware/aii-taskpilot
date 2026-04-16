/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/utils/logger.test.ts
import { Logger, logger, cliLogger } from "../../src/utils/logger";

// Mock console methods to track calls
const mockConsole = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  // Temporarily replace console methods
  global.console.debug = mockConsole.debug;
  global.console.info = mockConsole.info;
  global.console.warn = mockConsole.warn;
  global.console.error = mockConsole.error;
  global.console.log = mockConsole.log;
});

describe("Logger", () => {
  describe("constructor", () => {
    it("creates logger with default options", () => {
      const logger = new Logger();
      expect(logger).toBeInstanceOf(Logger);
    });

    it("accepts custom options", () => {
      const logger = new Logger({
        level: "debug",
        prefix: "test",
        colors: false,
      });
      expect(logger).toBeInstanceOf(Logger);
    });
  });

  describe("log levels", () => {
    it("logs debug when level is debug", () => {
      const logger = new Logger({ level: "debug" });
      logger.debug("test message");
      expect(mockConsole.debug).toHaveBeenCalled();
    });

    it("does not log debug when level is info", () => {
      const logger = new Logger({ level: "info" });
      logger.debug("test message");
      expect(mockConsole.debug).not.toHaveBeenCalled();
    });

    it("logs info when level is info", () => {
      const logger = new Logger({ level: "info" });
      logger.info("test message");
      expect(mockConsole.info).toHaveBeenCalled();
    });

    it("logs warn when level is warn", () => {
      const logger = new Logger({ level: "warn" });
      logger.warn("test message");
      expect(mockConsole.warn).toHaveBeenCalled();
    });

    it("logs error when level is error", () => {
      const logger = new Logger({ level: "error" });
      logger.error("test message");
      expect(mockConsole.error).toHaveBeenCalled();
    });

    it("logs higher severity levels when level is lower", () => {
      const logger = new Logger({ level: "info" });
      logger.warn("warning message");
      logger.error("error message");
      expect(mockConsole.warn).toHaveBeenCalled();
      expect(mockConsole.error).toHaveBeenCalled();
    });
  });

  describe("formatting", () => {
    it("includes timestamp, prefix, and level in message", () => {
      const logger = new Logger({ prefix: "test", colors: false });
      logger.info("test message");
      
      const callArgs = mockConsole.info.mock.calls[0][0];
      expect(callArgs).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/); // ISO timestamp
      expect(callArgs).toContain("[test]");
      expect(callArgs).toContain("[INFO]");
      expect(callArgs).toContain("test message");
    });

    it("passes additional arguments through", () => {
      const logger = new Logger({ colors: false });
      logger.info("test message", 123, { key: "value" });
      
      expect(mockConsole.info).toHaveBeenCalledWith(
        expect.stringContaining("test message"),
        123,
        { key: "value" }
      );
    });
  });

  describe("success method", () => {
    it("logs success message with checkmark", () => {
      const logger = new Logger({ colors: false });
      logger.success("task completed");
      
      expect(mockConsole.log).toHaveBeenCalledWith("✅ task completed");
    });

    it("uses colors when enabled", () => {
      // Note: We can't easily test chalk output without mocking it
      // This test ensures the method doesn't crash
      const logger = new Logger({ colors: true });
      expect(() => logger.success("test")).not.toThrow();
    });
  });

  describe("log method", () => {
    it("logs plain message", () => {
      const logger = new Logger();
      logger.log("plain message");
      
      expect(mockConsole.log).toHaveBeenCalledWith("plain message");
    });
  });
});

describe("default logger instances", () => {
  it("exports default logger", () => {
    expect(logger).toBeInstanceOf(Logger);
  });

  it("exports CLI logger", () => {
    expect(cliLogger).toBeInstanceOf(Logger);
    expect(cliLogger).not.toBe(logger); // Different instances
  });
});