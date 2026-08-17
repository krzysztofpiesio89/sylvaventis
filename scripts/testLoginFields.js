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

testMutation(`
  mutation Login($username: String!, $password: String!) {
    login(input: { provider: PASSWORD, credentials: { username: $username, password: $password } }) {
      authToken
      user { id }
    }
  }
`, 'Credentials username');

testMutation(`
  mutation Login($username: String!, $password: String!) {
    login(input: { provider: PASSWORD, credentials: { login: $username, password: $password } }) {
      authToken
      user { id }
    }
  }
`, 'Credentials login');

testMutation(`
  mutation Login($username: String!, $password: String!) {
    login(input: { provider: PASSWORD, passwordCredentials: { username: $username, password: $password } }) {
      authToken
      user { id }
    }
  }
`, 'PasswordCredentials username');
