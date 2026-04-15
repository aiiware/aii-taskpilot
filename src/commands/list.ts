/**
 * Copyright (c) 2024 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/list.ts
import { Command } from 'commander';
import { TaskService } from '../services/task-service';
import { isValidStatus, isValidPriority } from '../utils/validation';
import { statusColors, priorityColors } from '../utils/colors';
import chalk from 'chalk';

export const listCommand = new Command('list')
  .description('List tasks with optional filters')
  .option('-s, --status <status>', 'Filter by status (todo|doing|review|done)')
  .option('-p, --priority <priority>', 'Filter by priority (low|medium|high)')
  .option('-t, --tag <tag>', 'Filter by tag')
  .action((options) => {
    const service = new TaskService();
    
    // Validate status if provided
    if (options.status && !isValidStatus(options.status)) {
      console.error(`Error: Status must be one of: todo, doing, review, done`);
      process.exit(1);
    }

    // Validate priority if provided
    if (options.priority && !isValidPriority(options.priority)) {
      console.error(`Error: Priority must be one of: low, medium, high`);
      process.exit(1);
    }

    const tasks = service.getTasks({
      status: options.status as 'todo' | 'doing' | 'review' | 'done' | undefined,
      priority: options.priority as 'low' | 'medium' | 'high' | undefined,
      tag: options.tag,
    });

    if (tasks.length === 0) {
      console.log('No tasks found.');
      return;
    }

    console.log(`📋 Tasks (${tasks.length}):\n`);

    tasks.forEach(task => {
      console.log(`  ${chalk.bold(`#${task.id}`)} ${task.title}`);
      console.log(`    Status: ${statusColors[task.status](task.status)}`);
      console.log(`    Priority: ${priorityColors[task.priority](task.priority)}`);
      if (task.tags.length > 0) {
        console.log(`    Tags: ${task.tags.map(t => chalk.cyan(t)).join(', ')}`);
      }
      console.log(`    Created: ${new Date(task.createdAt).toISOString().split('T')[0]}`);
      console.log();
    });
  });