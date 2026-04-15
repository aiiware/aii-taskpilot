/**
 * Copyright (c) 2024 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// utils/validation.ts
export function isValidStatus(val: string): val is 'todo' | 'doing' | 'review' | 'done' {
  return ['todo', 'doing', 'review', 'done'].includes(val);
}

export function isValidPriority(val: string): val is 'low' | 'medium' | 'high' {
  return ['low', 'medium', 'high'].includes(val);
}