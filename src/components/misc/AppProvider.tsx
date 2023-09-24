'use client';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React, { FunctionComponent, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import configureStore from '@/store/configureStore';

export const store = configureStore();

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

export const AppProvider: FunctionComponent<{
    children: ReactNode;
}> = ({ children }) => {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </ReduxProvider>
        </SessionProvider>
    );
};
