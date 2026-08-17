const fs = require('fs');

const csvPath = 'D:\\download\\products_export_1.csv';
const content = fs.readFileSync(csvPath, 'utf8');

// Parse CSV lines cleanly (handling quoted newlines if any)
function parseCsv(text) {
  const lines = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      current += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[i + 1] === '\n') {
        i++;
      }
      if (current.trim().length > 0) {
        lines.push(current);
      }
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim().length > 0) {
    lines.push(current);
  }
  return lines;
}

const lines = parseCsv(content);
console.log(`Total rows in products_export_1.csv: ${lines.length}`);

function splitLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(current.trim().replace(/^"|"$/g, ''));
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current.trim().replace(/^"|"$/g, ''));
  return result;
}

const headers = splitLine(lines[0]);
console.log('--- HEADERS ---');
headers.forEach((h, i) => {
  if (h.toLowerCase().includes('stock') || h.toLowerCase().includes('stan') || h.toLowerCase().includes('id') || h.toLowerCase().includes('sku') || h.toLowerCase().includes('name') || h.toLowerCase().includes('title') || h.toLowerCase().includes('published')) {
    console.log(`Col ${i}: ${h}`);
  }
});

console.log('\n--- SAMPLE ROWS (First 10) ---');
for (let i = 1; i <= Math.min(10, lines.length - 1); i++) {
  const row = splitLine(lines[i]);
  console.log(`Row ${i} [ID: ${row[0]} | Name: ${row[2] || row[3] || row[4]}]`);
}
