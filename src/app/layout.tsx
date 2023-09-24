import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';
import { Open_Sans } from 'next/font/google';
import { AppProvider } from '@/components/misc/AllProvider';
import PageHeader from '@/components/PageHeader.js';
import AppS from '../style/App';
import React from 'react';

import LoadingLine from '@/style/LoadingLine';
import Column from '@/style/Column';
import Info from '@/style/Info';
import Footer from '@/components/Footer';


const font = Open_Sans({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className={`${font.variable} font-sans`}>
            <body>
                <AppProvider>
                    <AppS>
                        <PageHeader />
                        <LoadingLine />
                        <Column center>
                            <Info>
                                This side is still in Development. Be aware that all data may be
                                deleted while in beta/before release.{' '}
                            </Info>
                        </Column>
                        {children}
                        <Footer />
                    </AppS>
                </AppProvider>
            </body>
        </html>
    );
}
