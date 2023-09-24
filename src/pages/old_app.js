import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';

import { AppProvider } from '@/components/misc/AppProvider';
import AppS from '@/style/App';
import PageHeader from '@/components/PageHeader';
import Column from '@/style/Column';
import Info from '@/style/Info';
import LoadingLine from '@/style/LoadingLine';
import Footer from '@/components/Footer';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <AppProvider session={session}>
            <AppS>
                <PageHeader />
                <LoadingLine />
                <Column center>
                    <Info>
                        This side is still in Development. Be aware that all data may be deleted
                        while in beta/before release.{' '}
                    </Info>
                </Column>
                <Component {...pageProps} />
                <Footer />
            </AppS>
        </AppProvider>
    );
}
