import App from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Footer from '../components/Footer';
import BaseHeader from '../containers/BaseHeader.js';
import AppS from '../style/App';
import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';
import configureStore from '../store/configureStore';
import LoadingLine from '../style/LoadingLine';
import React from 'react';
import Column from '../style/Column';
import Info from '../style/Info';

export const store = configureStore();

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppS>
                        <BaseHeader />
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
            </Provider>
        );
    }
}