#!/usr/bin/env node
/**
 * Zips .cursor/ directory into docs/assets/product-agentic-templates.zip
 * Run when .cursor/ changes: node scripts/zip-cursor.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const cursorDir = path.join(repoRoot, '.cursor');
const outputDir = path.join(repoRoot, 'docs', 'assets');
const outputPath = path.join(outputDir, 'product-agentic-templates.zip');

if (!fs.existsSync(cursorDir)) {
  console.error('Error: .cursor/ directory not found');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Use zip command (available on macOS/Linux)
const cwd = path.dirname(cursorDir);
const cursorBasename = path.basename(cursorDir);
execSync(`zip -r "${outputPath}" "${cursorBasename}"`, {
  cwd,
  stdio: 'inherit',
});
console.log(`Created ${outputPath}`);
