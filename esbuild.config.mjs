import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';

// Read package.json for version info
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Build banner (without shebang since source already has it)
const banner = `/**
 * taskpilot v${pkg.version}
 *
 * A CLI task board tool — a local, file-based Trello from the terminal
 *
 * Copyright 2024-2026 TaskPilot Contributors
 * Licensed under the MIT License.
 *
 * https://github.com/aiiware/taskpilot
 */
`;

await esbuild.build({
  entryPoints: ['dist/index.js'],
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node18',
  outfile: 'bin/taskpilot',
  format: 'cjs',
  banner: {
    js: banner,
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version),
  },
  // Externalize dependencies that should not be bundled
  external: [
    'chalk',
    'commander',
  ],
});

console.log(`Build complete: bin/taskpilot (v${pkg.version})`);