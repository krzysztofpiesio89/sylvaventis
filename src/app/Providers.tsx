'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apollo/ApolloClient';
import CartInitializer from '@/components/Cart/CartInitializer.component';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ApolloProvider client={client}>
        <CartInitializer />
        {children}
      </ApolloProvider>
    </ThemeProvider>
  );
}
