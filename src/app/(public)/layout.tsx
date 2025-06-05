import '@/styles/globals.scss';

import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout/layout';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link',
  description: 'A simple URL shortener.',
  authors: { name: 'Khotibul Umam', url: 'https://mamskie.me' },
  generator: 'Next.js',
  openGraph: {
    title: 'Link',
    description: 'A simple URL shortener.',
    determiner: 'auto',
    url: 'https://link.mamskie.me',
    locale: 'en_US',
    siteName: 'mamskie.me',
    images: {
      url: 'https://mamskie.me/api/og?title=Link&description=A%20simple%20URL%20shortener.',
      alt: 'Link',
      type: 'image/png',
      width: 1200,
      height: 600
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mam06_',
    creator: '@mamskie',
    title: 'Link',
    description: 'A simple URL shortener.',
    images: {
      url: 'https://mamskie.me/api/og?title=Link&description=A%20simple%20URL%20shortener.',
      alt: 'Link'
    }
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
