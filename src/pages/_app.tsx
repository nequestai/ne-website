import { AppProps } from 'next/app';

import { Nunito } from 'next/font/google';

import '@/styles/global.css';

const nunito = Nunito({
  // eslint-disable-next-line @typescript-eslint/quotes
  subsets: ['latin-ext'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component className={nunito.className} {...pageProps} />;
}
