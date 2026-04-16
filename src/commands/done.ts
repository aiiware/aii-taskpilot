/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/done.ts
import { Command } from "commander";
import { TaskService } from "../services/task-service";
import chalk from "chalk";

export const doneCommand = new Command("done")
  .description('Mark a task as done (shortcut for "move <id> done")')
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

    const updated = service.doneTask(id);
    if (!updated) {
      console.error(`Error: Failed to mark task #${id} as done`);
      process.exit(1);
    }

    console.log(
      `✅ Task #${id} marked as ${chalk.green("done")}: "${updated.title}"`,
    );
  });