'use client';

import Navbar from '../components/Navbar';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <SessionProvider>
          <Navbar />
          {/* Main wrapper taake content navbar ke niche na chupe */}
          <main className="min-h-screen">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}