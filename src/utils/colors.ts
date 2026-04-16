/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// utils/colors.ts
import chalk from "chalk";

// In chalk 5.x, we need to use the default export
const chalkInstance = chalk;

export const statusColors = {
  todo: chalkInstance.blue,
  doing: chalkInstance.yellow,
  review: chalkInstance.magenta,
  done: chalkInstance.green,
};

export const priorityColors = {
  low: chalkInstance.gray,
  medium: chalkInstance.white,
  high: chalkInstance.red,
};