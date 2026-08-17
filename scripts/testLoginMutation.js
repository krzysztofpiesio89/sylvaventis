const http = require('http');

function testMutation(queryStr, name) {
  const postData = JSON.stringify({
    query: queryStr,
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
      console.log(`=== TEST: ${name} ===`);
      console.log(body);
    });
  });

  req.write(postData);
  req.end();
}

// Test 1: provider: PASSWORD, login, password
testMutation(`
  mutation Login($username: String!, $password: String!) {
    login(input: { provider: PASSWORD, login: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`, 'Test 1: provider PASSWORD + login');

// Test 2: provider: PASSWORD, username, password
testMutation(`
  mutation Login($username: String!, $password: String!) {
    login(input: { provider: PASSWORD, username: $username, password: $password }) {
      authToken
      refreshToken
      user {
        id
        name
        email
      }
    }
  }
`, 'Test 2: provider PASSWORD + username');
