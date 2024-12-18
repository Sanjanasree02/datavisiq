import { clsx } from 'clsx'; // Import clsx here
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import Providers from '@/components/ui/Providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizmify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "antialiased min-h-screen pt-16")}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
