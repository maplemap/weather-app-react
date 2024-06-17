import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

export type TProps = {
  children: React.ReactNode;
};

export const ApiProvider = ({children}: TProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
