const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pluginsDir = path.join(__dirname, 'plugins');
const tempHeadless = path.join(pluginsDir, 'temp_headless');
const targetZip = path.join(pluginsDir, 'wp-graphql-headless-login.zip');

if (fs.existsSync(tempHeadless)) {
  const items = fs.readdirSync(tempHeadless);
  let innerPath = tempHeadless;
  if (items.length === 1 && fs.statSync(path.join(tempHeadless, items[0])).isDirectory()) {
    innerPath = path.join(tempHeadless, items[0]);
  }

  // Create clean zip
  execSync(`powershell -Command "Compress-Archive -Path '${innerPath}' -DestinationPath '${targetZip}' -Force"`);
  fs.rmSync(tempHeadless, { recursive: true, force: true });
  console.log('[SUCCESS] Spakowano wp-graphql-headless-login.zip');
} else {
  console.log('Brak folderu temp_headless');
}
