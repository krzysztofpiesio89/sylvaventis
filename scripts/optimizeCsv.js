const fs = require('fs');
const path = require('path');

const inputCsvPath = 'D:\\sylvaventis\\scripts\\wc-product-export-13-8-2026-1786639016897.csv';
const outputCsvPath = 'D:\\sylvaventis\\scripts\\wc-product-optimized-seo.csv';

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

function escapeCSVField(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function mapCategoriesAndSeo(name, originalCategories, desc, shortDesc) {
  const nameLower = (name || '').toLowerCase();
  const catLower = (originalCategories || '').toLowerCase();
  const descLower = (desc + ' ' + shortDesc).toLowerCase();

  let newCategories = [];
  let seoTitleExtra = '';
  let focusKeyword = '';

  // --- Category Classification into 4 Pillars ---
  
  // 1. Jewelry & Accessories
  if (nameLower.includes('amulett') || nameLower.includes('anhänger') || catLower.includes('charms & pendants')) {
    newCategories.push('Apparel & Accessories > Jewelry > Charms & Pendants');
    newCategories.push('Apparel & Accessories > Jewelry');
    seoTitleExtra = '– Exklusiver Schmuckanhänger Unikat';
    focusKeyword = 'Schmuckanhänger Amulett';
  } else if (nameLower.includes('armband') || catLower.includes('bracelets')) {
    newCategories.push('Apparel & Accessories > Jewelry > Bracelets');
    newCategories.push('Apparel & Accessories > Jewelry');
    seoTitleExtra = '– Handgefertigtes Natur-Armband';
    focusKeyword = 'Handgemachtes Armband';
  } else if (nameLower.includes('kolczyki') || nameLower.includes('ohrringe') || catLower.includes('earrings')) {
    newCategories.push('Apparel & Accessories > Jewelry > Earrings');
    newCategories.push('Apparel & Accessories > Jewelry');
    seoTitleExtra = '– Eleganter Ohrschmuck';
    focusKeyword = 'Ohrringe Schmuck';
  } else if (nameLower.includes('naszyjnik') || nameLower.includes('kette') || catLower.includes('necklaces')) {
    newCategories.push('Apparel & Accessories > Jewelry > Necklaces');
    newCategories.push('Apparel & Accessories > Jewelry');
    seoTitleExtra = '– Edle Halskette';
    focusKeyword = 'Edle Halskette';

  // 2. Olfactory Arts & Fragrance / Naturkosmetik & Räucherwerk
  } else if (nameLower.includes('räucherstäbchen') || nameLower.includes('incense') || nameLower.includes('räucher') || nameLower.includes('palo santo') || nameLower.includes('salbei') || nameLower.includes('benzoe') || nameLower.includes('weihrauch') || nameLower.includes('myrrhe') || nameLower.includes('ishpingo')) {
    newCategories.push('Olfactory Arts Materials > Fragrance Ingredients');
    newCategories.push('Olfactory Arts Materials');
    seoTitleExtra = '– 100% Natürliches Räucherwerk & Aromatherapie';
    focusKeyword = 'Natürliches Räucherwerk';
  } else if (nameLower.includes('extrakt') || nameLower.includes('amanita') || nameLower.includes('kava') || nameLower.includes('öl') || nameLower.includes('essenz') || catLower.includes('perfumery ingredients') || catLower.includes('fragrance ingredients')) {
    newCategories.push('Olfactory Arts Materials > Perfumery Ingredients > Fragrance Ingredients');
    newCategories.push('Olfactory Arts Materials > Perfumery Ingredients');
    newCategories.push('Olfactory Arts Materials');
    seoTitleExtra = '– Premium Pflanzlicher Extrakt & Aroma-Essenz';
    focusKeyword = 'Pflanzlicher Extrakt';
  } else if (nameLower.includes('seife') || nameLower.includes('zahnpasta') || nameLower.includes('zahncreme') || nameLower.includes('mundhygiene') || catLower.includes('bath & body') || catLower.includes('personal care')) {
    newCategories.push('Olfactory Arts Materials > Perfumery Ingredients');
    newCategories.push('Olfactory Arts Materials');
    seoTitleExtra = '– Zertifizierte Naturkosmetik & Bio-Pflege';
    focusKeyword = 'Naturkosmetik Bio Pflege';

  // 3. Arts, Crafts & Entertainment
  } else if (nameLower.includes('extrakt') || nameLower.includes('farbe') || nameLower.includes('dyes') || nameLower.includes('beads') || nameLower.includes('steine') || catLower.includes('arts & crafts') || catLower.includes('art & crafting materials')) {
    newCategories.push('Arts & Entertainment > Hobbies & Creative Arts > Arts & Crafts > Art & Crafting Materials');
    newCategories.push('Arts & Entertainment > Hobbies & Creative Arts > Arts & Crafts');
    newCategories.push('Arts & Entertainment');
    seoTitleExtra = '– Kunst- & Rötelbedarf';
    focusKeyword = 'Künstlerbedarf Rzemiosło';
  } else if (nameLower.includes('instrument') || nameLower.includes('trommel') || nameLower.includes('flöte') || catLower.includes('musical instruments')) {
    newCategories.push('Arts & Entertainment > Musical Instruments');
    newCategories.push('Arts & Entertainment');
    seoTitleExtra = '– Musikinstrument & Klangkunst';
    focusKeyword = 'Musikinstrument Klangkunst';

  // 4. Default / General Store / Home & Decor / Containers
  } else if (nameLower.includes('dose') || nameLower.includes('halter') || nameLower.includes('teelicht') || nameLower.includes('glas') || catLower.includes('home & garden')) {
    newCategories.push('Arts & Entertainment > Hobbies & Creative Arts > Arts & Crafts');
    newCategories.push('Arts & Entertainment');
    seoTitleExtra = '– Kunsthandwerk & Deko Accessoire';
    focusKeyword = 'Deko Accessoire Dosen';
  } else {
    newCategories.push('Arts & Entertainment > Hobbies & Creative Arts');
    newCategories.push('Arts & Entertainment');
    seoTitleExtra = '– Premium Naturprodukt';
    focusKeyword = 'Naturprodukt Sylvaventis';
  }

  // Generate clean short SEO Meta Description if missing or clean up existing
  let cleanShortDesc = (shortDesc || '').replace(/<[^>]*>?/gm, '').trim();
  if (!cleanShortDesc || cleanShortDesc.length < 20) {
    cleanShortDesc = `Entdecke ${name} im Sylvaventis Online Shop. 100% hochwertige Qualität, schnelle Lieferung & nachhaltige Verpackung. JETZT BESTELLEN!`;
  } else if (cleanShortDesc.length > 160) {
    cleanShortDesc = cleanShortDesc.substring(0, 157) + '...';
  }

  return {
    categoriesStr: newCategories.join(', '),
    seoTitleExtra,
    cleanShortDesc,
    focusKeyword
  };
}

const content = fs.readFileSync(inputCsvPath, 'utf-8');
const lines = content.split(/\r?\n/).filter(line => line.trim().length > 0);
const headers = parseCSVLine(lines[0]);

const nameIdx = headers.indexOf('Name');
const catIdx = headers.indexOf('Categories');
const descIdx = headers.indexOf('Description');
const shortDescIdx = headers.indexOf('Short description');
const tagsIdx = headers.indexOf('Tags');

// Check if RankMath or Yoast Meta columns exist, if not we will add Meta: rank_math_description
let metaDescIdx = headers.indexOf('Meta: rank_math_description');
if (metaDescIdx === -1) {
  headers.push('Meta: rank_math_description');
  metaDescIdx = headers.length - 1;
}

let metaFocusKwIdx = headers.indexOf('Meta: rank_math_focus_keyword');
if (metaFocusKwIdx === -1) {
  headers.push('Meta: rank_math_focus_keyword');
  metaFocusKwIdx = headers.length - 1;
}

const outputLines = [headers.map(escapeCSVField).join(',')];

let processedCount = 0;

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < nameIdx) continue;

  const name = cols[nameIdx] || '';
  const cat = cols[catIdx] || '';
  const desc = cols[descIdx] || '';
  const shortDesc = cols[shortDescIdx] || '';

  if (name && name.trim()) {
    const seoData = mapCategoriesAndSeo(name, cat, desc, shortDesc);
    
    // Update Categories column
    cols[catIdx] = seoData.categoriesStr;

    // Set meta description
    while (cols.length < headers.length) {
      cols.push('');
    }
    cols[metaDescIdx] = seoData.cleanShortDesc;
    cols[metaFocusKwIdx] = seoData.focusKeyword;

    processedCount++;
  }

  outputLines.push(cols.map(escapeCSVField).join(','));
}

fs.writeFileSync(outputCsvPath, outputLines.join('\n'), 'utf-8');
console.log(`\n[SUCCESS] Przetworzono ${processedCount} produktów.`);
console.log(`[SUCCESS] Wygenerowano zoptymalizowany plik CSV: ${outputCsvPath}`);
