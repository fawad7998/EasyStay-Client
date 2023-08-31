'use client';
import {Poppins} from 'next/font/google';
import DashboradSidebar from './(dashboard-components)/(Sidebar)/DashboardSidebar';
import {usePathname} from 'next/navigation';
import '../globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';

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
        {pathname.includes('login') || pathname.includes('register') ? (
          ''
        ) : (
          <DashboradSidebar />
        )}
        {children}
      </body>
    </html>
  );
}
