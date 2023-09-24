import PageHeader from '@/components/PageHeader.js';
import AppS from '../../style/App';
import React, { FunctionComponent, ReactNode } from 'react';

import LoadingLine from '@/style/LoadingLine';
import Column from '@/style/Column';
import Info from '@/style/Info';
import Footer from '@/components/Footer';
import configureStore from '@/store/configureStore';

export const store = configureStore();

export const AppLayout: FunctionComponent<{
    children: ReactNode;
}> = ({ children }) => {
    return (
        <AppS>
            <PageHeader />
            <LoadingLine />
            <Column center>
                <Info>
                    This side is still in Development. Be aware that all data may be deleted while
                    in beta/before release.{' '}
                </Info>
            </Column>
            {children}
            <Footer />
        </AppS>
    );
};
