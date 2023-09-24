import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';

import { AppProvider } from '@/components/misc/AllProvider';
import { AppLayout } from '@/components/misc/AppLayout';


export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <AppProvider session={session}>
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </AppProvider>
    );
}
