const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://codeload.github.com/axewp/wp-graphql-headless-login/zip/refs/heads/main';
const targetDir = path.join(__dirname, 'plugins');
const zipFile = path.join(targetDir, 'wp-graphql-headless-login.zip');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(downloadUrl, targetPath) {
  return new Promise((resolve, reject) => {
    https.get(downloadUrl, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, targetPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(targetPath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(targetPath, () => reject(err));
    });
  });
}

async function main() {
  console.log('Pobieranie surowej paczki wp-graphql-headless-login...');
  try {
    await download(url, zipFile);
    console.log(`[OK] Pobrano: ${zipFile}`);
  } catch (e) {
    console.error(`[ERR] ${e.message}`);
  }
}

main();
