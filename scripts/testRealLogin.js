const http = require('http');

const postData = JSON.stringify({
  query: `
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
          name
          email
          firstName
          lastName
        }
      }
    }
  `,
  variables: { username: 'testuser', password: 'testpassword' }
});

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
    console.log('=== EXACT HEADLESS LOGIN RESPONSE ===');
    console.log(body);
  });
});

req.write(postData);
req.end();
