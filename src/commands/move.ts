/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/move.ts
import { Command } from 'commander';
import { TaskService } from '../services/task-service';
import { isValidStatus } from '../utils/validation';
import { statusColors } from '../utils/colors';

export const moveCommand = new Command('move')
  .description('Move a task to a new status')
  .argument('<id>', 'Task ID')
  .argument('<status>', 'New status (todo|doing|review|done)')
  .action((idStr, status) => {
    const service = new TaskService();
    
    // Validate ID
    const id = parseInt(idStr, 10);
    if (isNaN(id) || id <= 0) {
      console.error('Error: Task ID must be a positive number');
      process.exit(1);
    }

    // Validate status
    if (!isValidStatus(status)) {
      console.error(`Error: Status must be one of: todo, doing, review, done`);
      process.exit(1);
    }

    const task = service.getTask(id);
    if (!task) {
      console.error(`Error: Task #${id} not found. Run 'taskpilot list' to see available tasks.`);
      process.exit(1);
    }

    const updated = service.moveTask(id, status as 'todo' | 'doing' | 'review' | 'done');
    if (!updated) {
      console.error(`Error: Failed to move task #${id}`);
      process.exit(1);
    }

    console.log(`✅ Task #${id} moved to ${statusColors[updated.status](updated.status)}: "${updated.title}"`);
  });