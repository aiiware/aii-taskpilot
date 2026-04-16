/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// src/services/task-service.ts
import { Board, Task, createTask } from "../models";
import { loadBoard, saveBoard } from "../storage/storage";

/**
 * Service for managing tasks in the board.
 */
export class TaskService {
  private board: Board;

  constructor() {
    this.board = loadBoard();
  }

  /**
   * Add a new task to the board.
   * @param title - Task title
   * @param options - Optional priority and tags
   * @returns The created task
   */
  addTask(
    title: string,
    options?: { priority?: "low" | "medium" | "high"; tags?: string[] },
  ): Task {
    const draft = createTask(title, options);
    const now = new Date().toISOString();

    const task: Task = {
      ...draft,
      id: this.board.nextId,
      createdAt: now,
      updatedAt: now,
    };

    this.board.tasks.push(task);
    this.board.nextId++;
    this.save();

    return task;
  }

  /**
   * Get all tasks, optionally filtered.
   */
  getTasks(filters?: {
    status?: Task["status"];
    priority?: Task["priority"];
    tag?: string;
  }): Task[] {
    return this.board.tasks.filter((task) => {
      if (filters?.status && task.status !== filters.status) return false;
      if (filters?.priority && task.priority !== filters.priority) return false;
      if (filters?.tag && !task.tags.includes(filters.tag)) return false;
      return true;
    });
  }

  /**
   * Move a task to a new status.
   * @param id - Task ID
   * @param status - New status
   * @returns The updated task, or undefined if not found
   */
  moveTask(id: number, status: Task["status"]): Task | undefined {
    const task = this.board.tasks.find((t) => t.id === id);
    if (!task) return undefined;

    task.status = status;
    task.updatedAt = new Date().toISOString();
    this.save();

    return task;
  }

  /**
   * Mark a task as done.
   * @param id - Task ID
   * @returns The updated task, or undefined if not found
   */
  doneTask(id: number): Task | undefined {
    return this.moveTask(id, "done");
  }

  /**
   * Mark a task as archived (done).
   * @param id - Task ID
   * @returns The updated task, or undefined if not found
   */
  archiveTask(id: number): Task | undefined {
    return this.moveTask(id, "done");
  }

  /**
   * Remove a task from the board.
   * @param id - Task ID
   * @returns true if task was removed, false if not found
   */
  removeTask(id: number): boolean {
    const index = this.board.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.board.tasks.splice(index, 1);
    this.save();
    return true;
  }

  /**
   * Get statistics about tasks.
   */
  getStats(): {
    byStatus: Record<Task["status"], number>;
    byTag: Record<string, number>;
    byPriority: Record<Task["priority"], number>;
    total: number;
  } {
    const byStatus: Record<Task["status"], number> = {
      todo: 0,
      doing: 0,
      review: 0,
      done: 0,
    };

    const byPriority: Record<Task["priority"], number> = {
      low: 0,
      medium: 0,
      high: 0,
    };

    const byTag: Record<string, number> = {};

    this.board.tasks.forEach((task) => {
      byStatus[task.status]++;
      byPriority[task.priority]++;

      task.tags.forEach((tag) => {
        byTag[tag] = (byTag[tag] || 0) + 1;
      });
    });

    return {
      byStatus,
      byPriority,
      byTag,
      total: this.board.tasks.length,
    };
  }

  /**
   * Get a task by ID.
   */
  getTask(id: number): Task | undefined {
    return this.board.tasks.find((t) => t.id === id);
  }

  private save(): void {
    saveBoard(this.board);
  }
}
