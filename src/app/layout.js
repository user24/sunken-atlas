'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import useLinkHandler from '@/utils/useLinkHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Forbidden Island Map Editor',
  description: 'Alternate tile layouts for the Forbidden Island board game',
};

export default function RootLayout({ children }) {
  useLinkHandler();
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
