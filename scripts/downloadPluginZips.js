const fs = require('fs');
const path = require('path');
const https = require('https');

const plugins = [
  {
    name: 'wp-graphql-smart-cache',
    url: 'https://codeload.github.com/wp-graphql/wp-graphql-smart-cache/zip/refs/heads/main',
    filename: 'wp-graphql-smart-cache.zip'
  },
  {
    name: 'wp-graphql-yoast-seo',
    url: 'https://codeload.github.com/ashhitch/wp-graphql-yoast-seo/zip/refs/heads/master',
    filename: 'wp-graphql-yoast-seo.zip'
  }
];

const targetDir = path.join(__dirname, 'plugins');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with HTTP ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log('Pobieranie wtyczek z GitHub...');
  for (const p of plugins) {
    const dest = path.join(targetDir, p.filename);
    try {
      await downloadFile(p.url, dest);
      console.log(`[OK] Pobrano ${p.filename} -> ${dest}`);
    } catch (e) {
      console.error(`[ERR] ${p.name}: ${e.message}`);
    }
  }
}

run();
