const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip';
const dest = path.join(__dirname, 'plugins', 'advanced-custom-fields.zip');

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
  console.log('Pobieranie wtyczki Advanced Custom Fields (ACF) z WordPress.org...');
  try {
    await download(url, dest);
    console.log(`[OK] Pobrano: ${dest}`);
  } catch (e) {
    console.error(`[ERR] ${e.message}`);
  }
}

main();
