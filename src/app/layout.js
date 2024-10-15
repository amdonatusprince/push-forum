import './globals.css'
import Navbar from './components/Navbar';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-[#E6ECF7] via-[#EDF0F7] to-[#F0EDF7]">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <footer className="bg-white text-black p-4">
            <div className="max-w-4xl mx-auto text-center">
              <p>&copy; 2024 TechFiesta. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
