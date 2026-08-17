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

const activeArrayJson = JSON.stringify(Array.from(activeSlugs));
const draftArrayJson = JSON.stringify(Array.from(draftSlugs));

const phpSnippet = `<?php
/**
 * BEZPOŚREDNIA AKTUALIZACJA BAZY WOOCOMMERCE:
 * Synchronizacja statusu _stock_status w bazie MySQL (wp_postmeta)
 * na podstawie pliku D:\\download\\products_export_1.csv
 */
add_action( 'init', function() {
    if ( isset( $_GET['run_wc_stock_sync'] ) || isset( $_GET['sync_exact_csv_stock'] ) ) {
        global $wpdb;

        $activeSlugs = ${activeArrayJson};
        $draftSlugs = ${draftArrayJson};

        // 1. Ustaw najpierw domyślnie wszystkie meta_key _stock_status na instock
        $wpdb->query( "UPDATE {$wpdb->postmeta} SET meta_value = 'instock' WHERE meta_key = '_stock_status'" );

        // 2. Dla produktów ze statusem draft z CSV wymuś outofstock w bazie
        $outCount = 0;
        foreach ( $draftSlugs as $slug ) {
            $updated = $wpdb->query( $wpdb->prepare(
                "UPDATE {$wpdb->postmeta} pm 
                 INNER JOIN {$wpdb->posts} p ON pm.post_id = p.ID 
                 SET pm.meta_value = 'outofstock' 
                 WHERE p.post_name = %s AND pm.meta_key = '_stock_status'",
                $slug
            ) );
            if ( $updated ) $outCount++;
        }

        // Czyszczenie podręcznej pamięci transients i GraphQL cache
        delete_transient( 'wc_products_onsale' );
        wp_cache_flush();

        wp_die( "<div style='font-family:sans-serif;padding:40px;max-width:600px;margin:50px auto;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.1)'>
          <h2 style='color:#10b981;margin-top:0'>✅ Backend WooCommerce został pomyślnie zaktualizowany!</h2>
          <p>W bazie MySQL dla ${activeSlugs.size} produktów ustawiono status <strong>INSTOCK</strong>, a dla ${draftSlugs.size} draftów ustawiono status <strong>OUTOFSTOCK</strong>.</p>
          <p><a href='http://localhost:3000/products' style='background:#f59e0b;color:#000;padding:10px 20px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block'>Przejdź do Sklepu →</a></p>
        </div>" );
    }
} );
`;

const outputPath = path.join(__dirname, 'backend_wc_stock_updater.php');
fs.writeFileSync(outputPath, phpSnippet, 'utf8');
console.log(`[SUCCESS] Wygenerowano optymalny plik PHP Snippet: ${outputPath}`);
