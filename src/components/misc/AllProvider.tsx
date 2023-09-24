'use client';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import React, { FunctionComponent, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';
import configureStore from '@/store/configureStore';
import type { Session } from "next-auth";

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
                <ThemeProvider theme={theme}>
                    {children}
                    <Footer />
                </ThemeProvider>
            </ReduxProvider>{' '}
        </SessionProvider>
    );
};
