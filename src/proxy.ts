import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Define allowed domains and their corresponding configurations
  // In a real scenario, this could be fetched from a database or a central config
  const tenants = {
    'localhost:3000': { id: 'main', locale: 'en' },
    'amanitasale.com': { id: 'main', locale: 'en' },
    'stephan-store.com': { id: 'stephan', locale: 'de' },
  };

  // Detect current tenant
  const currentTenant = tenants[hostname as keyof typeof tenants] || tenants['amanitasale.com'];

  // Clone the request headers and set tenant info
  // This allows our Server Components and API routes to know which "store" they are serving
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', currentTenant.id);
  requestHeaders.set('x-tenant-locale', currentTenant.locale);

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Only run proxy on page routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
