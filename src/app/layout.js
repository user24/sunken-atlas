import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Forbidden Island Map Editor',
  description: 'Alternate tile layouts for the Forbidden Island board game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-from="layout">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
