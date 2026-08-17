const fs = require('fs');

const content = fs.readFileSync('D:\\download\\products_export_1.csv', 'utf8');

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

const firstLine = content.split('\n')[0];
const headers = splitLine(firstLine);

console.log('--- ALL HEADERS IN PRODUCTS_EXPORT_1.CSV ---');
headers.forEach((h, i) => {
  console.log(`[${i}] ${h}`);
});
