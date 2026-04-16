/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// Task model and factory

/**
 * Represents a single task in TaskPilot.
 */
export interface Task {
  id: number;
  title: string;
  status: "todo" | "doing" | "review" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/**
 * Draft of a task without id and timestamps. Used for creation before persisting.
 */
export type TaskDraft = Omit<Task, "id" | "createdAt" | "updatedAt">;

/**
 * Create a task draft with default values.
 * @param title - Title of the task
 * @param options - Optional priority and tags
 */
export function createTask(
  title: string,
  {
    priority = "medium",
    tags = [],
  }: { priority?: "low" | "medium" | "high"; tags?: string[] } = {},
): TaskDraft {
  return {
    title,
    status: "todo",
    priority,
    tags,
  };
}
