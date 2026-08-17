const http = require('http');

const username = 'tester';
const email = 'tester@sylvaventis.com';
const password = 'TestUser123!';
const firstName = 'Jan';
const lastName = 'Kowalski';

const postData = JSON.stringify({
  query: `
    mutation Register($username: String!, $email: String!, $password: String!, $firstName: String, $lastName: String) {
      registerCustomer(
        input: {
          username: $username
          email: $email
          password: $password
          firstName: $firstName
          lastName: $lastName
        }
      ) {
        customer {
          id
          databaseId
          username
          email
          firstName
          lastName
        }
      }
    }
  `,
  variables: { username, email, password, firstName, lastName }
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
    console.log('=== CREATED TEST CUSTOMER ===');
    console.log(body);
  });
});

req.write(postData);
req.end();
