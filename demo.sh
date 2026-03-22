#!/bin/bash
# Example usage of TaskPilot

echo "=== TaskPilot Demo ==="
echo

# Set a temporary directory for demo
export TASKPILOT_HOME=$(mktemp -d)
echo "Using temporary directory: $TASKPILOT_HOME"
echo

# Build the project if needed
echo "Building TaskPilot..."
npm run build > /dev/null 2>&1
echo "✓ Build complete"
echo

# Add some tasks
echo "1. Adding tasks..."
node dist/index.js add "Implement user authentication" --priority high --tags backend,security
node dist/index.js add "Fix responsive layout on mobile" --priority medium --tags frontend,css
node dist/index.js add "Write API documentation" --priority low --tags docs
node dist/index.js add "Investigate performance issue" --priority high --tags backend,performance
echo

# List all tasks
echo "2. Listing all tasks:"
node dist/index.js list
echo

# Filter by priority
echo "3. High priority tasks:"
node dist/index.js list --priority high
echo

# Move a task
echo "4. Moving task #1 to 'doing':"
node dist/index.js move 1 doing
echo

# Mark a task as done
echo "5. Marking task #2 as done:"
node dist/index.js done 2
echo

# Show statistics
echo "6. Current statistics:"
node dist/index.js stats
echo

# Clean up
rm -rf "$TASKPILOT_HOME"
echo "Demo complete! Temporary data cleaned up."