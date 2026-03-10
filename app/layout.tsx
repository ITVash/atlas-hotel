import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Атлас Донецк — Гостинично-ресторанный комплекс 4*',
  description: 'Современный отель в центре Донецка. Комфортабельные номера, рестораны, фитнес-центр и спа.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans bg-white text-zinc-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
