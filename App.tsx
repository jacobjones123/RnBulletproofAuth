// app root with providers and navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/root-navigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/providers/query-client';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
