import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import AppEventModal from './AppEventModal';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppEventModal />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
