'use client';
import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';
import {Poppins} from 'next/font/google';
import SiteHeader from './(client-components)/(Header)/SiteHeader';
import ClientCommons from './ClientCommons';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import Footer from '@/components/Footer';
import FooterNav from '@/components/FooterNav';
import {Provider as ReduxProvider} from 'react-redux';
import {store, persistor} from '@/redux/store';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const pathname = usePathname();
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <ReduxProvider store={store}>
          <ClientCommons />
          {pathname.includes('dashboard') ||
          pathname.includes('login') ||
          pathname.includes('signup') ? (
            ''
          ) : (
            <SiteHeader />
          )}
          {children}
          {pathname.includes('dashboard') ||
          pathname.includes('login') ||
          pathname.includes('signup') ? (
            ''
          ) : (
            <>
              <FooterNav />
              <Footer />
            </>
          )}
        </ReduxProvider>
      </body>
    </html>
  );
}
