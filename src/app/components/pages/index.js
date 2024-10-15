import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  // Fetch groups from API or state management
  const groups = [
    { id: '1', name: 'General Discussion' },
    { id: '2', name: 'Tech Talk' },
    // ... more groups
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">Welcome to ForumApp</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                <h2 className="text-xl font-semibold text-indigo-600">{group.name}</h2>
                <p className="text-gray-600 mt-2">Join the conversation!</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}