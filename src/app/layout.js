import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Forbidden Island Map Editor',
  description: 'Alternate tile layouts for the Forbidden Island board game',
};

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <>
      <div className={inter.className}>{children}</div>
    </>
  )
}