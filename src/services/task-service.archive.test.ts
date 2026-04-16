/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

jest.mock('../storage/storage', () => ({
  loadBoard: jest.fn(() => ({ name: 'default', tasks: [], nextId: 1 })),
  saveBoard: jest.fn(),
}));

import { TaskService } from './task-service';

describe('TaskService.archiveTask', () => {
  let service: TaskService;
  beforeEach(() => {
    service = new TaskService();
  });

  it('archives an existing task', () => {
    const created = service.addTask('Test task');
    const archived = service.archiveTask(created.id);
    expect(archived).toBeDefined();
    expect(archived?.status).toBe('done');
  });

  it('returns undefined for non-existent task', () => {
    const archived = service.archiveTask(9999);
    expect(archived).toBeUndefined();
  });
});