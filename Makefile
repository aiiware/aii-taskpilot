# Makefile for taskpilot CLI
#
# Usage: make [target]

.PHONY: build test lint clean bump-major bump-minor bump-patch list publish help

# Get version from package.json
VERSION := $(shell grep '"version"' package.json | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/')

# Colors
CYAN := \033[36m
RESET := \033[0m

# Default target
help:
	@printf "$(CYAN)TaskPilot CLI - Build Commands$(RESET)\n"
	@echo ""
	@printf "$(CYAN)Current version: $(VERSION)$(RESET)\n"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  build       - Build the CLI (compile + bundle)"
	@echo "  list        - List package contents (npm pack --dry-run)"
	@echo "  test        - Run Jest tests"
	@echo "  lint        - Run ESLint"
	@echo "  publish     - Publish to npm registry"
	@echo "  bump-major  - Bump major version (x.0.0)"
	@echo "  bump-minor  - Bump minor version (0.x.0)"
	@echo "  bump-patch  - Bump patch version (0.0.x)"
	@echo "  clean       - Remove build artifacts"
	@echo "  format      - Format code with Prettier"

# Build the CLI
build:
	@echo "Building taskpilot..."
	npm run build:full
	@echo "Build complete: bin/taskpilot"

# Run tests
test:
	@echo "Running tests..."
	npm test

# Run linter
lint:
	@echo "Running ESLint..."
	npm run lint

# Format code
format:
	@echo "Formatting code with Prettier..."
	npm run format

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist bin coverage
	@echo "Clean complete"

# Bump major version (1.0.0 -> 2.0.0)
bump-major:
	@echo "Bumping major version..."
	@npm version major --no-git-tag-version
	@VERSION=$$(grep '"version"' package.json | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/'); \
	echo "New version: $$VERSION"; \
	echo "Run: git add package.json && git commit -m 'chore: bump version to v$$VERSION'"

# Bump minor version (1.0.0 -> 1.1.0)
bump-minor:
	@echo "Bumping minor version..."
	@npm version minor --no-git-tag-version
	@VERSION=$$(grep '"version"' package.json | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/'); \
	echo "New version: $$VERSION"; \
	echo "Run: git add package.json && git commit -m 'chore: bump version to v$$VERSION'"

# Bump patch version (1.0.0 -> 1.0.1)
bump-patch:
	@echo "Bumping patch version..."
	@npm version patch --no-git-tag-version
	@VERSION=$$(grep '"version"' package.json | head -1 | sed 's/.*: *"\([^"]*\)".*/\1/'); \
	echo "New version: $$VERSION"; \
	echo "Run: git add package.json && git commit -m 'chore: bump version to v$$VERSION'"

# List package contents (like vsce ls for npm packages)
list:
	@echo "Package contents (files that will be published):"
	@echo "================================================"
	@npm pack --dry-run 2>&1
	@echo ""
	@echo "Package info:"
	@echo "  Name: @aiiware/taskpilot"
	@echo "  Version: $$(grep '"version"' package.json | head -1 | sed 's/.*: *\"\([^\"]*\)\".*/\1/')"
	@echo "  Main binary: ./bin/taskpilot"

# Publish to npm (builds first)
publish: clean build test
	@echo ""
	@echo "Ready to publish @aiiware/taskpilot v$$(grep '"version"' package.json | head -1 | sed 's/.*: *\"\([^\"]*\)\".*/\1/')"
	@echo "================================================"
	@npm pack --dry-run 2>&1
	@echo ""
	@read -p "Proceed with npm publish? [y/N] " confirm && [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]
	npm publish --access public
	@echo ""
	@echo "Published! Install with: npm install -g @aiiware/taskpilot"
