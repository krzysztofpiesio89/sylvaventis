const http = require('http');

function sendGraphQL(query, variables, name) {
  return new Promise((resolve) => {
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
        resolve(JSON.parse(body));
      });
    });

    req.write(postData);
    req.end();
  });
}

async function testFlow() {
  const username = 'testuser_' + Date.now();
  const email = `${username}@example.com`;
  const password = 'TestPassword123!';

  console.log(`Testowanie rejestracji użytkownika: ${username}`);

  // 1. Register Customer
  const regRes = await sendGraphQL(`
    mutation Register($username: String!, $email: String!, $password: String!) {
      registerCustomer(
        input: {
          username: $username
          email: $email
          password: $password
        }
      ) {
        customer {
          id
          databaseId
          username
          email
        }
      }
    }
  `, { username, email, password }, '1. Rejestracja Nowego Klienta');

  // 2. Login as the newly created customer
  if (regRes.data?.registerCustomer?.customer) {
    console.log('Rejestracja udana. Testowanie logowania...');
    await sendGraphQL(`
      mutation Login($username: String!, $password: String!) {
        login(
          input: {
            provider: PASSWORD
            credentials: {
              username: $username
              password: $password
            }
          }
        ) {
          authToken
          refreshToken
          user {
            id
            databaseId
            username
            email
          }
        }
      }
    `, { username, password }, '2. Logowanie Nowym Klientem');
  }
}

testFlow();
