/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/models/task.test.ts
import { createTask } from "../../src/models/task";

describe("createTask", () => {
  it("creates a draft with defaults", () => {
    const draft = createTask("Test");
    expect(draft.title).toBe("Test");
    expect(draft.status).toBe("todo");
    expect(draft.priority).toBe("medium");
    expect(draft.tags).toEqual([]);
  });

  it("allows custom priority and tags", () => {
    const draft = createTask("Fix bug", {
      priority: "high",
      tags: ["backend"],
    });
    expect(draft.priority).toBe("high");
    expect(draft.tags).toEqual(["backend"]);
  });
});
