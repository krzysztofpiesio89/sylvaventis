const fs = require('fs');

const content = fs.readFileSync('D:\\download\\products_export_1.csv', 'utf8');

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

const lines = parseCsv(content);
const headers = splitLine(lines[0]);

const statusIdx = headers.indexOf('Status');
const publishedIdx = headers.indexOf('Published');
const titleIdx = headers.indexOf('Title');
const handleIdx = headers.indexOf('Handle');

console.log(`Indices -> Status: ${statusIdx}, Published: ${publishedIdx}, Title: ${titleIdx}, Handle: ${handleIdx}`);

const statusCounts = {};
const activeProducts = [];
const inactiveProducts = [];

for (let i = 1; i < lines.length; i++) {
  const row = splitLine(lines[i]);
  const status = row[statusIdx] || 'UNKNOWN';
  const published = row[publishedIdx] || '';
  const title = row[titleIdx] || row[handleIdx];

  statusCounts[status] = (statusCounts[status] || 0) + 1;

  if (title) {
    if (status.toLowerCase() === 'active') {
      activeProducts.push({ handle: row[handleIdx], title, published });
    } else {
      inactiveProducts.push({ handle: row[handleIdx], title, published, status });
    }
  }
}

console.log('\n--- STATUS BREAKDOWN IN CSV ---');
console.log(statusCounts);

console.log(`\n--- ACTIVE PRODUCTS COUNT: ${activeProducts.length} ---`);
console.log('Sample Active Products (First 10):');
activeProducts.slice(0, 10).forEach(p => console.log(`✓ [ACTIVE] ${p.title} (${p.handle})`));

console.log(`\n--- INACTIVE PRODUCTS COUNT: ${inactiveProducts.length} ---`);
console.log('Sample Inactive Products (First 10):');
inactiveProducts.slice(0, 10).forEach(p => console.log(`✗ [${p.status}] ${p.title} (${p.handle})`));
