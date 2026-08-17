const fs = require('fs');
const path = require('path');

const possiblePaths = [
  'D:\\download\\product_export.csv',
  'D:\\downloads\\product_export.csv',
  'D:\\sylvaventis\\product_export.csv',
  'C:\\Users\\Wiktoria\\Downloads\\product_export.csv'
];

let targetPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    targetPath = p;
    break;
  }
}

if (!targetPath) {
  console.error('Nie znaleziono pliku product_export.csv w szukanych ścieżkach');
  process.exit(1);
}

console.log(`[FOUND] Odczytywanie pliku: ${targetPath}`);

const content = fs.readFileSync(targetPath, 'utf8');
const lines = content.split('\n');

console.log('--- CSV HEADERS ---');
const headers = lines[0].split(',');
headers.forEach((h, i) => {
  console.log(`Col ${i}: ${h.replace(/"/g, '')}`);
});

console.log(`--- TOTAL ROWS: ${lines.length} ---`);
console.log('--- FIRST 5 ROWS ---');
for (let i = 1; i <= Math.min(5, lines.length - 1); i++) {
  if (lines[i]) {
    console.log(`Row ${i}:`, lines[i].substring(0, 180));
  }
}
