import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export type Props = {
  children: React.ReactNode;
};

export const ApiProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
