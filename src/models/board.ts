/**
 * Copyright (c) 2024 TaskPilot Contributors
 * Licensed under the MIT License.
 */

import { Task } from './task';

export interface Board {
  name: string;
  tasks: Task[];
  nextId: number;
}