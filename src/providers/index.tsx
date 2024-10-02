'use client';

import React from 'react';
import ReactQueryProvider from './react-query-provider';
import { ToasterProvider } from './toaster-provider';
import { SocketProvider } from './socket-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <ReactQueryProvider>
        {/* <ReduxProvider> */}
        {/* <HigherOrderComponent> */}
        <ToasterProvider />
        {children}
        {/* </HigherOrderComponent> */}
        {/* </ReduxProvider> */}
      </ReactQueryProvider>
    </SocketProvider>
  );
};
