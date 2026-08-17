const fs = require('fs');
const path = require('path');
const https = require('https');

const releaseUrl = 'https://github.com/AxeWP/wp-graphql-headless-login/releases/latest/download/wp-graphql-headless-login.zip';
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
  console.log('Pobieranie oficjalnego skompilowanego wydania Headless Login z Composer vendor...');
  try {
    if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
    await download(releaseUrl, zipFile);
    console.log(`[SUCCESS] Pobrano w 100% skompilowaną wtyczkę z vendor: ${zipFile}`);
  } catch (e) {
    console.error(`[ERR] ${e.message}`);
  }
}

main();
