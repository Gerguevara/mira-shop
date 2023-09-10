import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import lightTheme from '@/theme/light-theme';
import { SWRConfig } from 'swr';
import { UiProvider } from '@/context';
import { CartProvider } from '@/context/cart';
import { AuthProvider } from '@/context/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    // SWR tiene este provider de configuracion global del fetcher
    <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then(res => res.json()) }} >
      <AuthProvider>
      <CartProvider>
        <UiProvider>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
