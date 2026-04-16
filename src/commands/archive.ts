/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/archive.ts
import { Command } from 'commander';
import { TaskService } from '../services/task-service';
import { cliLogger } from '../utils/logger';

// The `archive` command marks a task as archived, removing it from active lists.
// It mirrors the `done` command but uses the `archiveTask` method on the service.

export const archiveCommand = new Command('archive')
  .description('Mark a task as archived (removes it from active lists)')
  .argument('<id>', 'Task ID')
  .action((idStr) => {
    const service = new TaskService();

    // Validate ID
    const id = parseInt(idStr, 10);
    if (isNaN(id) || id <= 0) {
      cliLogger.error('Task ID must be a positive number');
      process.exit(1);
    }

    const task = service.getTask(id);
    if (!task) {
      cliLogger.error(`Task #${id} not found. Run 'taskpilot list' to see available tasks.`);
      process.exit(1);
    }

    const updated = service.archiveTask(id);
    if (!updated) {
      cliLogger.error(`Failed to archive task #${id}`);
      process.exit(1);
    }

    cliLogger.success(`Task #${id} archived: "${updated.title}"`);
  });