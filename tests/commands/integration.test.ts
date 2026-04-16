/**
 * Copyright (c) 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 */

// tests/commands/integration.test.ts
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

describe('CLI Integration', () => {
  const originalEnv = process.env.TASKPILOT_HOME;
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(__dirname, 'taskpilot-cli-test-'));
    process.env.TASKPILOT_HOME = tempDir;
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    process.env.TASKPILOT_HOME = originalEnv;
  });

  const runCli = (args: string): string => {
    try {
      return execSync(`node ${path.join(__dirname, '../../dist/index.js')} ${args}`, {
        encoding: 'utf-8',
        env: { ...process.env, TASKPILOT_HOME: tempDir },
      });
    } catch (error: any) {
      return error.stdout || error.message;
    }
  };

  it('shows help', () => {
    const output = runCli('--help');
    expect(output).toContain('taskpilot');
    expect(output).toContain('add');
    expect(output).toContain('list');
    expect(output).toContain('move');
    expect(output).toContain('done');
    expect(output).toContain('stats');
    expect(output).toContain('remove');
  });

  it('adds and lists tasks', () => {
    // Add a task
    let output = runCli('add "Test task" --priority high --tags backend,bug');
    expect(output).toContain('Task #1 created');
    expect(output).toContain('Test task');
    expect(output).toContain('high');
    
    // List tasks
    output = runCli('list');
    expect(output).toContain('Test task');
    expect(output).toContain('high');
    expect(output).toContain('backend');
    expect(output).toContain('bug');
  });

  it('moves tasks', () => {
    runCli('add "Task to move"');
    
    let output = runCli('move 1 doing');
    expect(output).toContain('moved to doing');
    
    output = runCli('list --status doing');
    expect(output).toContain('Task to move');
    expect(output).toContain('doing');
  });

  it('marks tasks as done', () => {
    runCli('add "Task to complete"');
    
    let output = runCli('done 1');
    expect(output).toContain('marked as done');
    
    output = runCli('list --status done');
    expect(output).toContain('Task to complete');
    expect(output).toContain('done');
  });

  it('shows statistics', () => {
    runCli('add "Task 1" --priority low --tags chore');
    runCli('add "Task 2" --priority high --tags feature');
    runCli('done 2');
    
    const output = runCli('stats');
    expect(output).toContain('Statistics');
    expect(output).toContain('By Status');
    expect(output).toContain('By Priority');
    expect(output).toContain('By Tag');
    expect(output).toContain('Total Tasks: 2');
  });

  it('removes tasks', () => {
    runCli('add "Task to remove"');
    
    let output = runCli('list');
    expect(output).toContain('Task to remove');
    
    output = runCli('remove 1');
    expect(output).toContain('removed');
    
    output = runCli('list');
    expect(output).toContain('No tasks found');
  });

  it('validates input', () => {
    // Invalid priority
    let output = runCli('add "Test" --priority invalid');
    expect(output).toContain('Error');
    expect(output).toContain('Priority must be one of');
    
    // Invalid status
    output = runCli('move 1 invalid');
    expect(output).toContain('Error');
    expect(output).toContain('Status must be one of');
    
    // Invalid ID
    output = runCli('move abc doing');
    expect(output).toContain('Error');
    expect(output).toContain('Task ID must be a positive number');
    
    // Non-existent task
    output = runCli('move 999 doing');
    expect(output).toContain('Error');
    expect(output).toContain('not found');
  });
});