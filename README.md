# TaskPilot 🚀

A CLI task board tool — a local, file-based Trello from the terminal. **Developed with Aii 🪼**

[![npm version](https://img.shields.io/npm/v/@aiiware/taskpilot)](https://www.npmjs.com/package/@aiiware/taskpilot)
[![GitHub](https://img.shields.io/badge/GitHub-aiiware%2Faii--taskpilot-blue)](https://github.com/aiiware/aii-taskpilot)

## Installation

### From npm (recommended)
```bash
npm install -g @aiiware/taskpilot
```

### From source
```bash
# Clone the repository
git clone https://github.com/aiiware/aii-taskpilot.git
cd aii-taskpilot

# Install dependencies
npm install

# Build the project
npm run build

# Install globally (optional)
npm link
```

## Features

- **Local & Private**: All data stored in `~/.taskpilot/` — no cloud, no accounts
- **Fast**: Instant operations, no network latency
- **Flexible**: Filter tasks by status, priority, or tags
- **Visual**: Color-coded output with statistics
- **Zero Dependencies**: Just Node.js and your terminal

## Usage

### Add a Task
```bash
taskpilot add "Fix login bug" --priority high --tag backend --tag bug
```

### List Tasks
```bash
# Show all tasks
taskpilot list

# Filter by status
taskpilot list --status todo

# Filter by priority
taskpilot list --priority high

# Filter by tag
taskpilot list --tag backend

# Combine filters
taskpilot list --status todo --priority high --tag bug
```

### Move Tasks
```bash
# Move to different status
taskpilot move 1 doing
taskpilot move 2 review

# Mark as done (shortcut)
taskpilot done 3
```

### View Statistics
```bash
taskpilot stats
```
Shows breakdown by status, priority, and tags with visual bars.

### Remove Tasks
```bash
taskpilot remove 4
```

### Check Version
```bash
taskpilot --version
# or
taskpilot version
```

## Data Model

Tasks have:
- **ID**: Auto-incrementing number
- **Title**: Required description
- **Status**: `todo` → `doing` → `review` → `done`
- **Priority**: `low`, `medium`, or `high`
- **Tags**: Custom labels (e.g., `backend`, `bug`, `feature`)
- **Timestamps**: Created and updated ISO dates

## Storage

- Location: `~/.taskpilot/default.json`
- Override: Set `TASKPILOT_HOME` environment variable
- Format: Human-readable JSON with 2-space indentation

## Development

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## Architecture

```
src/
├── index.ts              # CLI entry point
├── commands/             # CLI command definitions
├── services/             # Business logic (TaskService)
├── models/               # Data types (Task, Board)
├── storage/              # File persistence
└── utils/                # Helpers
```

## Design Principles

1. **TDD First**: Write failing tests before implementation
2. **Pure Functions**: Business logic is testable and side-effect free
3. **Type Safety**: TypeScript strict mode, no `any` types
4. **User Experience**: Clear error messages with actionable fixes
5. **Simplicity**: No databases, no config files, no plugins

## Built with Aii 🪼

This project was developed using [Aii](https://aiiware.com) — an AI-powered development assistant that helps write, test, and ship code faster. The development process followed Aii's TDD-first approach with comprehensive test coverage and clean architecture.

## License

MIT