import './globals.css';
import { Macondo as Font } from 'next/font/google';

const font = Font({
  subsets: ['latin'],
  weight: ['400']
});

export const metadata = {
  title: 'Forbidden Island Map Editor',
  description: 'Alternate tile layouts for the Forbidden Island board game',
};

export default function Layout({ children }) {
  return (
      <div className={font.className}>{children}</div>
  )
}