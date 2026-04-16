/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

import { Command } from 'commander';
import { addCommand, listCommand, moveCommand, doneCommand, statsCommand, removeCommand } from './commands';

const program = new Command();

program
  .name('taskpilot')
  .description('A CLI task board tool — a local, file-based Trello from the terminal')
  .version('0.1.0');

// Add commands
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(moveCommand);
program.addCommand(doneCommand);
program.addCommand(statsCommand);
program.addCommand(removeCommand);

program.parse();