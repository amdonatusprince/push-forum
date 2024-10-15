import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white p-4">
        <nav className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TechFiesta
          </Link>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-indigo-200">Home</Link></li>
            <li><Link href="/groups" className="hover:text-indigo-200">Groups</Link></li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto py-8">
        {children}
      </main>
      <footer className="bg-indigo-800 text-white p-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2024 TechFiesta. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}