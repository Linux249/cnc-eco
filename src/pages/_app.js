import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import PageHeader from '@/components/PageHeader.js';
import AppS from '../style/App';
import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';
import configureStore from '../store/configureStore';
import LoadingLine from '../style/LoadingLine';
import React from 'react';
import Column from '../style/Column';
import Info from '../style/Info';
import { SessionProvider } from 'next-auth/react';

export const store = configureStore();

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppS>
                        <PageHeader />
                        <LoadingLine />
                        <Column center>
                            <Info>
                                This side is still in Development. Be aware that all data may be
                                deleted while in beta/before release.{' '}
                            </Info>
                        </Column>

                        <Component {...pageProps} />

                        <Footer />
                    </AppS>
                </ThemeProvider>
            </Provider>{' '}
        </SessionProvider>
    );
}
