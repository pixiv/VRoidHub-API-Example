import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { light } from '@charcoal-ui/theme';
import { CharcoalProvider, OverlayProvider, SSRProvider } from '@charcoal-ui/react';
import '../src/globals.css';
import Head from 'next/head';

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
          <CharcoalProvider themeMap={{ ':root': light }}>
            <OverlayProvider>
              <ThemeProvider theme={light}>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>
            </OverlayProvider>
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
