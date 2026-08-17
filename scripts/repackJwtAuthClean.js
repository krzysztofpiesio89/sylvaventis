const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pluginsDir = path.join(__dirname, 'plugins');
const zipPath = path.join(pluginsDir, 'wp-graphql-jwt-authentication.zip');
const tempDir = path.join(pluginsDir, 'temp_jwt_clean');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}

fs.mkdirSync(tempDir, { recursive: true });

// Unzip
execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${tempDir}' -Force"`);

console.log('Sprawdzanie struktury podfolderów w temp_jwt_clean:');
function findPluginPhp(dir) {
  const files = fs.readdirSync(dir);
  if (files.includes('wp-graphql-jwt-authentication.php')) {
    return dir;
  }
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      const res = findPluginPhp(full);
      if (res) return res;
    }
  }
  return null;
}

const phpDir = findPluginPhp(tempDir);
console.log('Znaleziono wp-graphql-jwt-authentication.php w:', phpDir);

if (phpDir) {
  const targetPluginFolder = path.join(pluginsDir, 'wp-graphql-jwt-authentication');
  if (fs.existsSync(targetPluginFolder)) fs.rmSync(targetPluginFolder, { recursive: true, force: true });

  // Move the actual plugin folder
  fs.cpSync(phpDir, targetPluginFolder, { recursive: true });

  // Re-zip
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  execSync(`powershell -Command "Compress-Archive -Path '${targetPluginFolder}' -DestinationPath '${zipPath}' -Force"`);

  // Cleanup
  fs.rmSync(targetPluginFolder, { recursive: true, force: true });
  fs.rmSync(tempDir, { recursive: true, force: true });

  console.log('[SUCCESS] Usunięto podwójne podfoldery. Prawidłowy czysty plik ZIP: ' + zipPath);
} else {
  console.error('[ERR] Nie znaleziono wp-graphql-jwt-authentication.php');
}
