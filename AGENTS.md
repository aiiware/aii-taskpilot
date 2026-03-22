# AII.md/AGENTS.md — TaskPilot

## What Is This Project

**TaskPilot** is a CLI task board tool — a local, file-based Trello from the terminal. TypeScript, strict mode, zero external dependencies beyond Commander.js.

## Project Structure

```
taskpilot/
├── src/
│   ├── index.ts          # Entry point, Commander CLI setup
│   ├── commands/         # One file per CLI command (add, list, move, done, stats)
│   ├── models/           # Data types (Task, Board)
│   ├── storage/          # File-based persistence (~/.taskpilot/)
│   └── utils/            # Formatting, validation helpers
├── tests/
│   ├── models/           # Unit tests for data model
│   ├── storage/          # Unit tests for persistence
│   └── commands/         # Integration tests for CLI commands
├── package.json
├── tsconfig.json
└── AII.md                # This file
```

## Commands

| Command | Description |
| --- | --- |
| `taskpilot add "title" [--priority high] [--tag backend]` | Create a task (defaults: priority=medium, status=todo) |
| `taskpilot list [--status todo] [--tag backend] [--priority high]` | List tasks with optional filters |
| `taskpilot move <id> <status>` | Move task to new status (todo/doing/review/done) |
| `taskpilot done <id>` | Shortcut for `move <id> done` |
| `taskpilot stats` | Show task counts by status and tag |
| `taskpilot remove <id>` | Delete a task |

## Data Model

```typescript
interface Task {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: string;  // ISO 8601
  updatedAt: string;  // ISO 8601
}

interface Board {
  name: string;
  tasks: Task[];
  nextId: number;
}
```

## Storage

- Board data stored as JSON at `~/.taskpilot/default.json`
- Use `TASKPILOT_HOME` env var for test isolation
- Create directory + file on first use (not on install)
- Pretty-print JSON (2-space indent) for human readability

## Development Rules

- **TDD**: Write the failing test FIRST, then implement. No exceptions.
- **TypeScript strict**: `"strict": true` in tsconfig. No `any` types.
- **Pure functions where possible**: Commands are thin wrappers around testable pure functions.
- **Input validation**: All user input validated at the CLI boundary. Internal functions trust their callers.
- **Error messages**: Always include what went wrong AND how to fix it.
  - Bad: `"Task not found"`
  - Good: `"Task #42 not found. Run 'taskpilot list' to see available tasks."`
- **No over-engineering**: No database, no config file, no plugin system. Just files and functions.

## Testing

- Framework: Jest with ts-jest
- Coverage target: >90% for `src/models/` and `src/storage/`, >80% overall
- Test isolation: Use `TASKPILOT_HOME` env var pointed to temp directory
- Test naming: `describe('functionName')` → `it('does X when Y')`

## Git

- Conventional commits: `feat:`, `fix:`, `test:`, `refactor:`, `docs:`
- One logical change per commit
- Never commit failing tests

## Dependencies (Keep Minimal)

- `commander` — CLI argument parsing
- `chalk` — terminal colors (optional)
- `typescript` — build
- `jest` + `ts-jest` — testing
- Nothing else. No ORMs, no frameworks, no utility libraries.
