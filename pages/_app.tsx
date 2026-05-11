import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { TokenInjector } from '@charcoal-ui/styled';
import { CharcoalProvider, OverlayProvider, SSRProvider } from '@charcoal-ui/react';
import { light } from '@charcoal-ui/theme';
import { themeMap } from '../utils/variables';
import Head from 'next/head';
import '@charcoal-ui/react/dist/index.css';
import '@charcoal-ui/react/dist/layered.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>VRoid Hub API Example</title>
        <meta property="description" content="Simple example of VRoid Hub API" />
        <meta property="og:title" content="VRoid Hub API Example" />
        <meta property="og:description" content="Simple example of VRoid Hub API" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <SSRProvider>
          <CharcoalProvider>
            <ThemeProvider theme={light}>
              <TokenInjector theme={themeMap} />
              <GlobalStyle />
              <OverlayProvider>
                <Component {...pageProps} />
              </OverlayProvider>
            </ThemeProvider>
          </CharcoalProvider>
        </SSRProvider>
      </SessionProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: ${(props) => props.theme.typography.size[14].fontSize}px;
  }
`;