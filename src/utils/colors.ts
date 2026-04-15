/**
 * Copyright (c) 2024 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// utils/colors.ts
import chalk from 'chalk';

export const statusColors = {
  todo: chalk.blue,
  doing: chalk.yellow,
  review: chalk.magenta,
  done: chalk.green,
};

export const priorityColors = {
  low: chalk.gray,
  medium: chalk.white,
  high: chalk.red,
};