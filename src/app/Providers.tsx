'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/utils/apollo/ApolloClient';
import CartInitializer from '@/components/Cart/CartInitializer.component';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <CartInitializer />
      {children}
    </ApolloProvider>
  );
}
