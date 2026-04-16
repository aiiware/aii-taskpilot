/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/remove.ts
import { Command } from "commander";
import { TaskService } from "../services/task-service";

export const removeCommand = new Command("remove")
  .description("Remove a task from the board")
  .argument("<id>", "Task ID")
  .action((idStr) => {
    const service = new TaskService();

    // Validate ID
    const id = parseInt(idStr, 10);
    if (isNaN(id) || id <= 0) {
      console.error("Error: Task ID must be a positive number");
      process.exit(1);
    }

    const task = service.getTask(id);
    if (!task) {
      console.error(
        `Error: Task #${id} not found. Run 'taskpilot list' to see available tasks.`,
      );
      process.exit(1);
    }

    const removed = service.removeTask(id);
    if (!removed) {
      console.error(`Error: Failed to remove task #${id}`);
      process.exit(1);
    }

    console.log(`🗑️  Task #${id} removed: "${task.title}"`);
  });
