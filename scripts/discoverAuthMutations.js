const http = require('http');

function send(query, variables, name) {
  return new Promise(resolve => {
    const postData = JSON.stringify({ query, variables });

    const req = http.request('http://api.sylvaventis.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`=== ${name} ===`);
        console.log(body);
        resolve(body);
      });
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  // Test 1: Standard login mutation without provider
  await send(`
    mutation LoginStandard($username: String!, $password: String!) {
      login(input: { username: $username, password: $password }) {
        clientMutationId
      }
    }
  `, { username: 'tester', password: 'TestUser123!' }, 'Test 1: Standard Login');

  // Test 2: Login with login & password
  await send(`
    mutation LoginWithLogin($login: String!, $password: String!) {
      login(input: { login: $login, password: $password }) {
        clientMutationId
      }
    }
  `, { login: 'tester', password: 'TestUser123!' }, 'Test 2: Login field');
}

run();
