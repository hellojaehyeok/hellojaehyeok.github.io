import 'styles/reset.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';

const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'auto',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={notoSansKr.className}>
      <Component {...pageProps} />
    </main>
  );
}
