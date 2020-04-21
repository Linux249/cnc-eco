import App from 'next/app'
import { ThemeProvider } from 'styled-components'

import '../style/index.css';
import '../style/Details.css';
import 'react-tippy/dist/tippy.css';
//import './node_modules/react-tippy/dist/tippy.css'

const theme = {
    colors: {
        primary: '#0070f3',
    },
}

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        )
    }
}

