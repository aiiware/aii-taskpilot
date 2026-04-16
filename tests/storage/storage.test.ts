/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/storage/storage.test.ts
import {
  getHomeDir,
  getFilePath,
  ensureStorage,
  loadBoard,
  saveBoard,
} from "../../src/storage/storage";
import { Board } from "../../src/models";
import fs from "fs";
import path from "path";

describe("storage", () => {
  const originalEnv = process.env.TASKPILOT_HOME;
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(__dirname, "taskpilot-test-"));
    process.env.TASKPILOT_HOME = tempDir;
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    process.env.TASKPILOT_HOME = originalEnv;
  });

  describe("getHomeDir", () => {
    it("returns TASKPILOT_HOME env var when set", () => {
      process.env.TASKPILOT_HOME = "/custom/path";
      expect(getHomeDir()).toBe("/custom/path");
    });

    it("returns default path when TASKPILOT_HOME not set", () => {
      delete process.env.TASKPILOT_HOME;
      // Note: can't easily test the default path without mocking os.homedir()
      // This test is mostly to ensure the function doesn't crash
      expect(typeof getHomeDir()).toBe("string");
    });
  });

  describe("getFilePath", () => {
    it("returns path to default.json in home directory", () => {
      process.env.TASKPILOT_HOME = "/test";
      expect(getFilePath()).toBe("/test/default.json");
    });
  });

  describe("ensureStorage", () => {
    it("creates directory and file if they do not exist", () => {
      const filePath = getFilePath();
      expect(fs.existsSync(filePath)).toBe(false);

      ensureStorage();

      expect(fs.existsSync(tempDir)).toBe(true);
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, "utf-8");
      const board = JSON.parse(content) as Board;
      expect(board.name).toBe("default");
      expect(board.tasks).toEqual([]);
      expect(board.nextId).toBe(1);
    });

    it("does not overwrite existing file", () => {
      const filePath = getFilePath();
      const existingBoard: Board = { name: "existing", tasks: [], nextId: 42 };
      fs.mkdirSync(tempDir, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(existingBoard, null, 2));

      ensureStorage();

      const content = fs.readFileSync(filePath, "utf-8");
      const board = JSON.parse(content) as Board;
      expect(board.name).toBe("existing");
      expect(board.nextId).toBe(42);
    });
  });

  describe("loadBoard", () => {
    it("loads existing board", () => {
      const filePath = getFilePath();
      const expectedBoard: Board = { name: "test", tasks: [], nextId: 5 };
      fs.mkdirSync(tempDir, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify(expectedBoard, null, 2));

      const board = loadBoard();
      expect(board).toEqual(expectedBoard);
    });

    it("creates default board if file does not exist", () => {
      const board = loadBoard();
      expect(board.name).toBe("default");
      expect(board.tasks).toEqual([]);
      expect(board.nextId).toBe(1);
    });
  });

  describe("saveBoard", () => {
    it("saves board to file", () => {
      const filePath = getFilePath();
      const board: Board = { name: "saved", tasks: [], nextId: 10 };

      saveBoard(board);

      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf-8");
      const saved = JSON.parse(content) as Board;
      expect(saved).toEqual(board);
    });

    it("creates directory if it does not exist", () => {
      const filePath = getFilePath();
      const board: Board = { name: "saved", tasks: [], nextId: 10 };

      // Delete temp dir to ensure it doesn't exist
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }

      saveBoard(board);

      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
});
