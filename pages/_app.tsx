import { Provider } from 'next-auth/client';
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
      <Provider session={pageProps.session}>
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
      </Provider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  font-family: 'Noto Sans JP', sans-serif;
  font-size: ${(props) => props.theme.typography.size[14].fontSize}px;
}
`;
