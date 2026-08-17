const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://codeload.github.com/axewp/wp-graphql-headless-login/zip/refs/heads/main';
const destDir = path.join(__dirname, 'plugins');
const destFile = path.join(destDir, 'wp-graphql-headless-login.zip');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadFile(downloadUrl, targetPath) {
  return new Promise((resolve, reject) => {
    https.get(downloadUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, targetPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(targetPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(targetPath, () => reject(err));
    });
  });
}

async function main() {
  console.log('Pobieranie wtyczki Headless Login for WPGraphQL z GitHub...');
  try {
    await downloadFile(url, destFile);
    console.log(`[OK] Pobrano paczkę ZIP: ${destFile}`);
  } catch (err) {
    console.error(`[ERR] Błąd pobierania: ${err.message}`);
  }
}

main();
