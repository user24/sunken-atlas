import './globals.css';
import { Macondo as Font } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from "next-themes";

const font = Font({
  subsets: ['latin'],
  weight: ['400']
});

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Sunken Atlas</title>
        <meta name="description" content="Alternate tile layouts for the board game Forbidden Island"></meta>
      </Head>
      <ThemeProvider attribute="theme" themes={['grey', '']}>
        <div className={font.className}>{children}</div>
      </ThemeProvider>
    </>
  )
}