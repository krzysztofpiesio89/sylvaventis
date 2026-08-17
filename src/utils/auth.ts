import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { LOGIN_USER, CREATE_USER, LOGOUT_USER } from './gql/GQL_MUTATIONS';

const GRAPHQL_URI = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://api.sylvaventis.com/graphql';

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('sylva_auth_token');
}

export function getUser(): any | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('sylva_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function hasCredentials(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('sylva_auth_token') || !!localStorage.getItem('sylva_user');
}

export function setAuthSession(authToken: string, refreshToken?: string, user?: any) {
  if (typeof window === 'undefined') return;
  if (authToken) {
    localStorage.setItem('sylva_auth_token', authToken);
    document.cookie = `sylva_auth_token=${authToken}; path=/; max-age=2592000; SameSite=Lax`;
  }
  if (refreshToken) {
    localStorage.setItem('sylva_refresh_token', refreshToken);
  }
  if (user) {
    localStorage.setItem('sylva_user', JSON.stringify(user));
  }
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('sylva_auth_token');
  localStorage.removeItem('sylva_refresh_token');
  localStorage.removeItem('sylva_user');
  document.cookie = 'sylva_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

function getErrorMessage(error: any): string {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const message = error.graphQLErrors[0].message;
    if (message.includes('Internal server error')) {
      return 'Brak klucza JWT w wp-config.php! Dodaj do wp-config.php linijkę: define("GRAPHQL_JWT_AUTH_SECRET_KEY", "twoj-sekretny-klucz"); i upewnij się, że wtyczka WPGraphQL JWT jest aktywna.';
    }
    if (message.includes('invalid_username') || message.includes('invalid_email') || message.includes('incorrect_password') || message.includes('invalid-secret-key')) {
      return 'Nieprawidłowa nazwa użytkownika lub hasło. Sprawdź dane i spróbuj ponownie.';
    }
    if (message.includes('empty_username') || message.includes('empty_password')) {
      return 'Proszę wprowadzić nazwę użytkownika oraz hasło.';
    }
    return message;
  }
  if (error.message) {
    if (error.message.includes('Internal server error')) {
      return 'Wtyczka Headless Login wymaga zdefiniowanego klucza w wp-config.php. Dodaj: define("GRAPHQL_JWT_AUTH_SECRET_KEY", "sylvaventis-secret-key"); w wp-config.php';
    }
    return error.message;
  }
  return 'Błąd logowania. Spróbuj ponownie później.';
}

export async function login(username: string, password: string) {
  try {
    const httpLink = createHttpLink({
      uri: GRAPHQL_URI,
      fetchOptions: {
        credentials: 'include',
      },
    });

    const client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { username, password },
    });

    const result = data?.login || data?.loginWithCookies;

    if (!result) {
      throw new Error('Logowanie nie powiodło się.');
    }

    const authToken = result.authToken || 'logged_in';
    const refreshToken = result.refreshToken;
    const user = result.user || { name: username, email: username };

    setAuthSession(authToken, refreshToken, user);

    return { success: true, user, token: authToken };
  } catch (error: unknown) {
    const msg = getErrorMessage(error);
    throw new Error(msg);
  }
}

export async function registerCustomer(data: {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  try {
    const client = new ApolloClient({
      uri: GRAPHQL_URI,
      cache: new InMemoryCache(),
    });

    const res = await client.mutate({
      mutation: CREATE_USER,
      variables: data,
    });

    if (res.data?.registerCustomer?.customer) {
      // Auto login after registration
      return await login(data.username, data.password);
    }
    throw new Error('Rejestracja nie powiodła się.');
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
}

export async function logout() {
  clearAuthSession();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}
