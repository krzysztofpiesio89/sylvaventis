const fs = require('fs');
const path = require('path');

const csvPath = 'D:\\download\\products_export_1.csv';
const content = fs.readFileSync(csvPath, 'utf8');

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
      if (char === '\r' && text[i + 1] === '\n') i++;
      if (current.trim().length > 0) lines.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim().length > 0) lines.push(current);
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

const handleIdx = headers.indexOf('Handle');
const titleIdx = headers.indexOf('Title');
const statusIdx = headers.indexOf('Status');

const activeSlugs = new Set();
const draftSlugs = new Set();

for (let i = 1; i < lines.length; i++) {
  const row = splitLine(lines[i]);
  const handle = row[handleIdx]?.toLowerCase().trim();
  const status = row[statusIdx]?.toLowerCase().trim();
  const title = row[titleIdx]?.trim();

  if (handle && title) {
    if (status === 'active') {
      activeSlugs.add(handle);
    } else if (status === 'draft') {
      draftSlugs.add(handle);
    }
  }
}

console.log(`Znaleziono unikalnych produktów ACTIVE: ${activeSlugs.size}`);
console.log(`Znaleziono unikalnych produktów DRAFT: ${draftSlugs.size}`);

const activeArrayJson = JSON.stringify(Array.from(activeSlugs));
const draftArrayJson = JSON.stringify(Array.from(draftSlugs));

const phpSnippet = `<?php
/**
 * Synchronizacja stanu magazynowego z pliku products_export_1.csv
 * Aktywacja ${activeSlugs.size} produktów jako 'instock' i ${draftSlugs.size} jako 'outofstock'
 */
add_action( 'init', function() {
    if ( isset( $_GET['sync_exact_csv_stock'] ) ) {
        global $wpdb;

        $activeSlugs = ${activeArrayJson};
        $draftSlugs = ${draftArrayJson};

        // 1. Domyślnie ustaw wszystkie na outofstock
        $wpdb->query( "UPDATE {$wpdb->postmeta} SET meta_value = 'outofstock' WHERE meta_key = '_stock_status'" );

        // 2. Aktywuj dokładnie produkty ze statusem ACTIVE
        $updatedCount = 0;
        foreach ( $activeSlugs as $slug ) {
            $postId = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM {$wpdb->posts} WHERE post_name = %s AND post_type = 'product' LIMIT 1", $slug ) );
            if ( $postId ) {
                $wpdb->query( $wpdb->prepare( "UPDATE {$wpdb->postmeta} SET meta_value = 'instock' WHERE post_id = %d AND meta_key = '_stock_status'", $postId ) );
                $updatedCount++;
            }
        }

        wp_die( "Sukces! Przetestowano {$activeSlugs.size} pozycji. Zaktualizowano dokładnie {$updatedCount} aktywnych produktów w bazie WooCommerce na INSTOCK!" );
    }
} );
`;

const outputPath = path.join(__dirname, 'sync_exact_stock_snippet.php');
fs.writeFileSync(outputPath, phpSnippet, 'utf8');
console.log(`[SUCCESS] Wygenerowano plik PHP Snippet: ${outputPath}`);
