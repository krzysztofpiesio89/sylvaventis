const http = require('http');

function sendGraphQL(query, variables, name) {
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
    });
  });

  req.write(postData);
  req.end();
}

// 1. Headless Login (JWT)
sendGraphQL(`
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
      }
    }
  }
`, { username: 'admin', password: 'password' }, '1. Headless Login PASSWORD');

// 2. Cookie Login (Natywne WooGraphQL)
sendGraphQL(`
  mutation LoginCookie($username: String!, $password: String!) {
    loginWithCookies(input: { login: $username, password: $password }) {
      status
      clientMutationId
    }
  }
`, { username: 'admin', password: 'password' }, '2. loginWithCookies');
