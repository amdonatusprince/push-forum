import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import GroupChat from '../../components/GroupChat';

export default function GroupPage() {
  const router = useRouter();
  const { groupId } = router.query;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">Group Chat</h1>
        {groupId && <GroupChat groupId={groupId} />}
      </div>
    </Layout>
  );
}