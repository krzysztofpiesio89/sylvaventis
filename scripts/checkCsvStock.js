const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'wc-product-optimized-seo.csv');
const content = fs.readFileSync(csvPath, 'utf-[utf8]' ? 'utf8' : 'utf8');
const lines = content.split('\n');

const header = lines[0].split(',');
console.log('--- CSV HEADERS ---');
header.forEach((h, i) => {
  if (h.toLowerCase().includes('stock') || h.toLowerCase().includes('in stock') || h.toLowerCase().includes('stan')) {
    console.log(`Col ${i}: ${h}`);
  }
});

console.log('--- FIRST 5 ROWS ---');
for (let i = 1; i <= 5; i++) {
  if (lines[i]) {
    console.log(`Row ${i}:`, lines[i].substring(0, 150));
  }
}
