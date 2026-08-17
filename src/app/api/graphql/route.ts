import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const targetUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://api.sylvaventis.com/graphql';
    const wooSession = request.headers.get('woocommerce-session');
    const cookies = request.headers.get('cookie');

    // Debugging (zobaczysz to w terminalu VS Code)
    console.log('--- GraphQL Proxy Request ---');
    console.log('Target:', targetUrl);
    console.log('Session Header:', wooSession ? 'PRESENT' : 'MISSING');
    console.log('Cookies:', cookies ? 'PRESENT' : 'MISSING');

    const fetchHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (wooSession) fetchHeaders['woocommerce-session'] = wooSession;
    if (cookies) fetchHeaders['Cookie'] = cookies;
    const auth = request.headers.get('authorization');
    if (auth) fetchHeaders['Authorization'] = auth;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: fetchHeaders,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.errors) {
      console.log('--- WordPress GraphQL Errors ---');
      console.log(JSON.stringify(data.errors, null, 2));
    }
    const responseHeaders = new Headers();
    
    // Przekazujemy WSZYSTKIE nagłówki sesji i ciasteczek z powrotem do przeglądarki
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey.includes('woocommerce-session') || lowerKey === 'set-cookie') {
        responseHeaders.append(key, value);
        console.log(`Forwarding Header from WP: ${key}`);
      }
    });

    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('GraphQL Proxy Critical Error:', error);
    return NextResponse.json({ errors: [{ message: 'Proxy Error' }] }, { status: 500 });
  }
}
