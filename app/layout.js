// app/layout.jsx
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <title>DonateChain</title>
      </head>
      <body>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: 'DonateChain - Decentralized Donation Platform',
  description: 'Support meaningful causes through transparent and secure blockchain donations',
};