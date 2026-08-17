const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://api.sylvaventis.com/graphql';

export async function wpFetch<T>(
  query: string, 
  variables = {}, 
  options: { tags?: string[]; revalidate?: number | false } = {}
): Promise<T> {
  const { tags, revalidate } = options;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store', // Disable cache for development
    next: { 
      revalidate: 0, 
      tags: tags ?? [] 
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error('--- WP GraphQL Errors ---');
    console.error(JSON.stringify(json.errors, null, 2));
    console.error('-------------------------');
    throw new Error(`Failed to fetch API: ${json.errors[0].message}`);
  }

  return json.data;
}
