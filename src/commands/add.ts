/**
 * Copyright (c) 2024 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/add.ts
import { Command } from 'commander';
import { TaskService } from '../services/task-service';
import { isValidPriority } from '../utils/validation';

interface AddOptions {
  priority: string;
  tags?: string;
}

export const addCommand = new Command('add')
  .description('Create a new task')
  .argument('<title>', 'Task title')
  .option('-p, --priority <priority>', 'Task priority (low|medium|high)', 'medium')
  .option('-t, --tags <tags>', 'Comma-separated tags (e.g., "backend,api")')
  .action((title: string, options: AddOptions) => {
    const service = new TaskService();
    
    // Validate priority
    if (!isValidPriority(options.priority)) {
      console.error(`Error: Priority must be one of: low, medium, high`);
      process.exit(1);
    }

    // Parse tags from comma-separated string with deduplication
    const tags = options.tags 
      ? [...new Set(options.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean))]
      : [];

    const task = service.addTask(title, {
      priority: options.priority as 'low' | 'medium' | 'high',
      tags,
    });

    console.log(`✅ Task #${task.id} created: "${task.title}"`);
    console.log(`   Status: ${task.status}, Priority: ${task.priority}`);
    if (task.tags.length > 0) {
      console.log(`   Tags: ${task.tags.join(', ')}`);
    }
  });