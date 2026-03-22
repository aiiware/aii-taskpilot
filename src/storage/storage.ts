// storage.ts
import { Board } from '../models';
import fs from 'fs';
import path from 'path';
import os from 'os';

const DEFAULT_FILE = 'default.json';

export function getHomeDir(): string {
  return process.env.TASKPILOT_HOME ?? path.join(os.homedir(), '.taskpilot');
}

export function getFilePath(): string {
  return path.join(getHomeDir(), DEFAULT_FILE);
}

export function ensureStorage(): void {
  const dir = getHomeDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const file = getFilePath();
  if (!fs.existsSync(file)) {
    const board: Board = { name: 'default', tasks: [], nextId: 1 };
    fs.writeFileSync(file, JSON.stringify(board, null, 2), 'utf-8');
  }
}

export function loadBoard(): Board {
  ensureStorage();
  const raw = fs.readFileSync(getFilePath(), 'utf-8');
  return JSON.parse(raw) as Board;
}

export function saveBoard(board: Board): void {
  ensureStorage(); // Keep this for robustness - saveBoard might be called without loadBoard
  fs.writeFileSync(getFilePath(), JSON.stringify(board, null, 2), 'utf-8');
}