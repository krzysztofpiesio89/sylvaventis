const fs = require('fs');
const path = require('path');

const csvPath = 'D:\\sylvaventis\\scripts\\wc-product-export-13-8-2026-1786639016897.csv';

function parseCSVLine(text) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

const content = fs.readFileSync(csvPath, 'utf-8');
const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
const headers = parseCSVLine(lines[0]);

const categoryIndex = headers.indexOf('Categories');
const nameIndex = headers.indexOf('Name');
const descIndex = headers.indexOf('Description');
const shortDescIndex = headers.indexOf('Short description');
const idIndex = headers.indexOf('ID');

console.log(`Nagłówki znalezione. Całkowita liczba wierszy: ${lines.length - 1}`);

const categoryMap = new Map();
let totalProducts = 0;

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < headers.length) continue;
  totalProducts++;
  const cats = cols[categoryIndex] || '';
  cats.split(',').forEach(c => {
    const trimmed = c.trim();
    if (trimmed) {
      categoryMap.set(trimmed, (categoryMap.get(trimmed) || 0) + 1);
    }
  });
}

console.log('\n--- ISTNIEJĄCE KATEGORIE I LICZBA PRODUKTÓW ---');
for (const [cat, count] of categoryMap.entries()) {
  console.log(`${cat} (${count})`);
}
