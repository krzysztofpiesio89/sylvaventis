const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pluginsDir = path.join(__dirname, 'plugins');
const zipPath = path.join(pluginsDir, 'wp-graphql-headless-login.zip');
const tempDir = path.join(pluginsDir, 'temp_inspect');

if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
fs.mkdirSync(tempDir, { recursive: true });

execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force"`);

function findComposerJson(dir) {
  const items = fs.readdirSync(dir);
  if (items.includes('composer.json')) return path.join(dir, 'composer.json');
  for (const item of items) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      const res = findComposerJson(full);
      if (res) return res;
    }
  }
  return null;
}

const cJsonPath = findComposerJson(tempDir);
if (cJsonPath) {
  console.log('--- COMPOSER.JSON ---');
  console.log(fs.readFileSync(cJsonPath, 'utf-8'));
} else {
  console.log('Nie znaleziono composer.json');
}

fs.rmSync(tempDir, { recursive: true, force: true });
