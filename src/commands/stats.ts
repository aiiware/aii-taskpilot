/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/commands/stats.ts
import { Command } from 'commander';
import { TaskService } from '../services/task-service';
import { statusColors, priorityColors } from '../utils/colors';
import chalk from 'chalk';

export const statsCommand = new Command('stats')
  .description('Show task statistics')
  .action(() => {
    const service = new TaskService();
    const stats = service.getStats();

    console.log('📊 Task Statistics\n');

    // Status breakdown
    console.log(chalk.bold('By Status:'));
    
    Object.entries(stats.byStatus).forEach(([status, count]) => {
      const color = statusColors[status as keyof typeof statusColors];
      const bar = '█'.repeat(Math.round((count / stats.total) * 20) || 0);
      console.log(`  ${color(status.padEnd(6))} ${count.toString().padStart(3)} ${color(bar)}`);
    });

    console.log();

    // Priority breakdown
    console.log(chalk.bold('By Priority:'));
    
    Object.entries(stats.byPriority).forEach(([priority, count]) => {
      const color = priorityColors[priority as keyof typeof priorityColors];
      const bar = '█'.repeat(Math.round((count / stats.total) * 20) || 0);
      console.log(`  ${color(priority.padEnd(7))} ${count.toString().padStart(3)} ${color(bar)}`);
    });

    console.log();

    // Tags breakdown (top 10)
    const tagEntries = Object.entries(stats.byTag);
    if (tagEntries.length > 0) {
      console.log(chalk.bold('By Tag:'));
      tagEntries
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([tag, count]) => {
          const bar = '█'.repeat(Math.round((count / stats.total) * 20) || 0);
          console.log(`  ${chalk.cyan(tag.padEnd(12))} ${count.toString().padStart(3)} ${chalk.cyan(bar)}`);
        });
      console.log();
    }

    console.log(chalk.bold(`Total Tasks: ${stats.total}`));
  });