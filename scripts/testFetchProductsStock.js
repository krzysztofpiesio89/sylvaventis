const http = require('http');

const query = JSON.stringify({
  query: `
    query MyQuery {
      products(first: 30) {
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
    console.log('=== PRODUCTS STOCK STATUS SAMPLE ===');
    const parsed = JSON.parse(body);
    const nodes = parsed.data?.products?.nodes || [];
    nodes.forEach(n => {
      console.log(`[${n.stockStatus || 'UNDEFINED'}] ${n.name}`);
    });
  });
});

req.write(query);
req.end();
