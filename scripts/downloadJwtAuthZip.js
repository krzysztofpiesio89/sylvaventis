const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const url = 'https://codeload.github.com/wp-graphql/wp-graphql-jwt-authentication/zip/refs/heads/master';
const destDir = path.join(__dirname, 'plugins');
const tempZip = path.join(destDir, 'jwt-auth-temp.zip');
const finalZip = path.join(destDir, 'wp-graphql-jwt-authentication.zip');

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
  console.log('Pobieranie oficjalnej wtyczki WPGraphQL JWT Authentication z GitHub...');
  try {
    await download(url, tempZip);
    
    // Unzip and clean root folder name
    const tempDir = path.join(destDir, 'temp_jwt');
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
    fs.mkdirSync(tempDir, { recursive: true });

    execSync(`powershell -Command "Expand-Archive -Path '${tempZip}' -DestinationPath '${tempDir}' -Force"`);
    
    const items = fs.readdirSync(tempDir);
    const sourceFolder = path.join(tempDir, items[0]);
    const targetFolder = path.join(tempDir, 'wp-graphql-jwt-authentication');

    if (sourceFolder !== targetFolder) {
      fs.renameSync(sourceFolder, targetFolder);
    }

    if (fs.existsSync(finalZip)) fs.unlinkSync(finalZip);
    execSync(`powershell -Command "Compress-Archive -Path '${targetFolder}' -DestinationPath '${finalZip}' -Force"`);

    // Cleanup
    fs.unlinkSync(tempZip);
    fs.rmSync(tempDir, { recursive: true, force: true });

    console.log(`[SUCCESS] Gotowa wtyczka ZIP: ${finalZip}`);
  } catch (e) {
    console.error(`[ERR] ${e.message}`);
  }
}

main();
