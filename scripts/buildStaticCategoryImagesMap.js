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

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const content = fs.readFileSync(csvPath, 'utf-8');
const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
const headers = parseCSVLine(lines[0]);

const catIdx = headers.indexOf('Categories');
const imgIdx = headers.indexOf('Images');
const nameIdx = headers.indexOf('Name');

const categoryImageMap = {};

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < headers.length) continue;

  const categoriesStr = cols[catIdx] || '';
  const imagesStr = cols[imgIdx] || '';

  if (!categoriesStr || !imagesStr) continue;

  const firstImg = imagesStr.split(',')[0].trim();
  if (!firstImg || !firstImg.startsWith('http')) continue;

  // Split multiple categories
  const categoriesList = categoriesStr.split(',');
  for (const catPath of categoriesList) {
    const parts = catPath.split('>').map(p => p.trim());
    for (const part of parts) {
      if (!part) continue;
      const slug = slugify(part);
      if (!categoryImageMap[slug]) {
        categoryImageMap[slug] = firstImg;
      }
      if (!categoryImageMap[part.toLowerCase()]) {
        categoryImageMap[part.toLowerCase()] = firstImg;
      }
    }
  }
}

console.log('Znaleziono miniatury produktów dla następujących kategorii:');
console.log(categoryImageMap);

// Output to src/utils/categoryRealImages.ts
const tsContent = `// Auto-generated static category image mapping from CSV real products data
export const CATEGORY_REAL_IMAGES: Record<string, string> = ${JSON.stringify(categoryImageMap, null, 2)};

export function getCategoryRealImage(slug: string, name?: string): string {
  const cleanSlug = slug ? slug.toLowerCase().trim() : '';
  const cleanName = name ? name.toLowerCase().trim() : '';

  if (CATEGORY_REAL_IMAGES[cleanSlug]) {
    return CATEGORY_REAL_IMAGES[cleanSlug];
  }
  if (cleanName && CATEGORY_REAL_IMAGES[cleanName]) {
    return CATEGORY_REAL_IMAGES[cleanName];
  }
  
  // Partial search
  for (const key of Object.keys(CATEGORY_REAL_IMAGES)) {
    if (cleanSlug.includes(key) || key.includes(cleanSlug)) {
      return CATEGORY_REAL_IMAGES[key];
    }
  }

  return '/images/hero.webp';
}
`;

fs.writeFileSync(path.join(__dirname, '../src/utils/categoryRealImages.ts'), tsContent, 'utf-8');
console.log('[SUCCESS] Zapisano mapę obrazów w src/utils/categoryRealImages.ts');
