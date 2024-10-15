import './globals.css'
import Navbar from './components/Navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-indigo-800 text-white p-4">
            <div className="max-w-4xl mx-auto text-center">
              <p>&copy; 2024 TechFiesta. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
