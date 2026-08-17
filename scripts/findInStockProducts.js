const http = require('http');

const query = JSON.stringify({
  query: `
    query MyQuery {
      products(first: 100) {
        nodes {
          databaseId
          name
          slug
          ... on SimpleProduct {
            stockStatus
          }
          ... on VariableProduct {
            stockStatus
          }
        }
      }
    }
  `
});

const req = http.request('http://api.sylvaventis.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(query)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('=== IN_STOCK vs OUT_OF_STOCK SUMMARY ===');
    const parsed = JSON.parse(body);
    const nodes = parsed.data?.products?.nodes || [];
    const inStock = nodes.filter(n => n.stockStatus === 'IN_STOCK');
    const outOfStock = nodes.filter(n => n.stockStatus === 'OUT_OF_STOCK');

    console.log(`TOTAL: ${nodes.length}`);
    console.log(`IN_STOCK (${inStock.length}):`, inStock.map(n => n.name));
    console.log(`OUT_OF_STOCK (${outOfStock.length})`);
  });
});

req.write(query);
req.end();
