const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pluginsDir = path.join(__dirname, 'plugins');
const zipPath = path.join(pluginsDir, 'wp-graphql-headless-login.zip');
const tempDir = path.join(pluginsDir, 'temp_headless');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

fs.mkdirSync(tempDir, { recursive: true });

// Unzip
execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force"`);

const items = fs.readdirSync(tempDir);
console.log('Rozpakowane pliki:', items);

let sourceDir = '';
for (const item of items) {
  if (item.startsWith('wp-graphql-headless-login')) {
    sourceDir = path.join(tempDir, item);
    break;
  }
}

const targetDir = path.join(tempDir, 'wp-graphql-headless-login');

if (sourceDir && sourceDir !== targetDir) {
  fs.renameSync(sourceDir, targetDir);
}

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

execSync(`powershell -Command "Compress-Archive -Path '${targetDir}' -DestinationPath '${zipPath}' -Force"`);
fs.rmSync(tempDir, { recursive: true, force: true });

console.log('[SUCCESS] Naprawiono i spakowano wp-graphql-headless-login.zip');
