/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/services/task-service.test.ts
import { TaskService } from '../../src/services/task-service';
import fs from 'fs';
import path from 'path';

describe('TaskService', () => {
  const originalEnv = process.env.TASKPILOT_HOME;
  let tempDir: string;
  let service: TaskService;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(__dirname, 'taskpilot-test-'));
    process.env.TASKPILOT_HOME = tempDir;
    service = new TaskService();
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    process.env.TASKPILOT_HOME = originalEnv;
  });

  describe('addTask', () => {
    it('adds a task with defaults', () => {
      const task = service.addTask('Test task');
      
      expect(task.id).toBe(1);
      expect(task.title).toBe('Test task');
      expect(task.status).toBe('todo');
      expect(task.priority).toBe('medium');
      expect(task.tags).toEqual([]);
      expect(task.createdAt).toBeDefined();
      expect(task.updatedAt).toBeDefined();
    });

    it('adds a task with custom options', () => {
      const task = service.addTask('Fix bug', { priority: 'high', tags: ['backend', 'bug'] });
      
      expect(task.id).toBe(1);
      expect(task.title).toBe('Fix bug');
      expect(task.priority).toBe('high');
      expect(task.tags).toEqual(['backend', 'bug']);
    });

    it('increments nextId after adding tasks', () => {
      const task1 = service.addTask('First');
      const task2 = service.addTask('Second');
      
      expect(task1.id).toBe(1);
      expect(task2.id).toBe(2);
    });
  });

  describe('getTasks', () => {
    beforeEach(() => {
      service.addTask('Task 1', { priority: 'low', tags: ['chore'] });
      const task2 = service.addTask('Task 2', { priority: 'high', tags: ['feature'] });
      const task3 = service.addTask('Task 3', { priority: 'medium', tags: ['chore', 'bug'] });
      service.addTask('Task 4', { priority: 'high', tags: ['feature'] });
      
      // Move tasks to different statuses
      service.moveTask(task2.id, 'doing');
      service.moveTask(task3.id, 'done');
    });

    it('returns all tasks without filters', () => {
      const tasks = service.getTasks();
      expect(tasks).toHaveLength(4);
    });

    it('filters by status', () => {
      const tasks = service.getTasks({ status: 'todo' });
      expect(tasks).toHaveLength(2);
      expect(tasks.every(t => t.status === 'todo')).toBe(true);
    });

    it('filters by priority', () => {
      const tasks = service.getTasks({ priority: 'high' });
      expect(tasks).toHaveLength(2);
      expect(tasks.every(t => t.priority === 'high')).toBe(true);
    });

    it('filters by tag', () => {
      const tasks = service.getTasks({ tag: 'chore' });
      expect(tasks).toHaveLength(2);
      expect(tasks.every(t => t.tags.includes('chore'))).toBe(true);
    });

    it('filters by multiple criteria', () => {
      const tasks = service.getTasks({ status: 'todo', priority: 'high' });
      expect(tasks).toHaveLength(1);
      expect(tasks[0].title).toBe('Task 4');
    });
  });

  describe('moveTask', () => {
    it('moves a task to new status', () => {
      const task = service.addTask('Test');
      const updated = service.moveTask(task.id, 'doing');
      
      expect(updated).toBeDefined();
      expect(updated!.status).toBe('doing');
      expect(updated!.updatedAt).toBeDefined();
    });

    it('returns undefined for non-existent task', () => {
      const result = service.moveTask(999, 'doing');
      expect(result).toBeUndefined();
    });
  });

  describe('doneTask', () => {
    it('marks a task as done', () => {
      const task = service.addTask('Test');
      const updated = service.doneTask(task.id);
      
      expect(updated).toBeDefined();
      expect(updated!.status).toBe('done');
    });
  });

  describe('removeTask', () => {
    it('removes a task', () => {
      const task = service.addTask('Test');
      const removed = service.removeTask(task.id);
      
      expect(removed).toBe(true);
      expect(service.getTasks()).toHaveLength(0);
    });

    it('returns false for non-existent task', () => {
      const removed = service.removeTask(999);
      expect(removed).toBe(false);
    });
  });

  describe('getStats', () => {
    beforeEach(() => {
      service.addTask('Task 1', { priority: 'low', tags: ['chore'] });
      const task2 = service.addTask('Task 2', { priority: 'high', tags: ['feature'] });
      const task3 = service.addTask('Task 3', { priority: 'medium', tags: ['chore', 'bug'] });
      service.addTask('Task 4', { priority: 'high', tags: ['feature'] });
      
      // Move tasks to different statuses
      service.moveTask(task2.id, 'doing');
      service.moveTask(task3.id, 'done');
    });

    it('returns correct statistics', () => {
      const stats = service.getStats();
      
      expect(stats.total).toBe(4);
      expect(stats.byStatus.todo).toBe(2);
      expect(stats.byStatus.doing).toBe(1);
      expect(stats.byStatus.done).toBe(1);
      expect(stats.byStatus.review).toBe(0);
      
      expect(stats.byPriority.low).toBe(1);
      expect(stats.byPriority.medium).toBe(1);
      expect(stats.byPriority.high).toBe(2);
      
      expect(stats.byTag.chore).toBe(2);
      expect(stats.byTag.feature).toBe(2);
      expect(stats.byTag.bug).toBe(1);
    });
  });

  describe('getTask', () => {
    it('returns task by ID', () => {
      const task = service.addTask('Test');
      const found = service.getTask(task.id);
      
      expect(found).toEqual(task);
    });

    it('returns undefined for non-existent task', () => {
      const found = service.getTask(999);
      expect(found).toBeUndefined();
    });
  });
});