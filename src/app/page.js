import Link from 'next/link';

export default function Home() {
  const groups = [
    { id: '1', name: 'General Discussion', members: 1234, posts: 5678, icon: '💬' },
    { id: '2', name: 'Tech Talk', members: 987, posts: 3456, icon: '💻' },
    { id: '3', name: 'Creative Corner', members: 567, posts: 2345, icon: '🎨' },
    { id: '4', name: 'Health & Wellness', members: 789, posts: 4567, icon: '🧘' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
            Welcome to TechFiesta
          </span>
        </h1>
        <p className="text-xl text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Join vibrant communities, share your thoughts, and connect with like-minded individuals on the TechFiesta ecosystem.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-4">
                  <span className="text-4xl">{group.icon}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{group.name}</h2>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      {group.members}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {group.posts}
                    </span>
                  </div>
                  <p className="text-gray-600">Join the conversation and connect with others who share your interests!</p>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                    Join Group
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
