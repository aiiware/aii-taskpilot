/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

import { Command } from 'commander';
import { VERSION } from '../constants';

export const versionCommand = new Command()
  .name('version')
  .description('Show the current version')
  .action(() => {
    console.log(VERSION);
  });