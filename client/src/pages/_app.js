import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';
//import './node_modules/react-tippy/dist/tippy.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

