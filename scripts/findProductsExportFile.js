const fs = require('fs');
const path = require('path');

const dirsToSearch = [
  'D:\\download',
  'D:\\downloads',
  'D:\\',
  'C:\\Users\\Wiktoria\\Downloads',
  'D:\\sylvaventis',
  'D:\\sylvaventis\\scripts'
];

console.log('Szukanie pliku products_export_1...');

let foundFile = null;

for (const dir of dirsToSearch) {
  if (fs.existsSync(dir)) {
    try {
      const files = fs.readdirSync(dir);
      for (const f of files) {
        if (f.toLowerCase().includes('products_export_1') || f.toLowerCase().includes('product_export_1')) {
          foundFile = path.join(dir, f);
          console.log(`[FOUND] ${foundFile}`);
          break;
        }
      }
    } catch (e) {}
  }
  if (foundFile) break;
}

if (!foundFile) {
  console.log('Szukanie dowolnych plików csv/xlsx w D:\\download...');
  if (fs.existsSync('D:\\download')) {
    console.log(fs.readdirSync('D:\\download'));
  }
}
