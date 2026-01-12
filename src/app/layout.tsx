import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: "Marpé Nutrition's Detox Guide",
    template: '%s | Marpé Nutrition',
  },
  description:
    'Your complete guide to the detox program - approved foods, delicious recipes, tips, and support for your health journey.',
  keywords: ['detox', 'nutrition', 'recipes', 'healthy eating', 'wellness', 'Marpé Nutrition'],
  authors: [{ name: 'Marpé Nutrition' }],
  openGraph: {
    title: "Marpé Nutrition's Detox Guide",
    description: 'Your complete guide to the detox program',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
